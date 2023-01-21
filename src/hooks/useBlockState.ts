import { useState, useEffect } from "react";

import { ROW, COLUMN, BLOCK_LIST, INIT_POSITION } from "../constants";

interface BlockType {
    color: string;
    state: "blank" | "fixed" | "drop" | "duplicated";
}

export const useBlockState = (gameState: "playing" | "stop") => {
    const [renderBlock, setRenderBlock] = useState<BlockType[][]>([]);
    const [dropBlock, setDropBlock] = useState<BlockType[][]>([]);
    const [fixedBlock, setFixedBlock] = useState<BlockType[][]>([]);
    const [position, setPosition] = useState({ x: 5, y: 21 });

    useEffect(() => {
        const blockInitTalState = [...Array(COLUMN)].map((_) =>
            [...Array(ROW)].fill({
                color: "",
                state: "blank",
            })
        );

        setFixedBlock(blockInitTalState);
        changeDropBlock();
    }, []);

    useEffect(() => {
        if (gameState === "stop") return;

        const interval = setInterval(() => {
            setPosition(({ x, y }) => ({ x, y: y + 1 }));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [gameState, position.y]);

    useEffect(() => {
        if (position.y + dropBlock.length >= ROW) {
            fixToGrid(renderBlock);
            setPosition(INIT_POSITION);
            return;
        }

        const renderingView = renderToGrid();

        for (let i = 0; i < renderingView.length; i++) {
            if (renderingView[i].some((v) => v.state === "duplicated")) {
                fixToGrid(renderBlock);
                setPosition(INIT_POSITION);
                return;
            }
        }

        setRenderBlock(renderingView);
    }, [position.y, position.x, fixedBlock]);

    const changeDropBlock = () => {
        const blockColor = randomColor();
        const dropBlock = BLOCK_LIST[1].reduce<BlockType[][]>((pre, rowArr) => {
            let blankCnt = rowArr.length;
            const rows = rowArr.map<BlockType>((block) => {
                // if (block === 0) blankCnt -= 1;
                return block === 1
                    ? {
                          color: blockColor,
                          state: "drop",
                      }
                    : {
                          color: "",
                          state: "blank",
                      };
            });
            // return blankCnt > 0 ? [...pre, rows] : pre;
            return [...pre, rows];
        }, []);

        setDropBlock(dropBlock);
    };

    const randomColor = (): string => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // const rotateBlock = (arr: number[][]) => {
    //     const temp: number[][] = [];

    //     for (let row = 0; row < arr.length; row++) {
    //         temp[row] = [];
    //         for (let column = 0; column < arr[0].length; column++) {
    //             // if (position === "right")
    //             temp[row][column] = arr[arr.length - 1 - column][row];
    //             // else
    //             // temp[row][column] =
    //             //     arr[arr.length - 1 - row][arr.length - 1 - column];
    //         }
    //     }

    //     return temp;
    // };

    const renderToGrid = () => {
        const arrBlock: BlockType[][] = fixedBlock.map((row) =>
            row.map((info) => ({
                ...info,
                state: info.state === "drop" ? "blank" : info.state,
            }))
        );

        const { x, y } = position;

        dropBlock.forEach((column, columnI) => {
            column.forEach((value, rowI) => {
                const blockValue = arrBlock[columnI + x][rowI + y];

                let state = value.state;
                let color = value.color;

                if (blockValue.state === "fixed") {
                    color = blockValue.color;
                    state =
                        value.state === "blank"
                            ? blockValue.state
                            : "duplicated";
                }

                arrBlock[columnI + x][rowI + y] = { color, state };
            });
        });

        return arrBlock;
    };

    const fixToGrid = (blockArr: BlockType[][]) => {
        const fixedBlockArr = blockArr.map((column) =>
            column.map((row) => {
                return {
                    ...row,
                    state: row.state === "drop" ? "fixed" : row.state,
                };
            })
        );

        changeDropBlock();
        setFixedBlock(fixedBlockArr);
    };

    return [renderBlock, setPosition] as const;
};
