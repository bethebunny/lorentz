import PhysicalObjectWithThrust from './PhysicalObjectWithThrust.js';
import { Graphics } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
export default class Ship extends PhysicalObjectWithThrust {
    readonly size = 50;
    readonly color = 16777215;
    createPixiObject(): Graphics;
    createMinimapObject(): Graphics;
}
