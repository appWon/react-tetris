type GameResultTypes = {
  gameResult: "WINNER" | "LOSER" | null;
  size?: string;
};

export const GameResult = (props: GameResultTypes) => {
  return (
    <div className="absolute top-[5%] left-[50%] translate-x-[-50%] font-main text-7xl text-m-white">
      {props.gameResult}
    </div>
  );
};
