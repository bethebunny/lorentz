import * as PIXI from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
import { Container } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
import { Vector } from './algebra.js';
import Minimap from './Minimap.js';
import PhysicalObject from './PhysicalObject.js';
import PhysicalObjectWithThrust from './PhysicalObjectWithThrust.js';
import ReferenceFrame from './ReferenceFrame.js';
export declare class Player {
    readonly object: PhysicalObjectWithThrust;
    readonly referenceFrame: ReferenceFrame;
    constructor(object: PhysicalObjectWithThrust);
    update(properDT: number): void;
}
type SubscribeToken = (game: Game) => any;
export default class Game {
    app: PIXI.Application;
    worldLayer: Container;
    followingPlayer: boolean;
    minimap: Minimap;
    viewportPosition: Vector;
    selected: PhysicalObject | null;
    private _subscribers;
    private _playerGrid;
    private _coordinateGrid;
    player: Player;
    referenceFrames: Array<ReferenceFrame>;
    lastUpdateTime: number;
    thrustDelta: number;
    constructor(app: PIXI.Application);
    buildMinimap(): void;
    subscribe: (callback: (game: Game) => any) => SubscribeToken;
    unsubscribe: (token: SubscribeToken) => void;
    updateState: (dt: number) => void;
    tick: () => void;
    handleKeyDown: ({ code }: {
        code: any;
    }) => void;
    handleKeyUp: ({ code }: {
        code: any;
    }) => void;
    handleKeyPress: ({ key, code }: {
        key: any;
        code: any;
    }) => void;
}
export {};
