import React from "react";
import { useSelector } from "react-redux";

// styled-component
import * as S from "./style";

// store
import { gameState } from "../../store/reducer/gameState";

export const Score = () => {
    const { score } = useSelector(gameState);

    return (
        <S.ScoreContainer>
            <h1>SCORE</h1>
            <p>{score}</p>
        </S.ScoreContainer>
    );
};
