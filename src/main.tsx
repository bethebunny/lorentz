import { Vector } from './algebra.js';
import { C, MINIMAP_SCALE, PIXELS_PER_METER } from './constants.js';

import Minimap from './Minimap.js';

import PhysicalObject from './PhysicalObject.js';
import PhysicalObjectWithThrust from './PhysicalObjectWithThrust.js';
import Ship from './Ship.js';
import Station from './Station.js';
import ReferenceFrame from './ReferenceFrame.js';

import {
  Container,
  Graphics,
} from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
import * as PIXI from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';

import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
const { createContext, useContext, useState, useEffect } = React;

// WebFont is janky, see https://github.com/typekit/webfontloader/issues/393
import * as _WebFont from 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
let WebFont = window.WebFont;
// Force TypeScript to not compile out the import
if (_WebFont) Object.defineProperty(window.WebFont, 'loaded', { value: true });

/* TODO:
    - Display all visible grid coordinates
        - Regardless of viewpoint
    - Simplify or eliminate the duality between PhysicalObject and PIXI.DisplayObject.
    - Simplify minimap / viewport abstractions
    - Fuel / different engines
    - Inventory
    - Triangular ship
    - Particles for thrust
    - Render lorentz contraction correctly for other moving entities
      - Currently contraction is based on player relative to lab frame, not relative to other entities
        which is correct only for "non-moving" entities
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
  constructor(
    { x: xmin, y: ymin }: Vector,
    { x: xmax, y: ymax }: Vector,
    private step: number,
    private color: number
  ) {
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
    let posMod = (x: number, n: number): number => ((x % n) + n) % n;
    this.position.set(posMod(x, this.step), posMod(y, this.step));
  }
}

class Player {
  readonly referenceFrame: ReferenceFrame;

  constructor(readonly object: PhysicalObjectWithThrust) {
    this.referenceFrame = new ReferenceFrame(
      object.velocity,
      new Set([object])
    );
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

const GameContext = createContext(null);

// Used to allow custom types to not update state in useGameState if they're "equal".
function customReconciliation<T>(oldValue: T, newValue: T): T {
  if (oldValue instanceof Vector && newValue instanceof Vector) {
    return oldValue.x === newValue.x && oldValue.y === newValue.y ? oldValue : newValue;
  }
  return newValue;
}

function useGameState<T>(stateFn: (game: Game) => T, memo: Array<any> = []): T {
  const game = useContext(GameContext);
  const [gameState, setGameState] = useState(stateFn(game));

  // Using gameState directly would be saved in the closure to be the original value.
  // We need to somehow be able to get the _new_ state value inside the closure for when it calls.
  // Solution: we use the _updater_ API (https://beta.reactjs.org/reference/react/useState#updating-state-based-on-the-previous-state)
  // to get the current state for reconciliation.
  useEffect(() => {
    const token = game.subscribe(game => setGameState(gameState => customReconciliation(gameState, stateFn(game))));
    return () => game.unsubscribe(token);
  }, [game, ...memo]);

  return gameState;
}

function HUD({player}: {player: Player}) {
  const position = useGameState(() => player.object.position);
  const velocity = useGameState(() => player.referenceFrame.velocity);
  const acceleration = useGameState(() => player.object.properAcceleration());
  const time = useGameState(() => player.object.t);

  return <div className="navText">
    <p>Position: {position.toString()}</p>
    <p>Beta: {(velocity.magnitude() / C).toFixed(5)}</p>
    <p>Gamma: {velocity.gamma().toFixed(5)}</p>
    <p>Velocity direction: {velocity.unit().toString()}</p>
    <p>Acceleration: {acceleration.toString()}</p>
    <p>Time: {time.toFixed(0)}</p>
  </div>;
}

function InspectionPane({player, selected}: {player: Player, selected: PhysicalObject}) {
  if (selected === null) {
    return <div />;
  }

  const time = useGameState(() => selected.t, [selected]);
  const position = useGameState(() => selected.position, [selected]);
  // Implicitly used in observedDistance
  const _playerPosition = useGameState(() => player.object.position);
  const _selectedVelocity = useGameState(() => selected.velocity, [selected]);

  const observedDistance = player.object.observedDistance(selected);

  return <div className="panel inspectionPane">
    <p>Name: {selected.toString()}</p>
    <p>Time: {time.toFixed(0)}</p>
    <p>Position: {position.toString()}</p>
    <p>Distance: {observedDistance.toFixed(1)}</p>
    <p>Relative velocity/gamma, ETA: TODO</p>
  </div>;
}

function UI() {
  const player = useGameState(game => game.player);
  const selected = useGameState(game => game.selected);

  return <div>
    <HUD player={player}/>
    <InspectionPane player={player} selected={selected}/>
  </div>
}

const WORLD_DATA = [
  new ReferenceFrame(
    new Vector(0, 0),
    new Set([
      new Station('Station Alpha', new Vector(-4000, 0)),
      new Station('Station Beta', new Vector(250, 250)),
      new Station('Station Gamma', new Vector(4000, 0))
    ])
  )
];

type ReactDOMRoot = {
  render: (node: any) => any,
}

type SubscribeToken = (game: Game) => any;

class Game {
  // Game display info and tracking
  public worldLayer: Container = new Container();
  public followingPlayer: boolean = true;
  public minimap: Minimap;
  public viewportPosition: Vector;
  public selected: PhysicalObject | null = null;

  // Callbacks updated after game state update
  private _subscribers: Set<(game: Game) => any> = new Set();


  // Game viz grid
  private _playerGrid: Grid = new Grid(
    new Vector(-1000, -1000),
    new Vector(1000, 1000),
    100,
    0x555555
  );
  private _coordinateGrid: Grid = new Grid(
    new Vector(-1000, -1000),
    new Vector(1000, 1000),
    100,
    0x448844
  );

  // Game world state
  public player: Player = new Player(
    new Ship('Player', new Vector(2000, 0), new Vector(0.01, 0.03))
  );
  public referenceFrames: Array<ReferenceFrame> = [];
  public lastUpdateTime: number = new Date().getTime();

  // Constant
  public thrustDelta: number = 7.5;

  // TODO: Game should internally make and own the Application
  constructor(public app: PIXI.Application, public reactRoot: ReactDOMRoot) {
    this.worldLayer.transform.setFromMatrix(
      new PIXI.Matrix()
        .scale(PIXELS_PER_METER, PIXELS_PER_METER)
        .translate(app.screen.width / 2, app.screen.height / 2)
    );

    // TODO: Haven't written down much today, but rough state right now
    // - Got text rendering in react \o/
    // - There's still some weirdness with es-react, we can't use the most recent versions of react
    // - We can't compile and self-host modules, which would be _really_ nice, could hack/run without network access
    // - Minimap
    //   - Is still part of the "HUD"
    //   - Has some extra container we probably don't need
    //   - Probably _could_ be pulled out into a separate HTML element, eg. style and placement could be managed with CSS
    //   - Unclear whether PIXI would be chill with this
    // - State model
    //   - State is owned by the Game instance
    //   - React components can follow the pattern HUD uses to subscribe to Game state updates
    //   - They're responsible for extracting components they care about, and deciding if they need to re-render, through their state object
    //   - They also have the Game instance, in case they want to push state changes back
    //   - References:
    //     - https://reactjs.org/docs/integrating-with-other-libraries.html#extracting-data-from-backbone-models
    //     - https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1

    reactRoot.render(
      <GameContext.Provider value={this}>
        <UI />
      </GameContext.Provider>
    );
    this.buildMinimap();
    this.worldLayer.addChild(this.player.referenceFrame);
    this.minimap.objects.addChild(
      this.player.referenceFrame.minimapObjectContainer
    );

    // Add initial world data
    WORLD_DATA.forEach((frame) => {
      this.referenceFrames.push(frame);
      // The universe is drawn relative to the player's reference frame.
      // We track other reference frames individually in this.referenceFrames, but we only draw
      // this.player.referenceFrame, so we need to add other frames as its children.
      // Add at 0; this maintains that player is always the last child and therefore drawn on top.
      this.player.referenceFrame.addChildAt(frame, 0);
      // TODO:
      this.minimap.objects.addChild(frame.minimapObjectContainer);
      // Yikes, we probably need a better way for objects to be able to update game state?
      // I really don't want to be maintaining this for newly created objects etc.
      frame.objects.forEach(object => {
        if (object !== this.player.object && object.pixiObject.interactive) {
          object.pixiObject.on('pointerdown', () => this.selected = object);
        }
      })
    });

    this.selected = WORLD_DATA[0].objects.values().next().value;

    this.player.referenceFrame.addChildAt(this._playerGrid, 0);
    // this.referenceFrames[0] is coordinate frame for now :P
    this.referenceFrames[0].addChildAt(this._coordinateGrid, 0);

    app.stage.addChild(this.worldLayer);
    app.stage.addChild(this.minimap);
    this.viewportPosition = this.player.object.position;
  }

  buildMinimap() {
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
  }

  subscribe = (callback: (game: Game) => any): SubscribeToken => {
    this._subscribers.add(callback);
    return callback;
  }

  unsubscribe = (token: SubscribeToken) => {
    this._subscribers.delete(token);
  }

  updateState = (dt: number) => {
    // dt is proper time for the player
    let oldPosition = this.player.object.position;
    this.player.update(dt);

    let { position, velocity } = this.player.object;

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

    // Update any game state subscribers
    this._subscribers.forEach(callback => callback(this));
  };

  tick = () => {
    let t = new Date().getTime();
    this.updateState((t - this.lastUpdateTime) / 1000);
    this.lastUpdateTime = t;
  };

  handleKeyDown = ({ code }) => {
    switch (code) {
      case 'KeyW':
        this.player.object.thrust = this.thrustDelta;
        break;
      case 'KeyS':
        this.player.object.thrust = -this.thrustDelta;
        break;
      case 'KeyA':
        this.player.object.angularVelocity = -3;
        break;
      case 'KeyD':
        this.player.object.angularVelocity = 3;
        break;
      case 'Space':
        this.followingPlayer = true;
        break;
    }
  };

  handleKeyUp = ({ code }) => {
    console.log(code);
    switch (code) {
      case 'KeyW':
        this.player.object.thrust = 0;
        break;
      case 'KeyS':
        this.player.object.thrust = 0;
        break;
      case 'KeyA':
        this.player.object.angularVelocity = 0;
        break;
      case 'KeyD':
        this.player.object.angularVelocity = 0;
        break;
      case 'Escape':
        this.selected = null;
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
      google: { families: ['Major Mono Display'] },
      active: () => resolve(null)
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
    antialias: true
  });
  document.body.appendChild(app.view);

  let reactRoot = {
    render: node => ReactDOM.render(node, document.getElementById('react-root')),
  };

  let game = new Game(app, reactRoot);
  // Can also just use setTimeout but using app.ticker in case that's better for frame something something
  app.ticker.add(game.tick);
  document.addEventListener('keypress', game.handleKeyPress);
  document.addEventListener('keydown', game.handleKeyDown);
  document.addEventListener('keyup', game.handleKeyUp);
};

document.addEventListener('DOMContentLoaded', () => setup().then(main));
