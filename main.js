//import { PIXI } from "https://pixijs.download/release/pixi.js";

const C = 50; // Speed of light in meters per second
const C2 = C * C;
const D = 1; // Meters between grid points
const PIXELS_PER_METER = 1;
const MINIMAP_SCALE = 1 / 50;

const { Container, Graphics, Text, TextStyle } = PIXI;

/* TODO:
    - Display all visible grid coordinates
    - Simplify or eliminate the duality between PhysicalObject and PIXI.DisplayObject.
    - Observe other entities delayed by distance
        - Detached / remote viewing
    - Fuel / different engines
    - Inventory
    - Triangular ship
    - Particles for thrust
    - Speed up animations based on time dilation
    - Have Wigner rotation rotate the world rather than the player
    - Thomas precession
        - I think this is actually done    
    - Relativity for rotation
    - Time no longer pauses on tab-out
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

// TODO: we want `step` to vary in x and y so we can have a separate scale / color
// Useful since length contraction only happens along the axis of travel
class Grid extends Graphics {
  constructor({ x: xmin, y: ymin }, { x: xmax, y: ymax }, step, color) {
    super();
    this.step = step;
    this.color = color;
    this.beginFill(color);
    let radius = 2;
    for (let x = xmin; x <= xmax; x += step) {
      for (let y = ymin; y <= ymax; y += step) {
        this.drawCircle(x, y, radius);
      }
    }
    // For grid lines instead
    // this.lineStyle(0.5, color);
    // for (let x = xmin; x <= xmax; x += step) {
    //   this.moveTo(x, ymin);
    //   this.lineTo(x, ymax);
    // }
    // for (let y = ymin; y <= ymax; y += step) {
    //   this.moveTo(xmin, y);
    //   this.lineTo(xmax, y);
    // }
  }
  set position({ x, y }) {
    return super.position.set(posMod(x, this.step), posMod(y, this.step));
  }
  get position() {
    return super.position;
  }
}

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
    this._referenceFrame = null;
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
  set referenceFrame(frame) {
    if (this._referenceFrame) {
      this._referenceFrame.removeChild(this);
    }
    this._referenceFrame = frame;
  }
  get referenceFrame() {
    return this._referenceFrame;
  }
  resetPixiObjects() {
    let { pixiObject, minimapObject } = this;
    this.pixiObject = this.createPixiObject();
    this.minimapObject = this.createMinimapObject();
    this.minimapObject.scale.set(1 / MINIMAP_SCALE, 1 / MINIMAP_SCALE);
    if (this._referenceFrame) {
      this._referenceFrame.objectContainer.removeChild(pixiObject);
      this._referenceFrame.objectContainer.addChild(this.pixiObject);
      this._referenceFrame.minimapObjectContainer.removeChild(minimapObject);
      this._referenceFrame.minimapObjectContainer.addChild(this.minimapObject);
    }
  }
  createPixiObject() {
    return new Graphics();
  }
  createMinimapObject() {
    // TODO: these should probably throw instead
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
    this.pixiObject.position.set(this.position.x, this.position.y);
    this.pixiObject.rotation = Math.atan2(this.direction.y, this.direction.x);
    this.minimapObject.position.set(this.position.x, this.position.y);
  }
}

class Ship extends PhysicalObject {
  size = 50;
  color = 0xffffff;
  constructor(position, velocity = new Vector(), direction = new Vector(1, 0)) {
    super(position, (velocity = velocity), (direction = direction));
    this.thrust = 0;
  }
  properForces() {
    return [this.direction.times(this.thrust), ...super.properForces()];
  }
  createPixiObject() {
    var graphics = new Graphics();
    graphics.beginFill(this.color);
    let radius = this.size / 2;
    graphics.lineStyle(3, 0x000000);
    graphics.drawCircle(0, 0, radius);
    graphics.endFill();

    graphics.moveTo(0, 0);
    graphics.lineTo(radius, 0);
    return graphics;
  }
  createMinimapObject() {
    return new Graphics().beginFill(0x00ff00).drawCircle(0, 0, 3).endFill();
  }
}

class Station extends PhysicalObject {
  size = 180;
  color = 0xffffff;
  name = "Station 1";
  update(properDT) {
    super.update(properDT);
    this.text.text = `Clock: ${this.t.toFixed(3)}`;
  }
  createPixiObject() {
    var graphics = new Graphics();
    graphics.beginFill(this.color);
    let radius = this.size / 2;
    graphics.lineStyle(3, 0x000000);
    graphics.drawCircle(0, 0, radius);
    graphics.endFill();

    graphics.moveTo(0, 0);
    graphics.lineTo(radius, 0);

    // Changing text is supposedly expensive, might need to figure out a better option
    // Better option is to use BitmapText, we'll cross that bridge later
    let text = new Text(
      "",
      new TextStyle({
        fontStyle: "bold",
        align: "center",
        fill: 0x00aa33,
        fontSize: 15,
      })
    );
    text.position.set(-35, 20);
    this.text = text;
    graphics.addChild(text);
    return graphics;
  }
  createMinimapObject() {
    let g = new Graphics().beginFill(0xffffff).drawCircle(0, 0, 3).endFill();
    g.interactive = true;
    g.hitArea = new PIXI.Circle(0, 0, 10);
    let text = new Text(
      this.name,
      new TextStyle({
        fill: 0xffffff,
        fontSize: 10,
        fontFamily: "Major Mono Display",
      })
    );
    text.position.set(10, -10);
    text.visible = false;
    g.addChild(text);
    g.mouseover = () => {
      text.visible = true;
    };
    g.mouseout = () => {
      text.visible = false;
    };
    return g;
  }
}

class ReferenceFrame extends Container {
  // A set of objects which are all locked at traveling at the same velocity and all
  // have the same proper time (not true once we add general relativity)
  // This is _somewhat_ of a physical analog, although in physics different points in
  // spacetime wouldn't share a reference frame.
  // It's mostly a great optimization that allows us to only compute transformations once
  // per group of objects with locked velocities.
  constructor(velocity = new Vector(), objects = []) {
    super();
    this.objects = new Set();
    this.objectContainer = new Container();
    this.minimapObjectContainer = new Container();
    super.addChild(this.objectContainer);
    this.velocity = velocity;
    objects.forEach(this.addChild.bind(this));
  }
  addChild(object) {
    // PhysicalObject, not PIXI.DrawableObject
    this.objects.add(object);
    object.referenceFrame = this;
    object.resetPixiObjects();
  }
  removeChild(object) {
    this.objects.remove(object);
    this.objectContainer.remove(object.pixiObject);
    this.minimapObjectContainer.remove(object.minimapObject);
  }
  update(observerDT, observerFrame, observerPosition) {
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
    let relativeVelocity = this.velocity
      .times(-1)
      .relativisticPlus(observerFrame.velocity);
    let gamma = relativeVelocity.gamma();
    let properDT = observerDT * gamma;

    // Update frame objects
    this.objects.forEach((o) => o.update(properDT));

    // Offset frame to the observer
    this.objectContainer.position.set(-observerPosition.x, -observerPosition.y);
    this.minimapObjectContainer.position.set(
      -observerPosition.x,
      -observerPosition.y
    );

    // Update the lorentz contraction transform
    let transform = Matrix2D.fromEigenvectors(
      relativeVelocity,
      1 / gamma,
      relativeVelocity.orthogonal(),
      1
    );
    this.transform.setFromMatrix(transform.toPixiMatrix());
  }
}

class Player {
  constructor(object) {
    // object is a PhysicalObject, not a PIXI.DrawableObject;
    // we might need a rename to make this separation more clear
    this.object = object;
    this.referenceFrame = new ReferenceFrame(object.velocity, [object]);
  }
  update(properDT) {
    // The player's object is always at the origin in its own reference frame.
    // The player's reference frame may move relative to the game world.
    this.object.update(properDT);
    this.referenceFrame.velocity = this.object.velocity;
    this.object.pixiObject.position.set(0, 0);
    this.object.minimapObject.position.set(0, 0);
    this.referenceFrame.position.set(
      this.object.position.x,
      this.object.position.y
    );
  }
}

let posMod = (x, n) => ((x % n) + n) % n;

class ReactiveText {
  constructor(updateText, style = {}) {
    this.updateText = updateText;
    this.pixiObject = new Text("", new TextStyle({ ...style }));
  }
  update() {
    // TODO: this currently updates every frame, it should be able to be marked as dirty or something
    this.pixiObject.text = this.updateText();
  }
}

const WORLD_DATA = [
  new ReferenceFrame(new Vector(0, 0), [
    new Station(new Vector(-4000, 0)),
    new Station(new Vector(250, 250)),
    new Station(new Vector(4000, 0)),
  ]),
];

let minimap = (width, height) => {
  let g = new Graphics();
  g.lineStyle(3, 0x0000ff);
  g.beginFill(0x000000);
  g.drawRect(0, 0, width, height);
  let objects = new Container();
  objects.position.set(width / 2, height / 2);
  objects.scale.set(MINIMAP_SCALE, MINIMAP_SCALE);
  g.objects = objects;
  g.addChild(objects);
  g._objects_mask = new Graphics()
    .beginFill(0xff3300)
    .drawRect(3, 2, width - 3, height - 3)
    .endFill();
  g.addChild(g._objects_mask);
  return g;
};

class Game {
  constructor(app) {
    this.app = app;
    this.worldLayer = new Container();
    this.worldLayer.transform.setFromMatrix(
      new PIXI.Matrix()
        .scale(PIXELS_PER_METER, PIXELS_PER_METER)
        .translate(app.screen.width / 2, app.screen.height / 2)
    );

    this._debugInfo = [];
    this.buildHUD();
    app.stage.addChild(this.worldLayer);
    app.stage.addChild(this.hud);

    this.player = new Player(
      new Ship(new Vector(0, 0), new Vector(0.01, 0.03))
    );
    this.worldLayer.addChild(this.player.referenceFrame);
    this.minimap.objects.addChild(
      this.player.referenceFrame.minimapObjectContainer
    );

    this.viewportPosition = this.player.object.position;
    // TODO: this doesn't quite work yet :D
    this.followingPlayer = true;

    this.referenceFrames = [];
    WORLD_DATA.forEach((frame) => {
      this.referenceFrames.push(frame);
      // The universe is always relative to the player's reference frame.
      // Add at 0 to draw under the player
      this.player.referenceFrame.addChildAt(frame, 0);
      // TODO
      this.minimap.objects.addChild(frame.minimapObjectContainer);
      frame.minimapObjectContainer.mask = this.minimap._objects_mask;
    });

    this._playerGrid = new Grid(
      new Vector(-1000, -1000),
      new Vector(1000, 1000),
      100,
      0x555555
    );

    this._coordinateGrid = new Grid(
      new Vector(-1000, -1000),
      new Vector(1000, 1000),
      100,
      0x448844
    );

    this.player.referenceFrame.addChildAt(this._playerGrid, 0);
    // this.referenceFrames[0] is coordinate frame for now :P
    this.referenceFrames[0].addChildAt(this._coordinateGrid, 0);

    this.last_update_time = new Date().getTime();

    this.thrust_delta = 7.5;
  }

  updateMinimapViewport(velocity, center) {
    // Manually transform the viewport so we can control the line width
    let { x, y } = center;
    let width = this.app.screen.width / 2,
      height = this.app.screen.height / 2;
    let ll = new Vector(x - width, y - height),
      lr = new Vector(x + width, y - height);
    let ul = new Vector(x - width, y + height),
      ur = new Vector(x + width, y + height);
    let transform = Matrix2D.fromEigenvectors(
      velocity,
      velocity.gamma(),
      velocity.orthogonal(),
      1
    );
    let tll = transform.timesVector(ll),
      tlr = transform.timesVector(lr),
      tul = transform.timesVector(ul),
      tur = transform.timesVector(ur);
    let viewport = new Graphics()
      .lineStyle(1 / MINIMAP_SCALE, 0x00ff00)
      .moveTo(tll.x, tll.y)
      .lineTo(tlr.x, tlr.y)
      .lineTo(tur.x, tur.y)
      .lineTo(tul.x, tul.y)
      .lineTo(tll.x, tll.y);
    viewport.mask = this.minimap._objects_mask;
    if (this.viewport) this.minimap.objects.removeChild(this.viewport);
    this.viewport = viewport;
    this.minimap.objects.addChild(viewport);
  }

  buildHUD() {
    this.hud = new Container();
    [
      () => `Position ${this.player.object.position}`,
      () =>
        `Beta: ${(this.player.referenceFrame.velocity.magnitude() / C).toFixed(
          5
        )}c`,
      () => `Gamma: ${this.player.referenceFrame.velocity.gamma().toFixed(5)}`,
      () => `Velocity direction: ${this.player.referenceFrame.velocity.unit()}`,
      () => `Acceleration: ${this.player.object.properAcceleration()}`,
      () => `Time: ${this.player.object.t.toFixed(3)}`,
    ].forEach((updateText, i) => {
      let text = new ReactiveText(updateText, {
        fontFamily: "Major Mono Display",
        fill: 0xffffff,
        fontSize: 15,
      });
      this._debugInfo.push(text);
      text.pixiObject.position.set(10, (i + 1) * 20);
      this.hud.addChild(text.pixiObject);
    });

    let minimap_width = this.app.screen.width / 4,
      minimap_height = this.app.screen.height / 4;

    this.minimap = minimap(minimap_width, minimap_height);
    this.minimap.position.set(
      minimap_width / 10,
      this.app.screen.height - minimap_height - minimap_width / 10
    );
    this.hud.addChild(this.minimap);
  }

  updateState = (dt) => {
    // dt is proper time for the player
    this.player.update(dt);

    let { position, velocity } = this.player.object;
    let { x, y } = position;

    this._debugInfo.forEach((o) => o.update(dt));
    // we still need to implement the doppler effect / "fog of war", ie. you should observe other objects as they were
    // relative to your distance and the speed of light. It might make sense for every object to maintain a state history
    // that can be sampled, and then we can garbage collect this history when no observers exist that could observe older state
    this.referenceFrames.forEach((frame) => {
      frame.update(dt, this.player.referenceFrame, position);
    });

    // The world layer focuses on the player in the player's reference frame
    if (this.followingPlayer) this.viewportPosition = position;
    this.worldLayer.pivot.set(this.viewportPosition.x, this.viewportPosition.y);
    this.updateMinimapViewport(velocity, this.viewportPosition.minus(position));
    this._playerGrid.position = this.viewportPosition.times(-1);
    this._coordinateGrid.position = this.viewportPosition.times(-1);
  };
  tick = () => {
    let t = new Date().getTime();
    this.updateState((t - this.last_update_time) / 1000);
    this.last_update_time = t;
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
        this.player.object.angularVelocity = -3;
        break;
      case "KeyD":
        this.player.object.angularVelocity = 3;
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
    switch (code) {
    }
  };
}

let setup = () => {
  return new Promise((resolve) =>
    WebFont.load({
      google: { families: ["Major Mono Display"] },
      active: resolve,
    })
  );
};

let main = () => {
  let width = window.innerWidth,
    height = window.innerHeight;
  let app = new PIXI.Application({
    width,
    height,
    backgroundColor: 0x191919,
    antialias: true,
  });
  document.body.appendChild(app.view);

  let game = new Game(app);
  // Can also just use setTimeout but using app.ticker in case that's better for frame something something
  app.ticker.add(game.tick);
  document.addEventListener("keypress", game.handleKeyPress);
  document.addEventListener("keydown", game.handleKeyDown);
  document.addEventListener("keyup", game.handleKeyUp);
};

document.addEventListener("DOMContentLoaded", () => setup().then(main));
