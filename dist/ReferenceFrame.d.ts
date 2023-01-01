import { Vector } from './algebra.js';
import PhysicalObject from './PhysicalObject.js';
import { Container } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
export default class ReferenceFrame extends Container {
    velocity: Vector;
    objects: Set<PhysicalObject>;
    objectContainer: Container;
    minimapObjectContainer: Container;
    constructor(velocity?: Vector, objects?: Set<PhysicalObject>);
    addObject(object: PhysicalObject): void;
    removeObject(object: PhysicalObject): void;
    update(observerDT: number, observerFrame: ReferenceFrame, observerPosition: Vector, oldObserverPosition: Vector): void;
}
