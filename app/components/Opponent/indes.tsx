import { Board } from "../Board";
import { Button } from "../Button";
import { GameResult } from "../GameResult";

import { PlayerTypes } from "../../hooks/usePlayer";

export type MultiPlayType = {
  players: PlayerTypes[];
};

export const Oppernent = ({ players }: MultiPlayType) => {
  return (
    <div
      className={`${
        players ? "flex" : "flex-none"
      } flex-col gap-[20px] flex-wrap-reverse`}
    >
      {players.map((player, i) => (
        <div className="flex">
          <div
            className="flex relative justify-center p-[10px] rounded-[10px] bg-[black]"
            key={i}
          >
            <div className="flex flex-col border-[1px] border-m-gray">
              <Board render={player.render} cellSize={30} grid />
              <Button size="45px">
                {player.isReady && player.isPlaying !== "playing" && "준비완료"}
              </Button>
              {player.isPlaying !== "playing" && (
                <GameResult gameResult={player.gameResult} size="5rem" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
