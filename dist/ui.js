import { React } from 'https://unpkg.com/es-react/dev';
const { createContext, useContext, useState, useEffect } = React;
import { Vector } from "./algebra.js";
import { C } from "./constants.js";
export const GameContext = createContext(null);
// Used to allow custom types to not update state in useGameState if they're "equal".
function customReconciliation(oldValue, newValue) {
    if (oldValue instanceof Vector && newValue instanceof Vector) {
        return oldValue.x === newValue.x && oldValue.y === newValue.y ? oldValue : newValue;
    }
    return newValue;
}
export function useGameState(stateFn, memo = []) {
    const game = useContext(GameContext);
    const [gameState, setGameState] = useState(stateFn(game));
    // Using gameState directly would be saved in the closure to be the original value.
    // We need to somehow be able to get the _new_ state value inside the closure for when it calls.
    // Solution: we use the _updater_ API (https://beta.reactjs.org/reference/react/useState#updating-state-based-on-the-previous-state)
    // to get the current state for reconciliation.
    useEffect(() => {
        const token = game.subscribe(game => setGameState(gameState => customReconciliation(gameState, stateFn(game))));
        return () => game.unsubscribe(token);
    }, [game, ...memo]);
    return gameState;
}
function HUD({ player }) {
    const position = useGameState(() => player.object.position, [player]);
    const velocity = useGameState(() => player.referenceFrame.velocity, [player]);
    const acceleration = useGameState(() => player.object.properAcceleration(), [player]);
    const time = useGameState(() => player.object.t, [player]);
    return React.createElement("div", { className: "navText" },
        React.createElement("p", null,
            "Position: ",
            position.toString()),
        React.createElement("p", null,
            "Beta: ",
            (velocity.magnitude() / C).toFixed(5)),
        React.createElement("p", null,
            "Gamma: ",
            velocity.gamma().toFixed(5)),
        React.createElement("p", null,
            "Velocity direction: ",
            velocity.unit().toString()),
        React.createElement("p", null,
            "Acceleration: ",
            acceleration.toString()),
        React.createElement("p", null,
            "Time: ",
            time.toFixed(0)));
}
function InspectionPane({ player, selected }) {
    if (selected === null) {
        return React.createElement("div", null);
    }
    const time = useGameState(() => selected.t, [selected]);
    const position = useGameState(() => selected.position, [selected]);
    // Implicitly used in observedDistance
    const _playerPosition = useGameState(() => player.object.position, [player]);
    const _selectedVelocity = useGameState(() => selected.velocity, [selected]);
    const observedDistance = player.object.observedDistance(selected);
    return React.createElement("div", { className: "panel inspectionPane" },
        React.createElement("p", null,
            "Name: ",
            selected.toString()),
        React.createElement("p", null,
            "Time: ",
            time.toFixed(0)),
        React.createElement("p", null,
            "Position: ",
            position.toString()),
        React.createElement("p", null,
            "Distance: ",
            observedDistance.toFixed(1)),
        React.createElement("p", null, "Relative velocity/gamma, ETA: TODO"));
}
export function UI() {
    const player = useGameState(game => game.player);
    const selected = useGameState(game => game.selected);
    return React.createElement("div", null,
        React.createElement(HUD, { player: player }),
        React.createElement(InspectionPane, { player: player, selected: selected }));
}
//# sourceMappingURL=ui.js.map