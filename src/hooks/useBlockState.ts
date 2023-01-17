import { useState, useEffect } from "react";

import { ROW, COLUMN, BLOCK_LIST } from "../constants";

interface UseBlockState {
    x: number;
    y: number;
}

interface BlockType {
    type: "blank" | "dropBlock";
}

export const useBlockState = (props: UseBlockState) => {
    const [floorBlock, setFloorBlock] = useState<BlockType[][]>([]);
    const [currentBLock, setCurrentBlock] = useState<BlockType[][]>([]);

    useEffect(() => {
        const blockInitTalState = [...Array(COLUMN)].map((_) =>
            [...Array(ROW)].fill(0)
        );
        setFloorBlock(blockInitTalState);
    }, []);

    useEffect(() => {
        const dropBlock: BlockType[][] = BLOCK_LIST[1].map((row) =>
            row.map((_) => ({
                type: "dropBlock",
            }))
        );

        setCurrentBlock(dropBlock);
    }, []);

    const rotateBlock = (arr: number[][]) => {
        const temp: number[][] = [];

        for (let row = 0; row < arr.length; row++) {
            temp[row] = [];
            for (let column = 0; column < arr[0].length; column++) {
                // if (position === "right")
                temp[row][column] = arr[arr.length - 1 - column][row];
                // else
                // temp[row][column] =
                //     arr[arr.length - 1 - row][arr.length - 1 - column];
            }
        }

        return temp;
    };

    const renderBlock = () => {
        const arrBlock: BlockType[][] = floorBlock.map((row) =>
            row.map(({ type }) => ({
                type: type !== "dropBlock" ? type : "blank",
            }))
        );

        currentBLock.forEach((row, x) => {
            row.forEach((_, y) => {
                arrBlock[x + props.x][y + props.y].type = "dropBlock";
            });
        });

        return arrBlock;
    };

    const setBlock = () => {
        setFloorBlock(() => renderBlock());
    };

    // const setLotateBlock = () => {
    //     setCurrentBlock(rotateBlock(currentBLock));
    // };

    return [renderBlock, currentBLock, floorBlock, setBlock] as const;
};
