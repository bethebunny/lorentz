import PhysicalObject from './PhysicalObject.js';

import {
  Graphics,
  Text,
  TextStyle
} from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
import * as PIXI from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';

export default class Station extends PhysicalObject {
  size = 180;
  color = 0xffffff;
  name = 'Station 1';
  private text: Text | null = null;

  update(properDT: number) {
    super.update(properDT);
    this.text.text = `Clock: ${this.t.toFixed(3)}`;
  }
  createPixiObject() {
    var graphics = new Graphics();
    graphics.beginFill(this.color);
    let radius = this.size / 2;
    graphics.lineStyle(3, 0x000000);
    graphics.drawCircle(0, 0, radius);
    graphics.endFill();

    graphics.moveTo(0, 0);
    graphics.lineTo(radius, 0);

    // Changing text is supposedly expensive, might need to figure out a better option
    // Better option is to use BitmapText, we'll cross that bridge later
    let text = new Text(
      '',
      new TextStyle({
        fontWeight: 'bold',
        align: 'center',
        fill: 0x00aa33,
        fontSize: 15
      })
    );
    text.position.set(-35, 20);
    this.text = text;
    graphics.addChild(text);
    return graphics;
  }
  createMinimapObject() {
    let g = new Graphics().beginFill(0xffffff).drawCircle(0, 0, 3).endFill();
    g.interactive = true;
    g.hitArea = new PIXI.Circle(0, 0, 10);
    let text = new Text(
      this.name,
      new TextStyle({
        fill: 0xffffff,
        fontSize: 10,
        fontFamily: 'Major Mono Display'
      })
    );
    text.position.set(10, -10);
    text.visible = false;
    g.addChild(text);
    g.on('mouseover', () => {
      text.visible = true;
    });
    g.on('mouseout', () => {
      text.visible = false;
    });
    return g;
  }
}
