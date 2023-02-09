import { configureStore } from "@reduxjs/toolkit";

// redux slice
import nextBlockSlice from "./reducer/nextBlock";
import gameStateSlice from "./reducer/gameState";

export const store = configureStore({
    reducer: {
        nextBlock: nextBlockSlice,
        gameState: gameStateSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
