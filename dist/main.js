import Game from './Game.js';
import { GameContext, UI } from './ui.js';
import * as PIXI from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.1.3/browser/pixi.mjs';
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// WebFont is janky, see https://github.com/typekit/webfontloader/issues/393
import * as _WebFont from 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
let WebFont = window.WebFont;
// Force TypeScript to not compile out the import
if (_WebFont)
    Object.defineProperty(window.WebFont, 'loaded', { value: true });
/* TODO:
    - Display all visible grid coordinates
        - Regardless of viewpoint
    - Simplify or eliminate the duality between PhysicalObject and PIXI.DisplayObject.
    - Simplify minimap / viewport abstractions
    - Fuel / different engines
    - Inventory
    - Triangular ship
    - Particles for thrust
    - Render lorentz contraction correctly for other moving entities
      - Currently contraction is based on player relative to lab frame, not relative to other entities
        which is correct only for "non-moving" entities
    - Speed up animations based on time dilation
    - Have Wigner rotation rotate the world rather than the player
    - Thomas precession
        - I think this is actually done
    - Relativity for rotation
    - Time no longer pauses on tab-out
    - Collisions?
    - Have the ship always point upwards and rotate space instead?
        - Render a compass
    - Interact with stations
    - Doppler effect on color visuals
        - Likely needs to be de-emphasized to be actually visible at high speeds x
    
    - Much later
        - Gravity
        - General relativity
*/
let setup = () => {
    return new Promise((resolve) => WebFont.load({
        google: { families: ['Major Mono Display'] },
        active: () => resolve(null)
    }));
};
let main = () => {
    let width = window.innerWidth, height = window.innerHeight;
    let app = new PIXI.Application({
        width,
        height,
        backgroundColor: 0x191919,
        antialias: true
    });
    document.body.appendChild(app.view);
    let game = new Game(app);
    ReactDOM.render(React.createElement(GameContext.Provider, { value: game },
        React.createElement(UI, null)), document.getElementById('react-root'));
    // Can also just use setTimeout but using app.ticker in case that's better for frame something something
    app.ticker.add(game.tick);
    document.addEventListener('keypress', game.handleKeyPress);
    document.addEventListener('keydown', game.handleKeyDown);
    document.addEventListener('keyup', game.handleKeyUp);
};
document.addEventListener('DOMContentLoaded', () => setup().then(main));
//# sourceMappingURL=main.js.map