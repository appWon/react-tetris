import { LEFT_OR_RIGHT } from "./constants";

export type BlockType = {
    color: string;
    state: "blank" | "fixed" | "drop" | "duplicated" | "end";
};

export type GameState = "playing" | "stop" | "end";

export type RowWidth = { x: number; y: number };

export type LeftOrRight = typeof LEFT_OR_RIGHT[keyof typeof LEFT_OR_RIGHT];
