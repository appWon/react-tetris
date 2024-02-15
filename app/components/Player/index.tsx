import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    gameState,
    setIsPlaying,
    setReady,
    setGameResult,
} from "../../store/reducer/gameState";

import { NextBlock } from "../NextBlock";
import { Button } from "../atoms/Button";
import { Board } from "../Board";
import { Timer } from "../Timer";
import { GameResult } from "../GameResult";
import { Level } from "../Level";
import { Score } from "../Score";

import { PlayerTypes } from "../../hooks/usePlayer";

type PlayerType = {
    players: PlayerTypes[];
    render: string[][];
    randomSession: () => void;
    newSession: () => void;
};

export const Player = (props: PlayerType) => {
    const dispatch = useDispatch();

    const { isReady, isPlaying, gameResult } = useSelector(gameState);

    useEffect(() => {
        if (isPlaying !== "playing") return;

        if (!IsPlayersState("isPlaying", "playing")) {
            dispatch(setGameResult("WINNER"));
            dispatch(setIsPlaying("end"));
            dispatch(setReady(false));
        }
    }, [props.players]);

    const executeFn = () => {
        dispatch(setIsPlaying("playing"));
    };

    const handleClickButton = () => {
        dispatch(setReady(!isReady));
    };

    const IsPlayersState = useCallback(
        (key: string, value: any) => {
            return props.players.every((player: any) => player[key] === value);
        },
        [props.players]
    );

    return (
        <div className="flex gap-large">
            <div className="flex flex-col relative p-[10px] rounded-[10px] bg-[black]">
                <section className="flex flex-col relative justify-center border-[1px] border-m-gray">
                    <Board render={props.render} cellSize={30} grid />
                </section>

                {isPlaying !== "playing" && (
                    <Button onClick={handleClickButton}>
                        {!props.players.length ? (
                            !isReady ? (
                                "Start"
                            ) : (
                                <Timer executeFn={executeFn} />
                            )
                        ) : !isReady ? (
                            "Ready"
                        ) : IsPlayersState("isReady", true) ? (
                            <Timer executeFn={executeFn} />
                        ) : (
                            "Cancel"
                        )}
                    </Button>
                )}

                {isPlaying !== "playing" && (
                    <GameResult gameResult={gameResult} />
                )}
            </div>
            <section className="flex flex-col gap-large">
                <Level />
                <Score />
                <NextBlock />
                <button onClick={props.randomSession}>Radom Match</button>
                <button onClick={props.newSession}>New Game</button>
            </section>
        </div>
    );
};
