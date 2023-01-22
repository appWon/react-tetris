import { useState, KeyboardEvent } from "react";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Cell } from "../Cell";

// styled-component
import * as S from "./blockBoard";

export const BlockBoard = () => {
    const [gameState, setGameState] = useState<"playing" | "stop">("stop");
    const [renderBlock, setPosition, setRotateDropBlock, setDropToEnd] =
        useBlockState(gameState);

    const handleKeyUp = ({ code }: KeyboardEvent<HTMLDivElement>) => {
        if (code === "ArrowLeft") {
            setPosition(({ x, y }) => ({ x: x - 1, y }));
        } else if (code === "ArrowRight") {
            setPosition(({ x, y }) => ({ x: x + 1, y }));
        } else if (code === "ArrowUp") {
            setRotateDropBlock();
        } else if (code === "Space") {
            setDropToEnd();
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
            {renderBlock.map((v, columnCnt) => (
                <S.RowCoinatiner key={`column_${columnCnt}`}>
                    {v.map((v, rowCnt) => (
                        <Cell key={`row_${rowCnt}`} {...v}></Cell>
                    ))}
                </S.RowCoinatiner>
            ))}
            <button
                onClick={handleClickGameStart}
                style={{ width: 100, height: 100 }}
            >
                버튼
            </button>
        </S.BlockBoardContainer>
    );
};
