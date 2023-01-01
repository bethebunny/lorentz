import PhysicalObject from './PhysicalObject.js';
export default class PhysicalObjectWithThrust extends PhysicalObject {
    thrust = 0;
    properForces() {
        return [this.direction.times(this.thrust), ...super.properForces()];
    }
}
//# sourceMappingURL=PhysicalObjectWithThrust.js.map