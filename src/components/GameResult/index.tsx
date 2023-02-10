import React from "react";

//styled-components
import * as S from "./style";

// types

type GameResultTypes = {
    gameResult: "WINNER" | "LOSER" | null;
    size?: string;
};

export const GameResult = (props: GameResultTypes) => {
    return (
        <S.GameResultContainer size={props.size}>
            {props.gameResult}
        </S.GameResultContainer>
    );
};
