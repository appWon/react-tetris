import { createSlice } from "@reduxjs/toolkit";

// type
import { BlockType } from "../../types";
import { RootState } from "../";

type NextBlock = {
    nextBlocks: Array<BlockType[][]>;
};

const initialState: NextBlock = { nextBlocks: [] };

export const nextBlockSlice = createSlice({
    name: "nextBlock",
    initialState,
    reducers: {
        setNextBlocks: (state, action) => {
            state.nextBlocks = action.payload;
        },
    },
});

// export actions
export const { setNextBlocks } = nextBlockSlice.actions;

// export states
export const nextBlock = (state: RootState) => state.nextBlock;

export default nextBlockSlice.reducer;
