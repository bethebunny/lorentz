import PhysicalObject from './PhysicalObject.js';

export default class PhysicalObjectWithThrust extends PhysicalObject {
  public thrust: number = 0;
  properForces() {
    return [this.direction.times(this.thrust), ...super.properForces()];
  }
}
