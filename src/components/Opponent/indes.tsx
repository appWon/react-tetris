import React from "react";

// styled-components
import * as S from "./style";

//component
import { Board } from "../Board";
import { Button } from "../Button";
import { GameResult } from "../GameResult";

// hooks
import { PlayerTypes } from "../../hooks/usePlayer";

export type MultiPlayType = {
    players: PlayerTypes[];
};

export const Oppernent = ({ players }: MultiPlayType) => {
    return (
        <S.OppernentContainer player={players}>
            {players.map((player, i) => (
                <div>
                    <S.BlockBoardContainer key={i}>
                        <div>
                            <Board render={player.render} cellSize={30} grid />
                            <Button size="45px">
                                {player.isReady &&
                                    player.isPlaying !== "playing" &&
                                    "준비완료"}
                            </Button>
                            {player.isPlaying !== "playing" && (
                                <GameResult
                                    gameResult={player.gameResult}
                                    size="5rem"
                                />
                            )}
                        </div>
                    </S.BlockBoardContainer>
                </div>
            ))}
        </S.OppernentContainer>
    );
};
