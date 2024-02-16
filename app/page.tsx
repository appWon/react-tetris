"use client";
import { Tetris } from "./components/templates/Game";
import { NickName } from "./components/molecules/NickName";

// redux
import { Provider } from "react-redux";
import { store } from "./store";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Provider store={store}>
        <div className="flex justify-center items-center w-screen min-h-screen gap-[20px] bg-[gray]">
          <NickName />
          <Tetris />
        </div>
      </Provider>
    </main>
  );
}
