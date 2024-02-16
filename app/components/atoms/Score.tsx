import { useSelector } from "react-redux";

import { gameState } from "../../store/reducer/gameState";

export const Score = () => {
  const { score } = useSelector(gameState);

  return (
    <section className="flex flex-col justify-center items-center p-[10px] w-[130px] rounded-[10px] bg-[black] select-none text-3xl gap-[5px] font-main">
      <h1 className="text-orange-400">SCORE</h1>
      <p className="text-3xl text-white">{score}</p>
    </section>
  );
};
