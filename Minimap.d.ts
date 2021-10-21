import { Vector } from "./algebra.js";
import { Container, Graphics } from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";
import * as PIXI from "https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs";
export default class Minimap extends Graphics {
    objects: Container;
    private viewportWidth;
    private viewportHeight;
    private viewportOutline;
    private draggingViewport;
    onViewportSelect: (position: PIXI.ObservablePoint) => void;
    interactive: boolean;
    constructor(width: number, height: number, screen: PIXI.Rectangle);
    updateViewport(velocity: Vector, center: Vector): void;
    startDrag(event: PIXI.InteractionEvent): void;
    endDrag(event: PIXI.InteractionEvent): void;
    dragMove(event: PIXI.InteractionEvent): void;
}
