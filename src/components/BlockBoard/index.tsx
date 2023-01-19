import { useState, useEffect, KeyboardEvent } from "react";

import { INIT_BLOCK_CENTER } from "../../constants";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Cell } from "../Cell";

// styled-component
import * as S from "./blockBoard";

export const BlockBoard = () => {
    const [gameState, setGameState] = useState<"playing" | "stop">("stop");
    const [position, setPosition] = useState({ x: INIT_BLOCK_CENTER, y: 18 });
    const [renderBlock, currentBLock, floorBlock, setBlock] =
        useBlockState(position);

    useEffect(() => {
        if (gameState === "stop") return;

        const interval = setInterval(() => {
            setPosition((positionValue) => {
                return { ...positionValue, y: positionValue.y + 1 };
            });
        }, 1000);

        return () => {
            console.log(1);
            clearInterval(interval);
        };
    }, [floorBlock, gameState]);

    useEffect(() => {
        if (currentBLock.length + position.y >= 24) {
            setBlock();
            setPosition({ x: 5, y: 0 });
            return;
        }

        if (currentBLock.length > 0)
            for (let row = currentBLock.length - 1; row >= 0; row--) {
                for (
                    let column = 0;
                    column < currentBLock[row].length;
                    column++
                ) {
                    const sumRow = row + position.x;
                    const sumColumn = column + position.y;
                    if (
                        currentBLock[row][column].type === "dropBlock" &&
                        renderBlock()[sumRow + 1][sumColumn + 1].type ===
                            "blank"
                    ) {
                        setBlock();
                        setPosition({ x: 5, y: 0 });
                    }
                }
            }
    }, [floorBlock, position]);

    const handleKeyUp = ({ key }: KeyboardEvent<HTMLDivElement>) => {
        if (key === "ArrowLeft") {
            setPosition({ ...position, x: position.x - 1 });
        } else if (key === "ArrowRight") {
            setPosition({ ...position, x: position.x + 1 });
        }
    };

    const handleClickGameStart = () => {
        setGameState("playing");
    };

    return (
        <S.BlockBoardContainer
            tabIndex={0}
            onKeyUp={(v) => v && handleKeyUp(v)}
        >
            {renderBlock().map((v, columnCnt) => (
                <S.RowCoinatiner key={`column_${columnCnt}`}>
                    {v.map((v, rowCnt) => (
                        <Cell key={`row_${rowCnt}`}>{v.type}</Cell>
                    ))}
                </S.RowCoinatiner>
            ))}
            <button onClick={handleClickGameStart}>버튼</button>
        </S.BlockBoardContainer>
    );
};
