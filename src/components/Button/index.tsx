import React, { useEffect, useState } from "react";

// styled-component
import * as S from "./style";

// types
import { GameState } from "../../types";

interface ButtonProps {
    gameState: GameState;
    onClick: () => void;
}

export const Button = (props: ButtonProps) => {
    const [text, setText] = useState<string | number>("Start");

    useEffect(() => {
        const countDown = setTimeout(() => {
            if (text === "Go") props.onClick();

            if (typeof text === "number") {
                if (text === 1) {
                    setText("Go");
                    return;
                } else {
                    setText(text - 1);
                }
            }
        }, 1000);

        return () => {
            clearTimeout(countDown);
        };
    }, [text]);

    const handleClick = () => {
        setText(3);
    };

    return <S.Button onClick={handleClick}>{text}</S.Button>;
};
