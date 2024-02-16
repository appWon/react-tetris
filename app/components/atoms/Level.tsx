import { useSelector } from "react-redux";

import { gameState } from "../../store/reducer/gameState";

export const Level = () => {
  const { timeFrame } = useSelector(gameState);

  return (
    <section className="flex flex-col justify-center items-center font-main text-[30px] w-[130px] text-white p-[10px] rounded-[10px] bg-m-black select-none gap-[5px]">
      <h3 className="text-[red]">LEVEL</h3>
      <h4>{timeFrame}</h4>
      <p className="text-[15px] p-t-[5px] p-b-[0] text-center">
        20초마다 레벨 상승
      </p>
    </section>
  );
};
