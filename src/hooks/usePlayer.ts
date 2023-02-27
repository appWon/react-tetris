import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//constance
import { INIT_RENDER } from "../constants";

//type
import { Board } from "../types";
import { GameStateType } from "../store/reducer/gameState";

//store
import { gameState, setId } from "../store/reducer/gameState";

export type Type =
    | "create-session"
    | "join-session"
    | "out-session"
    | "update-session"
    | "random-session";

export interface OpenSessionType extends GameStateType {
    type: string;
    session: string;
    render: Board;
}

export interface ResSockerData {
    type: Type;
    id: string;
    session: string;
    data: PlayerTypes[];
}

export interface PlayerTypes extends GameStateType {
    id: string;
    render: Board;
}

export const usePlayer = (render: Board) => {
    const ws = useRef<WebSocket>();
    const dispatch = useDispatch();
    const gameStates: GameStateType = useSelector(gameState);

    const [players, setPlayers] = useState<PlayerTypes[]>([]);

    useEffect(() => {
        ws.current = new WebSocket(
            "ws://port-0-tetris-server-2-4uvg2mlem225sh.sel3.cloudtype.app/"
        );

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

            reqData["render"] = INIT_RENDER;
            ws.current.send(JSON.stringify(reqData));
        };
    }, []);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (e) => {
            const { type, session, data, id }: ResSockerData = JSON.parse(
                e.data
            );

            switch (type) {
                case "create-session": {
                    window.location.hash = session;
                    dispatch(setId(id));
                    break;
                }

                case "join-session": {
                    const setData = data.map((user) => {
                        return { ...user, render: INIT_RENDER };
                    });

                    setPlayers([...players, ...setData]);
                    dispatch(setId(id));
                    break;
                }

                case "out-session": {
                    const leaveUser = players.filter((user) => user.id !== id);
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

                case "random-session": {
                    window.location.hash = session;

                    const setData = data.map((user) => {
                        return { ...user, render: INIT_RENDER };
                    });

                    setPlayers([...players, ...setData]);
                    dispatch(setId(id));
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

    const randomSession = () => {
        if (!ws.current) return;
        setPlayers([]);

        ws.current.send(
            JSON.stringify({
                type: "random-session",
                render: INIT_RENDER,
            })
        );
    };

    const newSession = () => {
        if (!ws.current) return;
        setPlayers([]);

        ws.current.send(
            JSON.stringify({
                type: "create-session",
                render: INIT_RENDER,
            })
        );
    };

    return { players, randomSession, newSession };
};
