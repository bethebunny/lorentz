import { Vector } from './algebra.js'
import { C, MINIMAP_SCALE, PIXELS_PER_METER } from './constants.js'

import Minimap from './Minimap.js';

import PhysicalObjectWithThrust from './PhysicalObjectWithThrust.js';
import Ship from './Ship.js';
import Station from './Station.js';
import ReferenceFrame from './ReferenceFrame.js';

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
