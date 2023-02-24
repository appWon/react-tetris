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
            <h3>LEVEL</h3>
            <h4>{timeFrame}</h4>
            <p>20초마다 레벨 상승</p>
        </S.LevelContainer>
    );
};
