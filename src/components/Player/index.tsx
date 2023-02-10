import React, { KeyboardEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-component
import * as S from "./style";

//store
import {
    gameState,
    setIsPlaying,
    setReady,
    setGameResult,
} from "../../store/reducer/gameState";

//component
import { NextBlock } from "../NextBlock";
import { Button } from "../Button";
import { Border } from "../Border";
import { Timer } from "../Timer";
import { GameResult } from "../GameResult";

//type
import { BlockType, GameState } from "../../types";
import { PlayerTypes } from "../../hooks/usePlayer";

type PlayerType = {
    players: PlayerTypes[];
    render: BlockType[][];
    controller: (e: KeyboardEvent<HTMLDivElement>) => void;
};

export const Player = (props: PlayerType) => {
    const dispatch = useDispatch();

    const { isReady, isPlaying, gameResult } = useSelector(gameState);
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (isPlaying === "playing") return;

        const allPlayerIsReady = props.players.every(
            (player) => player.isReady
        );

        if (allPlayerIsReady && isReady) {
            setTrigger(true);
        }
    }, [isReady, props.players]);

    useEffect(() => {
        if (isPlaying !== "playing") return;

        if (IsPlayersPlayingGame("end")) {
            dispatch(setGameResult("WINNER"));
            dispatch(setIsPlaying("end"));
        }
    }, [props.players]);

    const executeFn = () => {
        dispatch(setReady(false));
        dispatch(setIsPlaying("playing"));
    };

    const handleClickButton = () => {
        dispatch(setReady(!isReady));
    };

    const IsPlayersPlayingGame = (state: GameState) => {
        if (!props.players.length) return false;
        return props.players.every((player) => player.isPlaying === state);
    };

    return (
        <S.PlayerContainer>
            <div tabIndex={0} onKeyUp={props.controller}>
                <S.BorderContainer>
                    <Border render={props.render} />
                </S.BorderContainer>
                {isPlaying !== "playing" &&
                    !IsPlayersPlayingGame("playing") && (
                        <Button onClick={handleClickButton}>
                            <Timer
                                trigger={trigger}
                                onSetTrigger={setTrigger}
                                executeFn={executeFn}
                            >
                                {props.players.length === 0
                                    ? "혼자하기"
                                    : isReady
                                    ? "준비해제"
                                    : "준비하기"}
                            </Timer>
                        </Button>
                    )}
                {isPlaying !== "playing" && (
                    <GameResult gameResult={gameResult} />
                )}
            </div>
            <NextBlock />
        </S.PlayerContainer>
    );
};
