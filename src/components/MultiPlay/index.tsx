import React from "react";

// styled-component
import * as S from "./style";

//component
import { Border } from "../Border";
import { Button } from "../Button";
import { GameResult } from "../GameResult";

// type
import { PlayerTypes } from "../../hooks/usePlayer";

type MultiPlayType = {
    players: PlayerTypes[];
};

export const MultiPlay = ({ players }: MultiPlayType) => {
    return (
        <S.MultiPlayContainer>
            {players.map((player, i) => (
                <S.BlockBoardContainer key={i}>
                    <div>
                        <Border render={player.render} size={1} />
                        <Button size="1rem">
                            {player.isReady && "준비완료"}
                        </Button>
                        {player.isPlaying !== "playing" && (
                            <GameResult
                                gameResult={player.gameResult}
                                size="2rem"
                            />
                        )}
                    </div>
                </S.BlockBoardContainer>
            ))}
        </S.MultiPlayContainer>
    );
};
