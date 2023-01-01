import { Vector } from './algebra.js';
import ReferenceFrame from './ReferenceFrame.js';
import { Graphics } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
export default class PhysicalObject {
    position: Vector;
    velocity: Vector;
    direction: Vector;
    mass: number;
    static MASS: number;
    t: number;
    angularVelocity: number;
    externalForces: Array<Vector>;
    private _referenceFrame;
    pixiObject: Graphics | null;
    minimapObject: Graphics | null;
    constructor(position: Vector, velocity?: Vector, direction?: Vector, mass?: number);
    properForces(): Array<Vector>;
    properAcceleration(): Vector;
    set referenceFrame(frame: ReferenceFrame);
    get referenceFrame(): ReferenceFrame;
    resetPixiObjects(): void;
    createPixiObject(): Graphics;
    createMinimapObject(): Graphics;
    update(properDT: any): void;
}
