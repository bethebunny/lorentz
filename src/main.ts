import { Vector, rotationMatrix } from './algebra.js'
import { C, MINIMAP_SCALE, PIXELS_PER_METER } from './constants.js'

import { Container, Graphics, Text, TextStyle } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";
import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";

// WebFont is janky, see https://github.com/typekit/webfontloader/issues/393
import * as _WebFont from "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
let WebFont = window.WebFont;
// Force TypeScript to not compile out the import
if (_WebFont) Object.defineProperty(window.WebFont, "loaded", { value: true });

/* TODO:
    - Display all visible grid coordinates
        - Regardless of viewpoint
    - Simplify or eliminate the duality between PhysicalObject and PIXI.DisplayObject.
    - Simplify minimap / viewport abstractions
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

// TODO: we want `step` to vary in x and y so we can have a separate scale / color
// Useful since length contraction only happens along the axis of travel
class Grid extends Graphics {
  constructor({ x: xmin, y: ymin }: Vector, { x: xmax, y: ymax }: Vector, private step: number, private color: number) {
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
  setPosition({ x, y }: Vector) {
    this.position.set(posMod(x, this.step), posMod(y, this.step));
  }
}

class PhysicalObject {
  static MASS = 1;

  // TODO We're not creating all objects at the beginning of the game :P They should start
  // with the time of the object that created them. Objects at the beginning of the game
  // should start with negative t based on distance to the player.
  public t: number = 0;
  public angularVelocity: number = 0;
  public externalForces: Array<Vector> = [];
  private _referenceFrame: ReferenceFrame | null = null;
  public pixiObject: PIXI.Graphics | null = null;
  public minimapObject: PIXI.Graphics | null = null;

  constructor(
    public position: Vector,
    public velocity: Vector = new Vector(),
    public direction: Vector = new Vector(1, 0),
    public mass: number = PhysicalObject.MASS
  ) { }
  properForces(): Array<Vector> {
    return this.externalForces;
  }
  properAcceleration(): Vector {
    var forces = new Vector();
    this.properForces().forEach((force) => {
      forces = forces.plus(force);
    });
    return forces.times(1 / this.mass);
  }
  set referenceFrame(frame) {
    if (this._referenceFrame) {
      this._referenceFrame.removeObject(this);
    }
    this._referenceFrame = frame;
    this.resetPixiObjects();
  }
  get referenceFrame(): ReferenceFrame {
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
    // Right now length contraction is basically computed here; we update the player's position in the coordinate frame
    // as v * dt * gamma, which can either be interpreted as length contraction (from the perspective of the ship)
    // or time dilation (from the perspective of the coordinate frame's clock)
    this.position = position.plus(velocity.times(properDT * velocity.gamma()));
    // Update PIXI object
    this.pixiObject.position.set(this.position.x, this.position.y);
    this.pixiObject.rotation = Math.atan2(this.direction.y, this.direction.x);
    this.minimapObject.position.set(this.position.x, this.position.y);
  }
}

class PhysicalObjectWithThrust extends PhysicalObject {
  public thrust: number = 0;
  properForces() {
    return [this.direction.times(this.thrust), ...super.properForces()];
  }
}

class Ship extends PhysicalObjectWithThrust {
  readonly size = 50;
  readonly color = 0xffffff;
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
  private text: PIXI.Text | null = null;

  update(properDT: number) {
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
        fontWeight: "bold",
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
    g.on("mouseover", () => {
      text.visible = true;
    });
    g.on("mouseout", () => {
      text.visible = false;
    });
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
  public objectContainer: Container = new Container();
  public minimapObjectContainer: Container = new Container();
  constructor(public velocity: Vector = new Vector(), public objects: Set<PhysicalObject> = new Set()) {
    super();
    super.addChild(this.objectContainer);
    objects.forEach(this.addObject.bind(this));
  }
  addObject(object: PhysicalObject) {
    // PhysicalObject, not PIXI.DrawableObject
    this.objects.add(object);
    object.referenceFrame = this;
  }
  removeObject(object: PhysicalObject) {
    this.objects.delete(object);
    this.objectContainer.removeChild(object.pixiObject);
    this.minimapObjectContainer.removeChild(object.minimapObject);
  }
  update(observerDT: number, observerFrame: ReferenceFrame, observerPosition: Vector, oldObserverPosition: Vector) {
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
    //      - the objects themselves have position in world coordinates
    //      - the container then has position of the inverse of player position
    let relativeVelocity = this.velocity
      .times(-1)
      .relativisticPlus(observerFrame.velocity);
    let gamma = relativeVelocity.gamma();
    let properDT = observerDT * gamma;

    // Update frame objects
    this.objects.forEach((o) => {
      let oldDistance = o.position.minus(oldObserverPosition).magnitude();
      let newDistance = o.position.minus(observerPosition).magnitude();
      let dopplerDT = (oldDistance - newDistance) / C;
      o.update(properDT + dopplerDT);
    });

    // Offset frame object container relative to the observer
    this.objectContainer.position.set(-observerPosition.x, -observerPosition.y);
    this.minimapObjectContainer.position.set(
      -observerPosition.x,
      -observerPosition.y
    );

    // Update the lorentz contraction transform
    this.transform.setFromMatrix(
      relativeVelocity.lorentzTransform().toPixiMatrix()
    );
  }
}

class Player {
  readonly referenceFrame: ReferenceFrame;

  constructor(readonly object: PhysicalObjectWithThrust) {
    this.referenceFrame = new ReferenceFrame(object.velocity, new Set([object]));
  }

  update(properDT: number) {
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

let posMod = (x: number, n: number): number => ((x % n) + n) % n;

// TODO: replace this with actual React and just render over the webgl :P
class ReactiveText {
  public pixiObject: Text;
  constructor(readonly updateText: () => string, style = {}) {
    this.pixiObject = new Text("", new TextStyle({ ...style }));
  }
  update() {
    // TODO: this currently updates every frame, it should be able to be marked as dirty or something
    this.pixiObject.text = this.updateText();
  }
}

const WORLD_DATA = [
  new ReferenceFrame(new Vector(0, 0), new Set([
    new Station(new Vector(-4000, 0)),
    new Station(new Vector(250, 250)),
    new Station(new Vector(4000, 0)),
  ])),
];


class Minimap extends Graphics {
  public objects: Container = new Container();
  private viewportWidth: number
  private viewportHeight: number
  private viewportOutline: Graphics = new Graphics();
  private draggingViewport: boolean = false;
  public onViewportSelect: (position: PIXI.ObservablePoint) => void = (position) => null;

  interactive: boolean = true;

  constructor(width: number, height: number, screen: PIXI.Rectangle) {
    super();
    this.viewportWidth = screen.width;
    this.viewportHeight = screen.height;

    // Draw background and outline
    this.lineStyle(3, 0x0000ff);
    this.beginFill(0x000000);
    this.drawRect(0, 0, width, height);

    // Set up objects container
    this.objects.position.set(width / 2, height / 2);
    this.objects.scale.set(MINIMAP_SCALE, MINIMAP_SCALE);
    this.addChild(this.objects);

    // Set up mask (don't display objects outside of minimap bounds)
    this.objects.mask = new Graphics()
      .beginFill(0xff3300)
      .drawRect(3, 2, width - 3, height - 3)
      .endFill();
    // Adding as a child causes the mask's position to be relative to the Minimap's
    this.addChild(this.objects.mask);

    // Set up viewport outline
    this.viewportOutline.mask = this.objects.mask;
    this.objects.addChild(this.viewportOutline);

    // Set up interaction events
    this
      .on("pointerdown", this.startDrag.bind(this))
      .on("pointerup", this.endDrag.bind(this))
      .on("pointerout", this.endDrag.bind(this))
      .on("pointermove", this.dragMove.bind(this));
  }

  updateViewport(velocity: Vector, center: Vector) {
    // Manually transform the viewport so we can control the line width
    let { x, y } = center;
    let deltaX = this.viewportWidth / 2,
      deltaY = this.viewportHeight / 2;
    let ll = new Vector(x - deltaX, y - deltaY),
      lr = new Vector(x + deltaX, y - deltaY);
    let ul = new Vector(x - deltaX, y + deltaY),
      ur = new Vector(x + deltaX, y + deltaY);
    let transform = velocity.inverseLorentzTransform();
    let tll = transform.timesVector(ll),
      tlr = transform.timesVector(lr),
      tul = transform.timesVector(ul),
      tur = transform.timesVector(ur);

    this.viewportOutline
      .clear()
      .lineStyle(1 / MINIMAP_SCALE, 0x00ff00)
      .moveTo(tll.x, tll.y)
      .lineTo(tlr.x, tlr.y)
      .lineTo(tur.x, tur.y)
      .lineTo(tul.x, tul.y)
      .lineTo(tll.x, tll.y);
  }

  startDrag(event: PIXI.InteractionEvent) {
    this.draggingViewport = true;
    this.onViewportSelect(event.data.getLocalPosition(this));
  }

  endDrag(event: PIXI.InteractionEvent) {
    this.draggingViewport = false;
  }

  dragMove(event: PIXI.InteractionEvent) {
    if (this.draggingViewport) this.onViewportSelect(event.data.getLocalPosition(this));
  }
}

class Game {
  // Game display info and tracking
  public worldLayer: Container = new Container();
  public hud: Container = new Container();  // TODO: make this React / move it outside of webgl
  private _debugInfo: Array<ReactiveText> = [];
  public followingPlayer: boolean = true;

  public minimap: Minimap;
  public viewportPosition: Vector;

  // Game viz grid
  private _playerGrid: Grid = new Grid(new Vector(-1000, -1000), new Vector(1000, 1000), 100, 0x555555);
  private _coordinateGrid: Grid = new Grid(new Vector(-1000, -1000), new Vector(1000, 1000), 100, 0x448844);

  // Game world state
  public player: Player = new Player(
    new Ship(new Vector(2000, 0), new Vector(0.01, 0.03))
  );
  public referenceFrames: Array<ReferenceFrame> = [];
  public last_update_time: number = new Date().getTime();

  // Constant
  public thrust_delta: number = 7.5;

  // TODO: Game should internally make and own the Application
  constructor(public app: PIXI.Application) {
    this.worldLayer.transform.setFromMatrix(
      new PIXI.Matrix()
        .scale(PIXELS_PER_METER, PIXELS_PER_METER)
        .translate(app.screen.width / 2, app.screen.height / 2)
    );

    this.buildHUD();
    app.stage.addChild(this.worldLayer);
    app.stage.addChild(this.hud);
    this.worldLayer.addChild(this.player.referenceFrame);
    this.minimap.objects.addChild(
      this.player.referenceFrame.minimapObjectContainer
    );

    this.viewportPosition = this.player.object.position;

    // Add initial world data
    WORLD_DATA.forEach((frame) => {
      this.referenceFrames.push(frame);
      // The universe is always relative to the player's reference frame.
      // Add at 0 to draw under the player
      this.player.referenceFrame.addChildAt(frame, 0);
      // TODO
      this.minimap.objects.addChild(frame.minimapObjectContainer);
      // frame.minimapObjectContainer.mask = this.minimap.objects_mask;
    });

    this.player.referenceFrame.addChildAt(this._playerGrid, 0);
    // this.referenceFrames[0] is coordinate frame for now :P
    this.referenceFrames[0].addChildAt(this._coordinateGrid, 0);
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

    this.minimap = new Minimap(minimap_width, minimap_height, this.app.screen);
    this.minimap.position.set(
      minimap_width / 10,
      this.app.screen.height - minimap_height - minimap_width / 10
    );
    this.minimap.onViewportSelect = (({ x, y }: PIXI.ObservablePoint) => {
      // TODO: move math into Minimap
      this.viewportPosition = new Vector(
        x - minimap_width / 2,
        y - minimap_height / 2
      )
        .times(1 / MINIMAP_SCALE)
        .plus(this.player.object.position);
      this.followingPlayer = false;
    }).bind(this);

    this.hud.addChild(this.minimap);
  }

  updateState = (dt) => {
    // dt is proper time for the player
    let oldPosition = this.player.object.position;
    this.player.update(dt);

    let { position, velocity } = this.player.object;
    let { x, y } = position;

    this._debugInfo.forEach((o) => o.update());

    // We use the old position to compute doppler effects and observational delay
    // The simulator only computes new state as needed eg. as observed by the player
    // given distance to observed objects and C.
    this.referenceFrames.forEach((frame) => {
      frame.update(dt, this.player.referenceFrame, position, oldPosition);
    });

    if (this.followingPlayer) this.viewportPosition = position;
    let contractedViewpoint = velocity
      .lorentzTransform()
      .timesVector(this.viewportPosition.minus(position))
      .plus(position);

    // Update UI with the new player position and viewpoint
    this.worldLayer.pivot.set(contractedViewpoint.x, contractedViewpoint.y);
    this.minimap.updateViewport(velocity, contractedViewpoint.minus(position));
    this._playerGrid.setPosition(contractedViewpoint.times(-1));
    this._coordinateGrid.setPosition(contractedViewpoint.times(-1));
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
      case "Space":
        this.followingPlayer = true;
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
      active: () => resolve(null),
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
