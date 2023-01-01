import PhysicalObject from './PhysicalObject.js';
export default class PhysicalObjectWithThrust extends PhysicalObject {
    thrust: number;
    properForces(): import("./algebra.js").Vector[];
}
