/// <reference types="react" />
import { React } from 'https://unpkg.com/es-react/dev';
import Game from "./Game.js";
export declare const GameContext: React.Context<any>;
export declare function useGameState<T>(stateFn: (game: Game) => T, memo?: Array<any>): T;
export declare function UI(): JSX.Element;
