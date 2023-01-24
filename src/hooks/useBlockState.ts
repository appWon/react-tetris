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
    const [position, setPosition] = useState(INIT_POSITION);

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
        if (position.y + dropBlock.length > ROW) {
            fixToGrid(renderBlock);
            setPosition(INIT_POSITION);
            return;
        }

        const renderingView = renderToGrid(position);

        for (let i = 0; i < renderingView.length; i++) {
            if (renderingView[i].some((v) => v.state === "duplicated")) {
                fixToGrid(renderBlock);
                setPosition(INIT_POSITION);
                return;
            }
        }

        setRenderBlock(renderingView);
    }, [position.y, position.x, dropBlock]);

    const changeDropBlock = () => {
        const blockColor = randomColor();
        const dropBlock = BLOCK_LIST[1].reduce<BlockType[][]>((pre, rowArr) => {
            const rows = rowArr.map<BlockType>((block) => {
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

    const setRotateDropBlock = (): void => {
        const roateBLock90 = dropBlock[0].map((_, index) =>
            dropBlock.map((row) => row[index]).reverse()
        );

        setDropBlock(roateBLock90);
    };

    const renderToGrid = ({ x, y }: { x: number; y: number }) => {
        const arrBlock: BlockType[][] = fixedBlock.map((row) =>
            row.map((info) => ({
                ...info,
                state: info.state === "drop" ? "blank" : info.state,
            }))
        );

        dropBlock
            .filter((arr) => arr.some((v) => v.state === "drop"))
            .forEach((column, columnI) => {
                column.forEach((value, rowI) => {
                    const blockValue = arrBlock[columnI + x][rowI + y];
                    let state = value.state;
                    let color = value.color;

                    if (blockValue?.state === "fixed") {
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

    const setDropToEnd = () => {
        const filterBlankArr = dropBlock.filter((arr) =>
            arr.some((v) => v.state === "drop")
        );

        const sliceBlock = renderBlock.slice(
            position.x,
            position.x + filterBlankArr.length
        );

        const find: number[] = filterBlankArr.map((row) => {
            return (
                row.length -
                row.reverse().findIndex((obj) => obj.state === "drop")
            );
        });

        for (let i = 0; i < 24 - dropBlock.length; i++) {
            if (
                find
                    .map((arrIdx, ii) => {
                        return sliceBlock[ii][arrIdx + i].state === "fixed";
                    })
                    .some((v) => v)
            ) {
                fixToGrid(renderToGrid({ ...position, y: i }));
                setPosition(INIT_POSITION);
                return;
            }
        }

        const renderArr = renderToGrid({
            ...position,
            y: 24 - dropBlock.length,
        });

        fixToGrid(renderArr);
        setPosition(INIT_POSITION);
    };

    const setDropOneBlock = (): void => {
        setPosition(({ x, y }) => ({ x, y: y + 1 }));
    };

    return [
        renderBlock,
        setPosition,
        setRotateDropBlock,
        setDropToEnd,
        setDropOneBlock,
    ] as const;
};
