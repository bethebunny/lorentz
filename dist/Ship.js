import PhysicalObjectWithThrust from './PhysicalObjectWithThrust.js';
import { Graphics } from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
export default class Ship extends PhysicalObjectWithThrust {
    size = 50;
    color = 0xffffff;
    createPixiObject() {
        var graphics = new Graphics();
        graphics.beginFill(this.color);
        let radius = this.size / 2;
        graphics.lineStyle(3, 0x000000);
        graphics.drawCircle(0, 0, radius);
        graphics.endFill();
        graphics.moveTo(0, 0);
        graphics.lineTo(radius, 0);
        return graphics;
    }
    createMinimapObject() {
        return new Graphics().beginFill(0x00ff00).drawCircle(0, 0, 3).endFill();
    }
}
//# sourceMappingURL=Ship.js.map