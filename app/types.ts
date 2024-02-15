import { LEFT_OR_RIGHT, MOVE } from "./constants";

export type Cell = string;

export type Board = Cell[][];

export type Players = {
    [key: string]: Board;
};

export type GameState = "playing" | "stop" | "end";

export type Position = { x: number; y: number };

export type LeftOrRight = typeof LEFT_OR_RIGHT[keyof typeof LEFT_OR_RIGHT];

export type Move = typeof MOVE[keyof typeof MOVE];
