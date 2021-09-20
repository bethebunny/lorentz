//import { PIXI } from "https://pixijs.download/release/pixi.js";

const C = 100; // Speed of light
const C2 = C * C;
const D = 1; // Pixels between grid points
// Hmm we need a way to transform between "real" units and pixels, don't we
// and then D needs to be expressed in meters
const PIXELS_PER_METER = 1 / 2;
const TICK_MS = 10;

const { Graphics, Text, TextStyle } = PIXI;

/* TODO:
    - Get the grid back
        - Display all visible grid coordinates
    - Minimap
    - Observe other entities delayed by distance
        - Detached / remote viewing
    - Triangular ship
    - Speed up animations based on time dilation
    - Have Wigner rotation rotate the world rather than the player
    - Thomas precession
        - I think this is actually done    
    - Collisions?
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
  timesScalar = (s) =>
    new Matrix2D(this.a * s, this.b * s, this.c * s, this.d * s);
  timesVector = ({ x, y }) =>
    new Vector(this.a * x + this.b * y, this.c * x + this.d * y);
  timesMatrix = ({ a, b, c, d }) =>
    new Matrix2D(
      this.a * a + this.b * c,
      this.a * b + this.b * d,
      this.c * a + this.d * c,
      this.c * b + this.d * d
    );
  inverse() {
    let { a, b, c, d } = this;
    let determinant = a * d - b * c;
    return new Matrix2D(d, -b, -c, a).timesScalar(1 / determinant);
  }
  static fromEigenvectors(v1, e1, v2, e2) {
    let scale = new Matrix2D(e1, 0, 0, e2);
    let basis = new Matrix2D(v1.x, v2.x, v1.y, v2.y);
    return basis.timesMatrix(scale.timesMatrix(basis.inverse()));
  }
  toPixiMatrix() {
    return new PIXI.Matrix(this.a, this.c, this.b, this.d);
  }
}

let rotationMatrix = (theta) =>
  new Matrix2D(
    Math.cos(theta),
    -Math.sin(theta),
    Math.sin(theta),
    Math.cos(theta)
  );

let observedPoint = (reference, observing, velocity, gamma) => {
  // TODO: figure out the transformation matrix for this all :P
  // whoops, and we actually need the inverse transformation of this xD
  let dp = observing.minus(reference);
  let orth = dp.project(velocity.orthogonal());
  let coll = dp.project(velocity);
  return orth.plus(coll.times(1 / gamma)).plus(reference);
};

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
    let u = this,
      v = other;
    let u_gamma = u.gamma();
    let u_dot_v = u.dot(v);
    return u
      .times(1 + ((u_dot_v / C2) * u_gamma) / (1 + u_gamma))
      .plus(v.times(1 / u_gamma))
      .times(1 / (1 + u_dot_v / C2));
  }
  thomasRotationAngle(other) {
    // https://en.wikipedia.org/wiki/Wigner_rotation#Finding_the_axis_and_angle_of_the_Thomas_rotation
    // Hmm what's the sign of the rotation here? I actually just don't know or have any intuitive sense.
    // It seems like it tracks with the article that the resulting angle is commutative in u + v vs v + u
    let u = this,
      v = other;
    let u_gamma = u.gamma(),
      v_gamma = v.gamma(),
      composite_gamma = u_gamma * v_gamma * (1 + u.dot(v) / C2);
    // z component of the cross product
    // negated because ?! anyway it seems much better behaved this way; not negating it causes accelerations
    // to become unstable and you can get weird cases where a constant acceleration causes you to travel in circles
    // relative to coordinate space
    // I suspect it's negative because of some weirdness in the way I'm thinking about coordinate space.
    // I'm still wondering if I need to do this at all, or if I can somehow make this a more natural part of the simulation;
    // the physical meaning of this rotation still eludes me.
    let sign = -Math.sign(u.x * v.y - u.y * v.x);
    return (
      sign *
      Math.acos(
        Math.pow(1 + u_gamma + v_gamma + composite_gamma, 2) /
          ((1 + u_gamma) * (1 + v_gamma) * (1 + composite_gamma)) -
          1
      )
    );
  }
  plus = (other) => new Vector(this.x + other.x, this.y + other.y);
  dot = (other) => this.x * other.x + this.y * other.y;
  minus = (other) => new Vector(this.x - other.x, this.y - other.y);
  times = (m) => new Vector(this.x * m, this.y * m);
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
  }
  toString() {
    return `V{${this.x.toFixed(5)}, ${this.y.toFixed(5)}}`;
  }
}

// let visibleGridPoints = function* (center) {
//   let { x, y } = this.corner(center);
//   for (let i = x - posMod(x, D); i < x + this.width; i += D) {
//     for (let j = y - posMod(y, D); j < y + this.height; j += D) {
//       yield new Vector(i, j);
//     }
//   }
// };

// function drawGrid(ctx, center, color = "white") {
//   for (let gridPoint of this.visibleGridPoints(center)) {
//     let { x, y } = this.pixelCoordinates(gridPoint, center);
//     drawPoint(ctx, x, y, color, 3);
//   }
// }

// function drawContractedGrid(ctx, center, velocity) {
//   let gamma = velocity.gamma();
//   for (let gridPoint of this.visibleGridPoints(center)) {
//     let observed = observedPoint(center, gridPoint, velocity, gamma);
//     let { x, y } = this.pixelCoordinates(observed, center);
//     drawPoint(ctx, x, y, "green", 3);
//   }
// }

// let drawBackground = (ctx, width, height) => {
//   ctx.fillStyle = "#222222";
//   ctx.fillRect(0, 0, width, height);
// };

let drawPoint = (ctx, x, y, color = null, strokeWidth = 1) => {
  let fillStyle = ctx.fillStyle;
  if (color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(
    x - strokeWidth / 2,
    y - strokeWidth / 2,
    strokeWidth,
    strokeWidth
  );
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
  for (let { x, y } of gridPoints(corner.x, corner.y, width, height, d)) {
    drawPoint(ctx, x, y, (color = "white"));
  }
};

class PhysicalObject {
  MASS = 1;
  constructor(
    position,
    velocity = new Vector(),
    direction = new Vector(1, 0),
    mass = this.MASS
  ) {
    // TODO We're not creating all objects at the beginning of the game :P They should start
    // with the time of the object that created them probably
    this.t = 0;
    this.mass = mass;
    this.position = position;
    this.velocity = velocity;
    this.angularVelocity = 0;
    this.direction = direction;
    this.externalForces = [];
  }
  properForces() {
    return this.externalForces;
  }
  properAcceleration() {
    var forces = new Vector();
    this.properForces().forEach((force) => {
      forces = forces.plus(force);
    });
    return forces.times(1 / this.mass);
  }
  resetObject() {
    this.object = this.pixiObject();
  }
  pixiObject() {
    return new Graphics();
  }
  update(properDT) {
    this.t += properDT;
    let { position, velocity, direction } = this;
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
      this.direction = rotationMatrix(
        velocity.thomasRotationAngle(boost)
      ).timesVector(direction);
    }
    if (this.angularVelocity != 0) {
      this.direction = rotationMatrix(
        properDT * this.angularVelocity
      ).timesVector(this.direction);
    }
    // Update PIXI object
    this.object.position.set(this.position.x, this.position.y);
    this.object.rotation = Math.atan2(this.direction.y, this.direction.x);
  }
}

class Ship extends PhysicalObject {
  size = 100;
  color = 0xffffff;
  constructor(position, velocity = new Vector(), direction = new Vector(1, 0)) {
    super(position, (velocity = velocity), (direction = direction));
    this.thrust = 0;
  }
  properForces() {
    return [this.direction.times(this.thrust), ...super.properForces()];
  }
  pixiObject() {
    var graphics = new Graphics();
    graphics.beginFill(this.color);
    let radius = this.size / 2;
    graphics.drawCircle(0, 0, radius);
    graphics.endFill();

    graphics.lineStyle(3, 0xff0000);
    graphics.moveTo(0, 0);
    graphics.lineTo(radius, 0);
    return graphics;
  }
}

class ReferenceFrame extends PIXI.Container {
  constructor(velocity = new Vector()) {
    super();
    this.objects = new PIXI.Container();
    super.addChild(this.objects);
    this.velocity = velocity;
  }
  addChild(object) {
    this.objects.addChild(object);
  }
}

class Player {
  constructor(object) {
    // object is a PhysicalObject, not a PIXI.DrawableObject;
    // we might need a rename to make this separation more clear
    this.referenceFrame = new ReferenceFrame();
    object.resetObject();
    this.object = object;
    this.referenceFrame.addChild(object.object);
  }
  update(properDT) {
    this.object.update(properDT);
    this.referenceFrame.velocity = this.object.velocity;
    this.object.object.position.set(0, 0);
    this.referenceFrame.position.set(
      this.object.position.x,
      this.object.position.y
    );
  }
}

class Station extends PhysicalObject {
  size = 360;
  color = 0xffffff;
  update(properDT) {
    super.update(properDT);
    this.text.text = `Clock: ${this.t.toFixed(3)}`;
  }
  pixiObject() {
    var graphics = new Graphics();
    graphics.beginFill(this.color);
    let radius = this.size / 2;
    graphics.drawCircle(0, 0, radius);
    graphics.endFill();

    graphics.lineStyle(3, 0xff0000);
    graphics.moveTo(0, 0);
    graphics.lineTo(radius, 0);

    // Changing text is supposedly expensive, might need to figure out a better option
    // Better option is to use BitmapText, we'll cross that bridge later
    let text = new Text(
      "",
      new TextStyle({ align: "center", fill: 0x00ff00, fontSize: 30 })
    );
    this.text = text;
    graphics.addChild(text);
    return graphics;
  }
}

class ReactiveText {
  constructor(updateText, style = {}) {
    this.updateText = updateText;
    this.pixiObject = new Text("", new TextStyle({ ...style }));
  }
  update() {
    this.pixiObject.text = this.updateText();
  }
}

class Game {
  constructor(app) {
    this.app = app;
    this.gameLayer = new PIXI.Container();
    this.gameLayer.transform.setFromMatrix(
      new PIXI.Matrix()
        .scale(PIXELS_PER_METER, PIXELS_PER_METER)
        .translate(app.screen.width / 2, app.screen.height / 2)
    );

    // Because of JS weirdness we can't do this in the constructor, so
    // this is basically the canonical construction for now
    this.player = new Player(new Ship(new Vector(), new Vector(0.01, 0.03)));
    this.gameLayer.addChild(this.player.referenceFrame);

    this.stations = [
      new Station(new Vector(-20000, 0)),
      new Station(new Vector(500, 500)),
      new Station(new Vector(20000, 0)),
    ];
    this.coordinateFrame = new ReferenceFrame();
    this.stations.forEach((station) => {
      station.resetObject();
      this.coordinateFrame.addChild(station.object);
    });
    // The universe is always relative to the player's reference frame.
    // Add at 0 to draw under the player
    this.player.referenceFrame.addChildAt(this.coordinateFrame, 0);
    this.thrust_delta = 8;
    this.debug = true;
    this.stuff = [];
    app.stage.addChild(this.gameLayer);
    app.stage.addChild(this.debugInfo(app));
  }
  debugInfo = (app) => {
    let container = new PIXI.Container();
    // ctx.font = "10px Major Mono Display";
    // ctx.fillStyle = "white";
    [
      () => `Position ${this.player.object.position}`,
      () =>
        `Beta: ${(this.player.referenceFrame.velocity.magnitude() / C).toFixed(
          5
        )}c`,
      () => `Velocity direction: ${this.player.referenceFrame.velocity.unit()}`,
      () => `Acceleration: ${this.player.object.properAcceleration()}`,
      () => `Time: ${this.player.object.t.toFixed(3)}`,
    ].forEach((updateText, i) => {
      let text = new ReactiveText(updateText, {
        fill: 0xffffff,
        fontSize: 15,
      });
      this.stuff.push(text);
      console.log(app.screen);
      text.pixiObject.position.set(10, (i + 1) * 20);
      container.addChild(text.pixiObject);
    });
    return container;
  };
  updateState = (dt) => {
    // dt is proper time for the player
    this.player.update(dt);
    this.stuff.forEach((o) => o.update(dt));
    // time contraction for other objects
    // we still need to implement the doppler effect / "fog of war", ie. you should observe other objects as they were
    // relative to your distance and the speed of light. It might make sense for every object to maintain a state history
    // that can be sampled, and then we can garbage collect this history when no observers exist that could observe older state
    this.stations.forEach((station) =>
      station.update(
        dt * station.velocity.minus(this.player.referenceFrame.velocity).gamma()
      )
    );
    // TODO: move most of this logic into ReferenceFrame.
    // TODO: ReferenceFrames should not be able to be decoupled, eg. there's a strong assumption
    //       that every object in a reference frame will always have relative velocity 0.
    let coordVelocity = this.player.referenceFrame.velocity;
    let transform = Matrix2D.fromEigenvectors(
      coordVelocity,
      1 / coordVelocity.gamma(),
      coordVelocity.orthogonal(),
      1
    );
    // This is complex and hard to get right.
    // - We have a player with a rest reference frame.
    //   - The player is always at the center of their reference frame.
    // - We need objects to appear transformed with a lorentz transform relative
    //     to the origin of the player's reference frame.
    // - PIXI has a pivot, which changes the origin of rotation, but not scaling / skew
    // - So to get the right transformation at the right origin, we
    //   - have a reference frame (PIXI container) whose origin is the player's position
    //   - apply the transformation in that container
    //   - have a second container inside it whose coordinates are relative to the player's position
    this.coordinateFrame.objects.position.set(
      -this.player.object.position.x,
      -this.player.object.position.y
    );
    this.coordinateFrame.transform.setFromMatrix(transform.toPixiMatrix());
    this.gameLayer.pivot.set(
      this.player.object.position.x,
      this.player.object.position.y
    );
  };
  tick = (ctx, dt) => {
    let t = new Date().getTime();
    this.updateState(dt);
    // this.draw(ctx);
    let updateTime = new Date().getTime() - t;
    let nextTick = TICK_MS - updateTime;
    let nextDT = 1 / TICK_MS;
    window.setTimeout(() => this.tick(ctx, nextDT), nextTick);
  };
  run = (ctx) => {
    this.tick(ctx, 0);
  };
  handleKeyDown = ({ code }) => {
    switch (code) {
      case "KeyW":
        this.player.object.thrust = this.thrust_delta;
        break;
      case "KeyS":
        this.player.object.thrust = -this.thrust_delta;
        break;
      case "KeyA":
        this.player.object.angularVelocity = -0.3;
        break;
      case "KeyD":
        this.player.object.angularVelocity = 0.3;
        break;
    }
  };
  handleKeyUp = ({ code }) => {
    console.log(code);
    switch (code) {
      case "KeyW":
        this.player.object.thrust = 0;
        break;
      case "KeyS":
        this.player.object.thrust = 0;
        break;
      case "KeyA":
        this.player.object.angularVelocity = 0;
        break;
      case "KeyD":
        this.player.object.angularVelocity = 0;
        break;
    }
  };
  handleKeyPress = ({ key, code }) => {
    switch (
      code
      //   case "KeyA":
      //       this.player.object.angularVelocity = -0.03;
      //     break;
      //   case "KeyD":
      //       this.player.object.angularVelocity = 0.03;
      //     break;
    ) {
    }
  };
}

var main = () => {
  let width = window.innerWidth,
    height = window.innerHeight;
  let app = new PIXI.Application({ width, height, backgroundColor: 0x191919 });
  document.body.appendChild(app.view);

  let game = new Game(app);
  // Not using app.ticker because it turns time into some frame time that I don't care about per se
  // it may make sense to translate at some point to get a smoother gameplay experience ie. more ticks/s
  game.run();
  document.addEventListener("keypress", game.handleKeyPress);
  document.addEventListener("keydown", game.handleKeyDown);
  document.addEventListener("keyup", game.handleKeyUp);
};

document.addEventListener("DOMContentLoaded", main);
