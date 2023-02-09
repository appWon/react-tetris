import React from "react";
import { useSelector } from "react-redux";

// styled-component
import * as S from "./style";

// store
import { nextBlock } from "../../store/reducer/nextBlock";
import { gameState } from "../../store/reducer/gameState";

// component
import { Border } from "../Border";

export const NextBlock = () => {
    const { nextBlocks } = useSelector(nextBlock);
    const { isPlaying } = useSelector(gameState);

    return (
        <S.NextBlocksContainer>
            <p>Next</p>
            {isPlaying !== "stop" &&
                nextBlocks.slice(1).map((block, columnCnt) => {
                    return (
                        <S.NextBlock key={`next_block_${columnCnt}`}>
                            <Border render={block} />
                        </S.NextBlock>
                    );
                })}
        </S.NextBlocksContainer>
    );
};
