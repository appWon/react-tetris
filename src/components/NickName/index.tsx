import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// styled-component
import * as S from "./style";

// store
import { gameState, setNickName } from "../../store/reducer/gameState";

export const NickName = () => {
    const dispatch = useDispatch();

    const { nickName } = useSelector(gameState);
    const [text, setText] = useState("");

    useEffect(() => {
        const getNickName = localStorage.getItem("nickName");

        console.log(getNickName);

        if (getNickName) dispatch(setNickName(getNickName));
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.trim()) return;

        localStorage.setItem("nickName", text);
        dispatch(setNickName(text));
    };

    return (
        <>
            {!nickName && (
                <S.NickNameContainer>
                    <S.SettingNickNameContainer>
                        <form onSubmit={handleSubmit}>
                            <h4>닉네임</h4>
                            <div>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={({ target }) =>
                                        setText(target.value)
                                    }
                                />
                            </div>
                            <button>Click</button>
                        </form>
                    </S.SettingNickNameContainer>
                </S.NickNameContainer>
            )}
        </>
    );
};
