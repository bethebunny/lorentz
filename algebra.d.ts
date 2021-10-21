import { Matrix as PixiMatrix } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";
export declare class Vector {
    readonly x: number;
    readonly y: number;
    constructor(x?: number, y?: number);
    relativisticPlus(other: Vector): Vector;
    thomasRotationAngle(other: Vector): number;
    plus: (other: Vector) => Vector;
    dot: (other: Vector) => number;
    minus: (other: Vector) => Vector;
    times: (m: number) => Vector;
    magnitude: () => number;
    unit: () => Vector;
    orthogonal: () => Vector;
    project(onto: Vector): Vector;
    gamma(): number;
    lorentzTransform(): Matrix2D;
    inverseLorentzTransform(): Matrix2D;
    toString(): string;
}
export declare class Matrix2D {
    a: number;
    b: number;
    c: number;
    d: number;
    constructor(a: number, b: number, c: number, d: number);
    timesScalar: (s: number) => Matrix2D;
    timesVector: ({ x, y }: Vector) => Vector;
    timesMatrix: ({ a, b, c, d }: Matrix2D) => Matrix2D;
    inverse(): Matrix2D;
    static fromEigenvectors(v1: Vector, e1: number, v2: Vector, e2: number): Matrix2D;
    toPixiMatrix(): PixiMatrix;
}
export declare let rotationMatrix: (theta: number) => Matrix2D;
