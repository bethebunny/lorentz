import { C2 } from './constants.js';

import { Matrix as PixiMatrix } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';

export class Vector {
  constructor(readonly x = 0, readonly y = 0) {}
  relativisticPlus(other: Vector): Vector {
    // https://en.wikipedia.org/wiki/Wigner_rotation#Two_general_boosts
    // Not associative or commutative, also results in a net rotation (thomasRotation)
    // I think there's something wrong here, close enough to C a boost perpendicular to the original speed
    // ends up moving in the opposite direction of the new boost
    let u = this,
      v = other;
    let u_gamma = u.gamma();
    let u_dot_v = u.dot(v);
    return u
      .times(1 + ((u_dot_v / C2) * u_gamma) / (1 + u_gamma))
      .plus(v.times(1 / u_gamma))
      .times(1 / (1 + u_dot_v / C2));
  }
  thomasRotationAngle(other: Vector): number {
    // https://en.wikipedia.org/wiki/Wigner_rotation#Finding_the_axis_and_angle_of_the_Thomas_rotation
    // Hmm what's the sign of the rotation here? I actually just don't know or have any intuitive sense.
    // It seems like it tracks with the article that the resulting angle is commutative in u + v vs v + u
    let u = this,
      v = other;
    let u_gamma = u.gamma(),
      v_gamma = v.gamma(),
      composite_gamma = u_gamma * v_gamma * (1 + u.dot(v) / C2);
    // z component of the cross product
    // negated because ?! anyway it seems much better behaved this way; not negating it causes accelerations
    // to become unstable and you can get weird cases where a constant acceleration causes you to travel in circles
    // relative to coordinate space
    // I suspect it's negative because of some weirdness in the way I'm thinking about coordinate space.
    // I'm still wondering if I need to do this at all, or if I can somehow make this a more natural part of the simulation;
    // the physical meaning of this rotation still eludes me.
    let sign = -Math.sign(u.x * v.y - u.y * v.x);
    return (
      sign *
      Math.acos(
        Math.pow(1 + u_gamma + v_gamma + composite_gamma, 2) /
          ((1 + u_gamma) * (1 + v_gamma) * (1 + composite_gamma)) -
          1
      )
    );
  }
  plus = (other: Vector): Vector => new Vector(this.x + other.x, this.y + other.y);
  dot = (other: Vector): number => this.x * other.x + this.y * other.y;
  minus = (other: Vector): Vector => new Vector(this.x - other.x, this.y - other.y);
  times = (m: number): Vector => new Vector(this.x * m, this.y * m);
  magnitude = (): number => Math.sqrt(this.x * this.x + this.y * this.y);
  unit = (): Vector => this.times(1 / this.magnitude());
  orthogonal = (): Vector => new Vector(-this.y, this.x);
  project(onto: Vector): Vector {
    let unit = onto.unit();
    return unit.times(this.dot(unit));
  }
  gamma(): number {
    let v = this.magnitude();
    return Math.pow(1 - (v * v) / C2, -0.5);
  }
  lorentzTransform(): Matrix2D {
    return Matrix2D.fromEigenvectors(this, 1 / this.gamma(), this.orthogonal(), 1);
  }
  inverseLorentzTransform(): Matrix2D {
    return Matrix2D.fromEigenvectors(this, this.gamma(), this.orthogonal(), 1);
  }
  toString(): string {
    return `V{${this.x.toFixed(5)}, ${this.y.toFixed(5)}}`;
  }
}

export class Matrix2D {
  constructor(public a: number, public b: number, public c: number, public d: number) {}
  timesScalar = (s: number): Matrix2D =>
    new Matrix2D(this.a * s, this.b * s, this.c * s, this.d * s);
  timesVector = ({ x, y }: Vector): Vector =>
    new Vector(this.a * x + this.b * y, this.c * x + this.d * y);
  timesMatrix = ({ a, b, c, d }: Matrix2D): Matrix2D =>
    new Matrix2D(
      this.a * a + this.b * c,
      this.a * b + this.b * d,
      this.c * a + this.d * c,
      this.c * b + this.d * d
    );
  inverse(): Matrix2D {
    let { a, b, c, d } = this;
    let determinant = a * d - b * c;
    return new Matrix2D(d, -b, -c, a).timesScalar(1 / determinant);
  }
  static fromEigenvectors(v1: Vector, e1: number, v2: Vector, e2: number): Matrix2D {
    let scale = new Matrix2D(e1, 0, 0, e2);
    let basis = new Matrix2D(v1.x, v2.x, v1.y, v2.y);
    return basis.timesMatrix(scale.timesMatrix(basis.inverse()));
  }
  toPixiMatrix(): PixiMatrix {
    return new PixiMatrix(this.a, this.c, this.b, this.d);
  }
}

export let rotationMatrix = (theta: number) =>
  new Matrix2D(Math.cos(theta), -Math.sin(theta), Math.sin(theta), Math.cos(theta));
