import { Vector } from './algebra.js';
import { C } from './constants.js';
import PhysicalObject from './PhysicalObject.js';

import { Container } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";


export default class ReferenceFrame extends Container {
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
