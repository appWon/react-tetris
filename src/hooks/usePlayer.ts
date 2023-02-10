import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

//constance
import { INIT_RENDER_ARR } from "../constants";

//type
import { BlockType } from "../types";
import { GameStateType } from "../store/reducer/gameState";

//store
import { gameState } from "../store/reducer/gameState";

export type Type =
    | "create-session"
    | "join-session"
    | "out-session"
    | "update-session";

export interface OpenSessionType extends GameStateType {
    type: string;
    session: string;
    render: BlockType[][];
}

export interface ResSockerData {
    type: Type;
    userId: string;
    session: string;
    data: PlayerTypes[];
}

export interface PlayerTypes extends GameStateType {
    id: string;
    render: BlockType[][];
}

export const usePlayer = (render: BlockType[][]) => {
    const ws = useRef<WebSocket>();
    const gameStates: GameStateType = useSelector(gameState);

    const [players, setPlayers] = useState<PlayerTypes[]>([]);

    useEffect(() => {
        ws.current = new WebSocket("ws://127.0.0.1:9000");

        ws.current.onopen = () => {
            if (ws?.current?.readyState !== WebSocket.OPEN) return;

            const session = window.location.hash.split("#")[1];
            const reqData = <OpenSessionType>{ ...gameStates };

            if (session) {
                reqData["type"] = "join-session";
                reqData["session"] = session;
            } else {
                reqData["type"] = "create-session";
            }

            reqData["render"] = INIT_RENDER_ARR;
            ws.current.send(JSON.stringify(reqData));
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (e) => {
            const { type, session, data, userId }: ResSockerData = JSON.parse(
                e.data
            );

            switch (type) {
                case "create-session": {
                    window.location.hash = session;
                    break;
                }

                case "join-session": {
                    console.log(data);
                    const setData = data.map((user) => {
                        return { ...user, render: INIT_RENDER_ARR };
                    });

                    setPlayers([...players, ...setData]);
                    break;
                }

                case "out-session": {
                    const leaveUser = players.filter(
                        (user) => user.id !== userId
                    );
                    setPlayers(leaveUser);
                    break;
                }

                case "update-session": {
                    const parseData = data.reduce(
                        (acc, user) => ({ ...acc, [user.id]: user }),
                        {} as { [id: string]: PlayerTypes }
                    );

                    const setData = players.map((user) => {
                        return { ...user, ...parseData[user.id] };
                    });

                    setPlayers(setData);
                    break;
                }
            }
        };
    });

    useEffect(() => {
        if (ws?.current?.readyState !== WebSocket.OPEN) return;

        const session = window.location.hash.split("#")[1];

        ws.current.send(
            JSON.stringify({
                type: "update-session",
                session,
                render,
                isReady: gameStates.isReady,
                isPlaying: gameStates.isPlaying,
                gameResult: gameStates.gameResult,
            })
        );
    }, [
        render,
        gameStates.isReady,
        gameStates.gameResult,
        gameStates.isPlaying,
    ]);

    return { players };
};
