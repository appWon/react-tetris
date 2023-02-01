import { useState, KeyboardEvent } from "react";
import { LEFT_OR_RIGHT } from "../../constants";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Cell } from "../Cell";
import { Button } from "../Button";

// styled-component
import * as S from "./blockBoard";
import { GameState } from "../../types";

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
            {gameState !== "playing" && (
                <Button onClick={handleClickGameStart} gameState={gameState} />
            )}
        </S.BlockBoardContainer>
    );
};
