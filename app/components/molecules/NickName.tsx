"use client"

import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { gameState, setNickName } from "../../store/reducer/gameState";

export const NickName = () => {
  const dispatch = useDispatch();

  const { nickName } = useSelector(gameState);
  const [text, setText] = useState("");

  useEffect(() => {
    const getNickName = localStorage.getItem("nickName");

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
        <div className="flex absolute items-center justify-center w-screen h-screen bg-[#00000080] z-[10]">
          <section className="flex justify-center items-center p-[20px] gap-[10px] rounded-[10px] bg-[#000000] clor-[white]">
            <form
              className="flex items-center gap-[10px]"
              onSubmit={handleSubmit}
            >
              <h4 className="text-white">닉네임</h4>
              <div className="flex items-center">
                <input
                  className="w-full p-[5px] border-none text-right"
                  type="text"
                  value={text}
                  onChange={({ target }) => setText(target.value)}
                />
              </div>
              <button className="text-xl border-none p-[2px] bg-none cursor-pointer text-white">
                Click
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
};
