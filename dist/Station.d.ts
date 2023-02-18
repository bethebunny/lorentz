import PhysicalObject from './PhysicalObject.js';
import { Graphics } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
export default class Station extends PhysicalObject {
    size: number;
    color: number;
    private text;
    update(properDT: number): void;
    createPixiObject(): Graphics;
    createMinimapObject(): Graphics;
    toString(): string;
}
