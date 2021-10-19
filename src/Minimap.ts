import { MINIMAP_SCALE } from "./constants.js";
import { Vector } from "./algebra.js";

import { Container, Graphics } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";
import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";


export default class Minimap extends Graphics {
    public objects: Container = new Container();
    private viewportWidth: number
    private viewportHeight: number
    private viewportOutline: Graphics = new Graphics();
    private draggingViewport: boolean = false;
    public onViewportSelect: (position: PIXI.ObservablePoint) => void = (position) => null;

    interactive: boolean = true;

    constructor(width: number, height: number, screen: PIXI.Rectangle) {
        super();
        this.viewportWidth = screen.width;
        this.viewportHeight = screen.height;

        // Draw background and outline
        this.lineStyle(3, 0x0000ff);
        this.beginFill(0x000000);
        this.drawRect(0, 0, width, height);

        // Set up objects container
        this.objects.position.set(width / 2, height / 2);
        this.objects.scale.set(MINIMAP_SCALE, MINIMAP_SCALE);
        this.addChild(this.objects);

        // Set up mask (don't display objects outside of minimap bounds)
        this.objects.mask = new Graphics()
            .beginFill(0xff3300)
            .drawRect(3, 2, width - 3, height - 3)
            .endFill();
        // Adding as a child causes the mask's position to be relative to the Minimap's
        this.addChild(this.objects.mask);

        // Set up viewport outline
        this.viewportOutline.mask = this.objects.mask;
        this.objects.addChild(this.viewportOutline);

        // Set up interaction events
        this
            .on("pointerdown", this.startDrag.bind(this))
            .on("pointerup", this.endDrag.bind(this))
            .on("pointerout", this.endDrag.bind(this))
            .on("pointermove", this.dragMove.bind(this));
    }

    updateViewport(velocity: Vector, center: Vector) {
        // Manually transform the viewport so we can control the line width
        let { x, y } = center;
        let deltaX = this.viewportWidth / 2,
            deltaY = this.viewportHeight / 2;
        let ll = new Vector(x - deltaX, y - deltaY),
            lr = new Vector(x + deltaX, y - deltaY);
        let ul = new Vector(x - deltaX, y + deltaY),
            ur = new Vector(x + deltaX, y + deltaY);
        let transform = velocity.inverseLorentzTransform();
        let tll = transform.timesVector(ll),
            tlr = transform.timesVector(lr),
            tul = transform.timesVector(ul),
            tur = transform.timesVector(ur);

        this.viewportOutline
            .clear()
            .lineStyle(1 / MINIMAP_SCALE, 0x00ff00)
            .moveTo(tll.x, tll.y)
            .lineTo(tlr.x, tlr.y)
            .lineTo(tur.x, tur.y)
            .lineTo(tul.x, tul.y)
            .lineTo(tll.x, tll.y);
    }

    startDrag(event: PIXI.InteractionEvent) {
        this.draggingViewport = true;
        this.onViewportSelect(event.data.getLocalPosition(this));
    }

    endDrag(event: PIXI.InteractionEvent) {
        this.draggingViewport = false;
    }

    dragMove(event: PIXI.InteractionEvent) {
        if (this.draggingViewport) this.onViewportSelect(event.data.getLocalPosition(this));
    }
}