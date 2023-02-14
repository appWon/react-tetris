import React from "react";
import { useSelector } from "react-redux";

// styled-component
import * as S from "./style";

//constance

// store
import { gameState } from "../../store/reducer/gameState";

export const Level = () => {
    const { timeFrame } = useSelector(gameState);

    return (
        <S.LevelContainer>
            <h1>LEVEL</h1>
            <h1>{timeFrame}</h1>
            <p>10초마다 레벨 상승</p>
        </S.LevelContainer>
    );
};
