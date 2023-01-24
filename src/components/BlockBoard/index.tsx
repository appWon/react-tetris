import { useState, KeyboardEvent } from "react";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Cell } from "../Cell";

// styled-component
import * as S from "./blockBoard";

type GameState = "playing" | "stop";

export const BlockBoard = () => {
    const [gameState, setGameState] = useState<GameState>("stop");
    const [
        renderBlock,
        setMoveWidth,
        setDropToEnd,
        setDropOneBlock,
        setRotateDropBlock,
    ] = useBlockState(gameState);

    const handleKeyUp = ({ code }: KeyboardEvent<HTMLDivElement>) => {
        if (code === "ArrowLeft") {
            setMoveWidth(-1);
        } else if (code === "ArrowRight") {
            setMoveWidth(1);
        } else if (code === "ArrowUp") {
            setRotateDropBlock();
        } else if (code === "ArrowDown") {
            setDropOneBlock();
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
