import { useState, KeyboardEvent } from "react";
import { LEFT_OR_RIGHT } from "../../constants";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Cell } from "../Cell";

// styled-component
import * as S from "./blockBoard";

export type GameState = "playing" | "stop" | "end";

export const BlockBoard = () => {
    const [gameState, setGameState] = useState<GameState>("stop");
    const [
        renderBlock,
        setMoveWidth,
        setDropToEnd,
        setDropOneBlock,
        setRotateDropBlock,
    ] = useBlockState(gameState, setGameState);

    const handleKeyUp = ({ code }: KeyboardEvent<HTMLDivElement>) => {
        if (gameState !== "playing") return;

        if (code === "ArrowLeft") {
            setMoveWidth(LEFT_OR_RIGHT.left);
        } else if (code === "ArrowRight") {
            setMoveWidth(LEFT_OR_RIGHT.right);
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
