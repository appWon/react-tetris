import { useState, useEffect } from "react";

import { ROW, COLUMN, BLOCK_LIST, INIT_POSITION } from "../constants";

interface BlockType {
    color: string;
    state: "blank" | "fixed" | "drop" | "duplicated";
}

type GameState = "playing" | "stop";
type rowWidth = { x: number; y: number };

export const useBlockState = (gameState: GameState) => {
    const [renderBlock, setRenderBlock] = useState<BlockType[][]>([]);
    const [dropBlock, setDropBlock] = useState<BlockType[][]>([]);
    const [fixedBlock, setFixedBlock] = useState<BlockType[][]>([]);
    const [position, setPosition] = useState<rowWidth>(INIT_POSITION);

    useEffect(() => {
        const blockInitTalState = [...Array(COLUMN)].map<BlockType[]>((_) =>
            [...Array(ROW)].fill({
                color: "",
                state: "blank",
            })
        );

        fixToGrid(blockInitTalState);
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
        const maxSize = dropBlock.reduce(
            (m, row) => (m < row.length ? row.length : m),
            0
        );

        if (position.y + maxSize > ROW) {
            fixToGrid(renderBlock);
            return;
        }

        const renderingView = renderToGrid(position);

        for (let i = 0; i < renderingView.length; i++) {
            if (renderingView[i].some((v) => v.state === "duplicated")) {
                fixToGrid(renderBlock);
                return;
            }
        }

        setRenderBlock(renderingView);
    }, [position.y, dropBlock]);

    const setMoveWidth = (rightOrLeft: 1 | -1): void => {
        if (
            position.x + rightOrLeft + dropBlock.length >= 13 ||
            position.x + rightOrLeft < 0
        ) {
            return;
        }

        const renderingView = renderToGrid({
            ...position,
            x: position.x + rightOrLeft,
        });

        for (let i = 0; i < renderingView.length; i++) {
            if (renderingView[i].some((v) => v.state === "duplicated")) return;
        }

        setPosition({ ...position, x: position.x + rightOrLeft });
        setRenderBlock(renderingView);
    };

    const changeDropBlock = (): void => {
        const blockColor = randomColor();
        const randomBlock = Math.floor(Math.random() * 6);
        const dropBlock = BLOCK_LIST[randomBlock]
            .filter((arr) => arr.some((v) => v))
            .reduce<BlockType[][]>((pre, rowArr) => {
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
        const { x, y } = position;

        if (dropBlock.length <= 2 && x + dropBlock.length === 12) {
            if (dropBlock.length === 2) {
                setPosition({ y, x: x - 1 });
            } else {
                setPosition({ y, x: x - 3 });
            }
        }

        const roateBLock90 = dropBlock[0].map((_, index) =>
            dropBlock.map((row) => row[index]).reverse()
        );

        setDropBlock(roateBLock90);
    };

    const renderToGrid = ({ x, y }: rowWidth): BlockType[][] => {
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

    const fixToGrid = (blockArr: BlockType[][]): void => {
        const fixedBlockArr = blockArr.map((column) =>
            column.map((row) => ({
                ...row,
                state: row.state === "drop" ? "fixed" : row.state,
            }))
        );

        for (let row = 0; row < ROW; row++) {
            let lineIsFull = true;

            for (let column = 0; column < COLUMN; column++) {
                if (fixedBlockArr[column][row].state === "blank") {
                    lineIsFull = false;
                    break;
                }
            }

            if (lineIsFull) {
                for (let column = 0; column < COLUMN; column++) {
                    fixedBlockArr[column].splice(row, 1);
                    fixedBlockArr[column].unshift({
                        color: "",
                        state: "blank",
                    });
                }
            }
        }

        changeDropBlock();
        setPosition(INIT_POSITION);
        setFixedBlock(fixedBlockArr);
    };

    const setDropToEnd = (): void => {
        const { x } = position;
        const sliceBlock = renderBlock.slice(x, x + dropBlock.length);
        const findDropBlockArr: number[] = dropBlock.map((row) => {
            return (
                row.length -
                [...row].reverse().findIndex((obj) => obj.state === "drop")
            );
        });

        for (let i = 0; i < 24 - Math.max(...findDropBlockArr); i++) {
            if (
                findDropBlockArr
                    .map(
                        (arrIdx, sliceIdx) =>
                            sliceBlock[sliceIdx][arrIdx + i].state === "fixed"
                    )
                    .some((v) => v)
            ) {
                fixToGrid(renderToGrid({ x, y: i }));
                return;
            }
        }

        const renderArr = renderToGrid({
            x,
            y: 24 - Math.max(...findDropBlockArr),
        });

        fixToGrid(renderArr);
    };

    const setDropOneBlock = (): void => {
        setPosition(({ x, y }) => ({ x, y: y + 1 }));
    };

    return [
        renderBlock,
        setMoveWidth,
        setDropToEnd,
        setDropOneBlock,
        setRotateDropBlock,
    ] as const;
};
