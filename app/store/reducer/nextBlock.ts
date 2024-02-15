import { createSlice } from "@reduxjs/toolkit";

// type
import { Board } from "../../types";
import { RootState } from "../";

type NextBlock = {
    tetromino: Board[];
};

const initialState: NextBlock = { tetromino: [] };

export const nextBlockSlice = createSlice({
    name: "nextBlock",
    initialState,
    reducers: {
        setTetromino: (state, action) => {
            state.tetromino = action.payload;
        },
    },
});

// export actions
export const { setTetromino } = nextBlockSlice.actions;

// export states
export const tetrominoState = (state: RootState) => state.nextBlock;

export default nextBlockSlice.reducer;
