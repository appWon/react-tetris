import { createSlice } from "@reduxjs/toolkit";

// constants
import { INIT_POSITION } from "../../constants";

// type
import { RootState } from "..";
import { GameState, RowWidth } from "../../types";

export type GameStateType = {
    gameResult: "WINNER" | "LOSER" | null;
    position: RowWidth;
    isPlaying: GameState;
    isReady: boolean;
};

const initialState: GameStateType = {
    isPlaying: "stop",
    position: INIT_POSITION,
    isReady: false,
    gameResult: null,
};

export const gameStateSlice = createSlice({
    name: "nextBlock",
    initialState,
    reducers: {
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },

        setPosition: (state, action) => {
            state.position.x += action.payload.x;
            state.position.y += action.payload.y;
        },

        setResetPostion: (state, action) => {
            state.position = action.payload;
        },

        setReady: (state, action) => {
            state.isReady = action.payload;
        },

        setGameResult: (state, action) => {
            state.gameResult = action.payload;
        },
    },
});

// export actions
export const {
    setPosition,
    setIsPlaying,
    setResetPostion,
    setReady,
    setGameResult,
} = gameStateSlice.actions;

// export states
export const gameState = (state: RootState) => state.gameState;

export default gameStateSlice.reducer;
