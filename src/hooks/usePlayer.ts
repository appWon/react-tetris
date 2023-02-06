import React, { useEffect, useRef, useState } from "react";

//constance
import { INIT_RENDER_ARR } from "../constants";

//type
import { BlockType, Players } from "../types";

type PropsType = BlockType[][];

export const usePlayer = (render: PropsType) => {
    const ws = useRef<WebSocket>();
    const [players, setPlayers] = useState<Players>({});

    useEffect(() => {
        ws.current = new WebSocket("ws://127.0.0.1:9000");

        ws.current.onopen = () => {
            if (ws?.current?.readyState !== WebSocket.OPEN) return;

            const session = window.location.hash.split("#")[1];
            const reqData = {} as {
                type: string;
                session?: string;
                render: BlockType[][];
            };

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
            const { type, session, data, userId } = JSON.parse(e.data);

            if (type === "create-session") {
                window.location.hash = session;
            }

            switch (type) {
                case "create-session": {
                    break;
                }

                case "join-session": {
                    const setData = data.reduce(
                        (acc: any, user: any) => ({
                            ...acc,
                            [user]: INIT_RENDER_ARR,
                        }),
                        {}
                    );

                    setPlayers({ ...players, ...setData });
                    break;
                }

                case "out-session": {
                    const leaveUser = Object.keys(players)
                        .filter((user) => user !== userId)
                        .reduce(
                            (acc, user) => ({ ...acc, [user]: players[user] }),
                            {} as Players
                        );

                    setPlayers(leaveUser);
                    break;
                }

                case "update-session": {
                    for (let i in data) {
                        setPlayers({ ...players, [i]: data[i] });
                    }
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
            })
        );
    }, [render]);

    const useSocketClose = () => {};

    return { players, useSocketClose };
};
