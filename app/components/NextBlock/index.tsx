import { useSelector } from "react-redux";

import { tetrominoState } from "../../store/reducer/nextBlock";
import { gameState } from "../../store/reducer/gameState";

import { Board } from "../Board";

export const NextBlock = () => {
  const { tetromino } = useSelector(tetrominoState);
  const { isPlaying } = useSelector(gameState);

  return (
    <div className="flex flex-auto flex-col justify-between items-center p-[10px] rounded-[10px] bg-m-black">
      <h3 className="text-[green] text-[2rem] font-main select-none">Next</h3>
      <div className="flex flex-auto flex-col justify-around items-center">
        {isPlaying !== "stop" &&
          tetromino.slice(1).map((block, columnCnt) => {
            return (
              <div
                className="flex flex-col justify-center items-center"
                key={`next_block_${columnCnt}`}
              >
                <Board render={block} cellSize={25} />
              </div>
            );
          })}
      </div>
    </div>
  );
};
