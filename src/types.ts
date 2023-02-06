import { LEFT_OR_RIGHT, MOVE } from "./constants";

export type BlockType = {
    color: string;
    state: "blank" | "fixed" | "drop" | "duplicated" | "end";
};

export type Players = {
    [key: string]: BlockType[][];
};

export type GameState = "playing" | "stop" | "end";

export type RowWidth = { x: number; y: number };

export type LeftOrRight = typeof LEFT_OR_RIGHT[keyof typeof LEFT_OR_RIGHT];

export type Move = typeof MOVE[keyof typeof MOVE];
