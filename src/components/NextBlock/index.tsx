import React from "react";
import { useSelector } from "react-redux";

// styled-component
import * as S from "./style";

// store
import { tetrominoState } from "../../store/reducer/nextBlock";
import { gameState } from "../../store/reducer/gameState";

// component
import { Board } from "../Board";

export const NextBlock = () => {
    const { tetromino } = useSelector(tetrominoState);
    const { isPlaying } = useSelector(gameState);

    return (
        <S.NextBlocksContainer>
            <h3>Next</h3>
            <S.NextBlockList>
                {isPlaying !== "stop" &&
                    tetromino.slice(1).map((block, columnCnt) => {
                        return (
                            <S.NextBlock key={`next_block_${columnCnt}`}>
                                <Board render={block} cellSize={25} />
                            </S.NextBlock>
                        );
                    })}
            </S.NextBlockList>
        </S.NextBlocksContainer>
    );
};
