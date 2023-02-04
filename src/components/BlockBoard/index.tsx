import { useState, KeyboardEvent, useEffect } from "react";
import { LEFT_OR_RIGHT } from "../../constants";

// hooks
import { useBlockState } from "../../hooks/useBlockState";

// component
import { Cell } from "../Cell";
import { Button } from "../Button";

// styled-component
import * as S from "./blockBoard";

//types
import { GameState } from "../../types";

export const BlockBoard = () => {
    const [gameState, setGameState] = useState<GameState>("stop");
    const { renderBlock, blockControl } = useBlockState(
        gameState,
        setGameState
    );

    const handleClickGameStart = () => {
        setGameState("playing");
    };

    return (
        <S.BlockBoardContainer tabIndex={0} onKeyUp={blockControl}>
            <div>
                {renderBlock.map((v, columnCnt) => (
                    <S.RowCoinatiner key={`column_${columnCnt}`}>
                        {v.map((v, rowCnt) => (
                            <Cell key={`row_${rowCnt}`} {...v}></Cell>
                        ))}
                    </S.RowCoinatiner>
                ))}
            </div>
            {gameState !== "playing" && (
                <Button onClick={handleClickGameStart} gameState={gameState} />
            )}
        </S.BlockBoardContainer>
    );
};
