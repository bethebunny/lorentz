const C = 1;  // Speed of light
const C2 = C*C;
const D = 1;   // Pixels between grid points
// Hmm we need a way to transform between "real" units and pixels, don't we
// and then D needs to be expressed in meters
const PIXELS_PER_METER = 80;
const TICK_MS = 30;



/* TODO:
      - Display all visible grid coordinates
      - Minimap
      - Observe other entities delayed by distance
      - Detached / remote viewing
      - Triangular ship
      - Drawable lorentz contraction
      - Speed up animations based on time dilation
      - Have Wigner rotation rotate the world rather than the player
      - Thomas precession
        - Angular rotation / momentum
      - Collisions
      - Have the ship always point upwards and rotate space instead?
        - Render a compass
      - Interact with stations
      - Doppler effect on color visuals
        - Likely needs to be de-emphasized to be actually visible at high speeds x
      
      - Much later
        - Gravity
        - General relativity
*/


class Matrix2D {
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    timesScalar = s => new Matrix2D(this.a * s, this.b * s, this.c * s, this.d * s);
    timesVector = ({x, y}) => new Vector(this.a * x + this.b * y, this.c * x + this.d * y);
    timesMatrix = ({a, b, c, d}) => new Matrix2D(
        this.a * a + this.b * c,
        this.a * b + this.b * d,
        this.c * a + this.d * c,
        this.c * b + this.d * d,
    );
    inverse() {
        let {a, b, c, d} = this;
        let determinant = a * d - b * c;
        return new Matrix2D(d, -b, -c, a).timesScalar(1 / determinant);
    }
    static fromEigenvectors(v1, e1, v2, e2) {
        let scale = new Matrix2D(e1, 0, 0, e2);
        let basis = new Matrix2D(v1.x, v2.x, v1.y, v2.y);
        return basis.timesMatrix(scale.timesMatrix(basis.inverse()));
    }
}

let rotationMatrix = theta => new Matrix2D(Math.cos(theta), -Math.sin(theta), Math.sin(theta), Math.cos(theta));

let observedPoint = (reference, observing, velocity, gamma) => {
    // TODO: figure out the transformation matrix for this all :P
    // whoops, and we actually need the inverse transformation of this xD
    let dp = observing.minus(reference);
    let orth = dp.project(velocity.orthogonal());
    let coll = dp.project(velocity);
    return orth.plus(coll.times(1 / gamma)).plus(reference);
}

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    relativisticPlus(other) {
        // https://en.wikipedia.org/wiki/Wigner_rotation#Two_general_boosts
        // Not associative or commutative, also results in a net rotation (thomasRotation)
        // I think there's something wrong here, close enough to C a boost perpendicular to the original speed
        // ends up moving in the opposite direction of the new boost
        let u = this, v = other;
        let u_gamma = u.gamma();
        let u_dot_v = u.dot(v);
        return u.times(1 + u_dot_v / C2 * u_gamma / (1 + u_gamma)).plus(v.times(1 / u_gamma)).times(1 / (1 + u_dot_v / C2));
    }
    thomasRotationAngle(other) {
        // https://en.wikipedia.org/wiki/Wigner_rotation#Finding_the_axis_and_angle_of_the_Thomas_rotation
        // Hmm what's the sign of the rotation here? I actually just don't know or have any intuitive sense.
        // It seems like it tracks with the article that the resulting angle is commutative in u + v vs v + u
        let u = this, v = other;
        let u_gamma = u.gamma(), v_gamma = v.gamma(), composite_gamma = u_gamma * v_gamma * (1 + u.dot(v) / C2);
        // z component of the cross product
        // negated because ?! anyway it seems much better behaved this way; not negating it causes accelerations
        // to become unstable and you can get weird cases where a constant acceleration causes you to travel in circles
        // relative to coordinate space
        // I suspect it's negative because of some weirdness in the way I'm thinking about coordinate space.
        // I'm still wondering if I need to do this at all, or if I can somehow make this a more natural part of the simulation;
        // the physical meaning of this rotation still eludes me.
        let sign = -Math.sign(u.x * v.y - u.y * v.x);
        return sign * Math.acos(Math.pow(1 + u_gamma + v_gamma + composite_gamma, 2) / ((1 + u_gamma) * (1 + v_gamma) * (1 + composite_gamma)) - 1);
    }
    plus = other => new Vector(this.x + other.x, this.y + other.y);
    dot = other => this.x * other.x + this.y * other.y;
    minus = other => new Vector(this.x - other.x, this.y - other.y);
    times = m => new Vector(this.x * m, this.y * m);
    magnitude = () => Math.sqrt(this.x * this.x + this.y * this.y);
    unit = () => this.times(1 / this.magnitude());
    orthogonal = () => new Vector(-this.y, this.x);
    project(onto) {
        let unit = onto.unit();
        return unit.times(this.dot(unit));
    }
    gamma() {
        let v = this.magnitude();
        return Math.pow(1 - (v * v) / C2, -0.5);
    };
    toString() {
        return `V{${this.x.toFixed(5)}, ${this.y.toFixed(5)}}`;
    }
}

class Viewport {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    corner(center) {
        // Return the corner in world coordinates
        return center.minus(new Vector(this.width / (2 * PIXELS_PER_METER), this.height / (2 * PIXELS_PER_METER)));
    }

    pixelCoordinates({x, y}, {x: cx, y: cy}) {
        return new Vector((x - cx) * PIXELS_PER_METER + (this.width / 2), (y - cy) * PIXELS_PER_METER + (this.height / 2));
    }

    draw(ctx, center, objects) {
        // center in world coordinates
        drawBackground(ctx, this.width, this.height);
        this.drawGrid(ctx, center);
        let frameVelocity = objects[0].velocity;  // TODO: better encapsulation for player velocity
        let transform = Matrix2D.fromEigenvectors(frameVelocity, frameVelocity.gamma(), frameVelocity.orthogonal(), 1);
        let inverse = transform.inverse();
        this.drawContractedGrid(ctx, center, frameVelocity);
        objects.forEach(object => {
            let {position} = object;
            let observedPosition = inverse.timesVector(position.minus(center)).plus(center);
            let viewportPosition = this.pixelCoordinates(observedPosition, center);
            // TODO: draw them as long as any pixels would appear in the viewport
            if (viewportPosition.x < 0 || viewportPosition.y < 0 || viewportPosition.x > this.width || viewportPosition > this.height) {
                return;
            }
            object.draw(ctx, viewportPosition);
        });
    }

    visibleGridPoints = function* (center) {
        let {x, y} = this.corner(center);
        for (let i = x - posMod(x, D); i < x + this.width / PIXELS_PER_METER; i += D) {
            for (let j = y - posMod(y, D); j < y + this.height / PIXELS_PER_METER; j += D) {
                yield new Vector(i, j);
            }
        }
    };

    viewportWorldCoordinates(center, velocity) {
        let corner = this.corner(center);
    }

    drawGrid(ctx, center) {
        for (let gridPoint of this.visibleGridPoints(center)) {
            let {x, y} = this.pixelCoordinates(gridPoint, center);
            drawPoint(ctx, x, y, 'white', 3);
        }
    }

    drawContractedGrid(ctx, center, velocity) {
        let gamma = velocity.gamma();
        for (let gridPoint of this.visibleGridPoints(center)) {
            let observed = observedPoint(center, gridPoint, velocity, gamma);
            let {x, y} = this.pixelCoordinates(observed, center);
            drawPoint(ctx, x, y, 'green', 3);
        }
    }
}

let drawBackground = (ctx, width, height) => {
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, width, height);
};

let drawPoint = (ctx, x, y, color = null, strokeWidth = 1) => {
    let fillStyle = ctx.fillStyle;
    if (color !== null) {
        ctx.fillStyle = color;
    }
    ctx.fillRect(x - (strokeWidth / 2), y - (strokeWidth / 2), strokeWidth, strokeWidth);
    ctx.fillStyle = fillStyle;
};

let posMod = (x, m) => ((x % m) + m) % m;

let gridPoints = function* (x, y, w, h, d) {
    for (i = x - posMod(x, d); i < x + w; i += d) {
        for (j = y - posMod(y, d); j < y + h; j += d) {
            yield new Vector(i, j);
        }
    }
};

let drawGrid = (ctx, corner, width, height, d) => {
    for (let {x, y} of gridPoints(corner.x, corner.y, width, height, d)) {
        drawPoint(ctx, x, y, color='white');
    }
};

class PhysicalObject {
    MASS = 1
    constructor(
        position,
        velocity = new Vector(),
        direction = new Vector(1, 0),
        mass = this.MASS,
    ) {
        // TODO We're not creating all objects at the beginning of the game :P They should start
        // with the time of the object that created them probably
        this.t = 0;
        this.mass = mass;
        this.position = position;
        this.velocity = velocity;
        this.direction = direction;
        this.externalForces = [];
    }
    properForces() {
        return this.externalForces;
    }
    properAcceleration() {
        var forces = new Vector();
        this.properForces().forEach(force => {
            forces = forces.plus(force);
        });
        return forces.times(1 / this.mass);
    }
    update(properDT) {
        this.t += properDT;
        let {position, velocity, direction} = this;
        // Right now length contraction is basically computed here; we update the player's position in the coordinate frame
        // as v * dt * gamma, which can either be interpreted as length contraction (from the perspective of the ship)
        // or time dilation (from the perspective of the coordinate frame's clock)
        this.position = position.plus(velocity.times(properDT * velocity.gamma()));
        let acceleration = this.properAcceleration();
        if (acceleration.x != 0 || acceleration.y != 0) {
            let boost = acceleration.times(properDT);
            let new_velocity = velocity.relativisticPlus(boost);
            this.velocity = new_velocity;
            // I wish I had some intuition for what Thomas rotation means physically. Since the rotation
            // only happens between 2 boosts, but we consider ourselves to be at rest, why do we rotate when we boost
            // and what do we rotate relative to?
            this.direction = rotationMatrix(velocity.thomasRotationAngle(boost)).timesVector(direction);
        }
    }
}

let drawable = Base => class extends Base {
    draw(ctx, viewportCenter) { }
}

let DrawableObject = drawable(PhysicalObject);

class Ship extends DrawableObject {
    size = 0.3
    color = 'white'
    constructor(
        position,
        velocity = new Vector(),
        direction = new Vector(1, 0),
    ) {
        super(position, velocity=velocity, direction=direction)
        this.thrust = 0;
    }
    properForces() {
        return [this.direction.times(this.thrust), ...super.properForces()];
    }
    draw(ctx, viewportCenter) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(viewportCenter.x, viewportCenter.y);
        let p = viewportCenter.plus(this.direction.times(this.size * PIXELS_PER_METER / 2));
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.strokeStyle = this.color;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(viewportCenter.x, viewportCenter.y, this.size * PIXELS_PER_METER / 2, 0, 2 * Math.PI);
        ctx.stroke();
    }
}

class Station extends DrawableObject {
    size = 3.6
    draw(ctx, viewportCenter) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(viewportCenter.x, viewportCenter.y);
        let p = viewportCenter.plus(this.direction.times(this.size * PIXELS_PER_METER / 2));
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        ctx.strokeStyle = this.color;
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(viewportCenter.x, viewportCenter.y, this.size * PIXELS_PER_METER / 2, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeText(`clock: ${this.t.toFixed(3)}`, viewportCenter.x, viewportCenter.y);
    }
}

class Game {
    constructor(width, height) {
        this.viewport = new Viewport(width, height);
        this.player = new Ship(new Vector(), new Vector(0.01, 0.03));
        this.stations = [new Station(new Vector(-2000, 0)), new Station(new Vector(2000, 0))];
        this.thrust_delta = 0.3;
        this.debug = true;
    }
    drawDebugInfo = ctx => {
        let acceleration = this.player.properAcceleration();
        ctx.font = '15px Arial';
        ctx.strokeStyle = 'white';
        [
            `Position ${this.player.position}`,
            `Beta: ${(this.player.velocity.magnitude() / C).toFixed(5)}c`,
            `Velocity direction: ${this.player.velocity.unit()}`,
            `Acceleration: ${acceleration.x.toFixed(3)}, ${acceleration.y.toFixed(3)}`,
            `Time: ${this.player.t.toFixed(3)}`,
        ].forEach((message, i) => ctx.strokeText(message, 10, (i + 1) * 20));
    }
    draw = ctx => {
        this.viewport.draw(ctx, this.player.position, [this.player, ...this.stations]);
        this.drawDebugInfo(ctx);
    }
    updateState = dt => {
        // dt is proper time for the player
        this.player.update(dt);
        // time contraction for other objects
        // we still need to implement the doppler effect / "fog of war", ie. you should observe other objects as they were
        // relative to your distance and the speed of light. It might make sense for every object to maintain a state history
        // that can be sampled, and then we can garbage collect this history when no observers exist that could observe older state
        this.stations.forEach(station => station.update(dt * (station.velocity.minus(this.player.velocity)).gamma()));
    }
    tick = (ctx, dt) => {
        let t = (new Date()).getTime();
        this.updateState(dt);
        this.draw(ctx);
        let updateTime = (new Date()).getTime() - t;
        let nextTick = TICK_MS - updateTime;
        let nextDT = 1 / TICK_MS;
        window.setTimeout(() => this.tick(ctx, nextDT), nextTick);
    }
    run = ctx => {
        this.tick(ctx, 0);
    }
    handleKeyDown = ({code}) => {
        switch (code) {
            case 'KeyW': this.player.thrust = this.thrust_delta; break;
            case 'KeyS': this.player.thrust = -this.thrust_delta; break;
        }
    }
    handleKeyUp = ({code}) => {
        console.log(code);
        switch (code) {
            case 'KeyW': this.player.thrust = 0; break;
            case 'KeyS': this.player.thrust = 0; break;
        }
    }
    handleKeyPress = ({key, code}) => {
        switch (code) {
            case 'KeyA': this.player.direction = rotationMatrix(-0.03 * 2 * Math.PI).timesVector(this.player.direction); break;
            case 'KeyD': this.player.direction = rotationMatrix(0.03 * 2 * Math.PI).timesVector(this.player.direction); break;
        }
    }
}

var main = () => {
    var canvas = document.getElementById("main");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");
    let game = new Game(window.innerWidth, window.innerHeight);
    game.run(ctx);
    document.addEventListener('keypress', game.handleKeyPress);
    document.addEventListener('keydown', game.handleKeyDown);
    document.addEventListener('keyup', game.handleKeyUp);
};

document.addEventListener('DOMContentLoaded', main);