import { React } from 'https://unpkg.com/es-react/dev';
const { createContext, useContext, useState, useEffect } = React;
import { Vector } from "./algebra.js";
import { C } from "./constants.js";
import PhysicalObject from "./PhysicalObject.js";
import Game, { Player } from "./Game.js";


export const GameContext = createContext(null);

// Used to allow custom types to not update state in useGameState if they're "equal".
function customReconciliation<T>(oldValue: T, newValue: T): T {
  if (oldValue instanceof Vector && newValue instanceof Vector) {
    return oldValue.x === newValue.x && oldValue.y === newValue.y ? oldValue : newValue;
  }
  return newValue;
}

export function useGameState<T>(stateFn: (game: Game) => T, memo: Array<any> = []): T {
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

function HUD({player}: {player: Player}) {
  const position = useGameState(() => player.object.position, [player]);
  const velocity = useGameState(() => player.referenceFrame.velocity, [player]);
  const acceleration = useGameState(() => player.object.properAcceleration(), [player]);
  const time = useGameState(() => player.object.t, [player]);

  return <div className="navText">
    <p>Position: {position.toString()}</p>
    <p>Beta: {(velocity.magnitude() / C).toFixed(5)}</p>
    <p>Gamma: {velocity.gamma().toFixed(5)}</p>
    <p>Velocity direction: {velocity.unit().toString()}</p>
    <p>Acceleration: {acceleration.toString()}</p>
    <p>Time: {time.toFixed(0)}</p>
  </div>;
}

function InspectionPane({player, selected}: {player: Player, selected: PhysicalObject}) {
  if (selected === null) {
    return <div />;
  }

  const time = useGameState(() => selected.t, [selected]);
  const position = useGameState(() => selected.position, [selected]);
  // Implicitly used in observedDistance
  const _playerPosition = useGameState(() => player.object.position, [player]);
  const _selectedVelocity = useGameState(() => selected.velocity, [selected]);

  const observedDistance = player.object.observedDistance(selected);

  return <div className="panel inspectionPane">
    <p>Name: {selected.toString()}</p>
    <p>Time: {time.toFixed(0)}</p>
    <p>Position: {position.toString()}</p>
    <p>Distance: {observedDistance.toFixed(1)}</p>
    <p>Relative velocity/gamma, ETA: TODO</p>
  </div>;
}

export function UI() {
  const player = useGameState(game => game.player);
  const selected = useGameState(game => game.selected);

  return <div>
    <HUD player={player}/>
    <InspectionPane player={player} selected={selected}/>
  </div>
}