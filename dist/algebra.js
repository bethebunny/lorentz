import { C2 } from './constants.js';
import { Matrix as PixiMatrix } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
export class Vector {
    x;
    y;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    relativisticPlus(other) {
        // https://en.wikipedia.org/wiki/Wigner_rotation#Two_general_boosts
        // Not associative or commutative, also results in a net rotation (thomasRotation)
        // I think there's something wrong here, close enough to C a boost perpendicular to the original speed
        // ends up moving in the opposite direction of the new boost
        let u = this, v = other;
        let u_gamma = u.gamma();
        let u_dot_v = u.dot(v);
        return u
            .times(1 + ((u_dot_v / C2) * u_gamma) / (1 + u_gamma))
            .plus(v.times(1 / u_gamma))
            .times(1 / (1 + u_dot_v / C2));
    }
    thomasRotationAngle(other) {
        // https://en.wikipedia.org/wiki/Wigner_rotation#Finding_the_axis_and_angle_of_the_Thomas_rotation
        // Hmm what's the sign of the rotation here? I actually just don't know or have any intuitive sense.
        // It seems like it tracks with the article that the resulting angle is commutative in u + v vs v + u
        let u = this, v = other;
        let u_gamma = u.gamma(), v_gamma = v.gamma(), composite_gamma = u_gamma * v_gamma * (1 + u.dot(v) / C2);
        // z component of the cross product
        // negated because ?! anyway it seems much better behaved this way; not negating it causes accelerations
        // to become unstable and you can get weird cases where a constant acceleration causes you to travel in circles
        // relative to coordinate space
        // I suspect it's negative because of some weirdness in the way I'm thinking about coordinate space.
        // I'm still wondering if I need to do this at all, or if I can somehow make this a more natural part of the simulation;
        // the physical meaning of this rotation still eludes me.
        let sign = -Math.sign(u.x * v.y - u.y * v.x);
        return (sign *
            Math.acos(Math.pow(1 + u_gamma + v_gamma + composite_gamma, 2) /
                ((1 + u_gamma) * (1 + v_gamma) * (1 + composite_gamma)) -
                1));
    }
    plus = (other) => new Vector(this.x + other.x, this.y + other.y);
    dot = (other) => this.x * other.x + this.y * other.y;
    minus = (other) => new Vector(this.x - other.x, this.y - other.y);
    times = (m) => new Vector(this.x * m, this.y * m);
    magnitude = () => Math.sqrt(this.x * this.x + this.y * this.y);
    unit = () => this.times(1 / this.magnitude());
    orthogonal = () => new Vector(-this.y, this.x);
    project(onto) {
        let unit = onto.unit();
        return unit.times(this.dot(unit));
    }
    gamma() {
        let v = this.magnitude();
        return Math.pow(1 - (v * v) / C2, -0.5);
    }
    lorentzTransform() {
        return Matrix2D.fromEigenvectors(this, 1 / this.gamma(), this.orthogonal(), 1);
    }
    inverseLorentzTransform() {
        return Matrix2D.fromEigenvectors(this, this.gamma(), this.orthogonal(), 1);
    }
    toString() {
        return `V{${this.x.toFixed(2)}, ${this.y.toFixed(2)}}`;
    }
}
export class Matrix2D {
    a;
    b;
    c;
    d;
    constructor(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }
    timesScalar = (s) => new Matrix2D(this.a * s, this.b * s, this.c * s, this.d * s);
    timesVector = ({ x, y }) => new Vector(this.a * x + this.b * y, this.c * x + this.d * y);
    timesMatrix = ({ a, b, c, d }) => new Matrix2D(this.a * a + this.b * c, this.a * b + this.b * d, this.c * a + this.d * c, this.c * b + this.d * d);
    inverse() {
        let { a, b, c, d } = this;
        let determinant = a * d - b * c;
        return new Matrix2D(d, -b, -c, a).timesScalar(1 / determinant);
    }
    static fromEigenvectors(v1, e1, v2, e2) {
        let scale = new Matrix2D(e1, 0, 0, e2);
        let basis = new Matrix2D(v1.x, v2.x, v1.y, v2.y);
        return basis.timesMatrix(scale.timesMatrix(basis.inverse()));
    }
    toPixiMatrix() {
        return new PixiMatrix(this.a, this.c, this.b, this.d);
    }
}
export let rotationMatrix = (theta) => new Matrix2D(Math.cos(theta), -Math.sin(theta), Math.sin(theta), Math.cos(theta));
//# sourceMappingURL=algebra.js.map