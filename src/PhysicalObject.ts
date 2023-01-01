import { Vector, rotationMatrix } from './algebra.js';
import { MINIMAP_SCALE } from './constants.js';
import ReferenceFrame from './ReferenceFrame.js';

import { Graphics } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';

export default class PhysicalObject {
  static MASS = 1;

  // TODO We're not creating all objects at the beginning of the game :P They should start
  // with the time of the object that created them. Objects at the beginning of the game
  // should start with negative t based on distance to the player.
  public t: number = 0;
  public angularVelocity: number = 0;
  public externalForces: Array<Vector> = [];
  private _referenceFrame: ReferenceFrame | null = null;
  public pixiObject: Graphics | null = null;
  public minimapObject: Graphics | null = null;

  constructor(
    public position: Vector,
    public velocity: Vector = new Vector(),
    public direction: Vector = new Vector(1, 0),
    public mass: number = PhysicalObject.MASS
  ) {}
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
