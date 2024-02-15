"use client"
import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";

// 상수
import {
    ROW,
    INIT_POSITION,
    LEFT_OR_RIGHT,
    INIT_RENDER,
    NEXT_BLOCK_LENGTH,
    INIT_TIME_FRAME,
} from "../constants";

// helper 함수
import {
    checkDuplicated,
    clearLineLength,
    drawRender,
    fillCell,
    getTetromino,
} from "../helper";

//store
import { tetrominoState, setTetromino } from "../store/reducer/nextBlock";
import {
    gameState,
    setPosition,
    setIsPlaying,
    setResetPostion,
    setTimeFrame,
    setScore,
    setReady,
} from "../store/reducer/gameState";

// type
import { Cell } from "../types";

// hooks
import { useKeyUp } from "./useKeyUp";
import { useInterval } from "./useInterval";

export const useTetris = () => {
    // const dispatch = useDispatch();

    // const { tetromino } = useSelector(tetrominoState);
    // const { isPlaying, position, timeFrame } = useSelector(gameState);
    const [fixedRender, setFixedRender] = useState<Cell[][]>(INIT_RENDER);
    const [render, setRender] = useState<Cell[][]>(INIT_RENDER);

    // useEffect(() => {
    //     // if (isPlaying === "end") return;

    //     const INIT_DROP_BLOCK = [...Array(NEXT_BLOCK_LENGTH)].map((_) =>
    //         getTetromino()
    //     );

    //     setFixedRender(INIT_RENDER);
    //     dispatch(setTetromino(INIT_DROP_BLOCK));
    //     dispatch(setTimeFrame(INIT_TIME_FRAME));
    //     dispatch(setResetPostion(INIT_POSITION));
    // }, [isPlaying]);

    useEffect(() => {
        setRender((preValue) => {
            switch (isPlaying) {
                case "stop":
                    return fixedRender;
                case "end":
                    return preValue.map((row) =>
                        row.map((cell) => cell && "gray")
                    );
                default:
                    return drawRender(
                        position,
                        tetromino[0],
                        _.cloneDeep(fixedRender)
                    );
            }
        });
    }, [isPlaying, position, tetromino, fixedRender]);

    useEffect(() => {
        if (isPlaying !== "playing") return;

        if (checkDuplicated(position, tetromino[0], fixedRender)) {
            dispatch(setReady(false));
            dispatch(setIsPlaying("end"));
        }
    }, [fixedRender]);

    const moveX = (x: number): void => {
        if (checkDuplicated({ ...position, x }, tetromino[0], fixedRender)) {
            return;
        }

        dispatch(setPosition({ x: x - position.x, y: 0 }));
    };

    const moveY = (): void => {
        if (!checkMoveY(1)) return;

        // dispatch(setPosition({ x: 0, y: 1 }));
    };

    const hardDrop = (): void => {
        for (let h = 0; h <= ROW; h++) {
            if (!checkMoveY(h)) break;
        }
    };

    const checkMoveY = (nextLine: number = 1): boolean => {
        // if (
        //     checkDuplicated(
        //         { ...position, y: position.y + nextLine },
        //         tetromino[0],
        //         fixedRender
        //     )
        // ) {
        //     let copyRender = drawRender(
        //         { ...position, y: position.y + nextLine - 1 },
        //         tetromino[0],
        //         _.cloneDeep(fixedRender)
        //     );
        //     const clearLine = clearLineLength(copyRender);

        //     if (clearLine) {
        //         copyRender = [
        //             ...[...Array(clearLine)].map(fillCell),
        //             ...copyRender.filter((row) => !row.every((v) => v)),
        //         ];

        //         setTetrisScore(clearLine);
        //     }

        //     setFixedRender(copyRender);
        //     dispatch(setResetPostion(INIT_POSITION));
        //     dispatch(setTetromino([...tetromino.slice(1), getTetromino()]));
        //     return false;
        // }

        return true;
    };

    const setTetrisScore = (lineLength: number) => {
        // switch (lineLength) {
        //     case 1:
        //         dispatch(setScore(40 * timeFrame));
        //         break;
        //     case 2:
        //         dispatch(setScore(100 * timeFrame));
        //         break;
        //     case 3:
        //         dispatch(setScore(300 * timeFrame));
        //         break;
        //     case 4:
        //         dispatch(setScore(1200 * timeFrame));
        //         break;
        // }
    };

    const rotateTetromino = (): void => {
        // const roateTetromino = tetromino[0][0].map((_, index) =>
        //     tetromino[0].map((row) => row[index]).reverse()
        // );

        // if (checkDuplicated(position, roateTetromino, fixedRender)) {
        //     return;
        // }

        // dispatch(setTetromino([roateTetromino, ...tetromino.slice(1)]));
    };

    useInterval(moveY, [isPlaying, position, fixedRender]);

    useKeyUp(
        ({ code }: KeyboardEvent) => {
            switch (code) {
                case "ArrowLeft":
                    moveX(position.x + LEFT_OR_RIGHT.LEFT);
                    break;

                case "ArrowRight":
                    moveX(position.x + LEFT_OR_RIGHT.RIGHT);
                    break;

                case "ArrowUp":
                    rotateTetromino();
                    break;

                case "ArrowDown":
                    moveY();
                    break;

                case "Space":
                    hardDrop();
                    break;

                default:
                    return;
            }
        },
        [isPlaying, render]
    );

    return {
        render,
    };
};
