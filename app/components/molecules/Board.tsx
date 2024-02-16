import { Board as BoardType } from "../../types";

import { Cell } from "../atoms/Cell";

type BoderProps = {
  render: BoardType;
  cellSize: number;
  grid?: boolean;
};

export const Board = (props: BoderProps) => {
  return (
    <div className="flex flex-col flex-auto w-full">
      {props.render.map((row, columnCnt) => (
        <div
          className={`flex ${
            props.grid && "not-last:border-b-[1px] not-last:border-[gray]"
          }`}
          key={`column_${columnCnt}`}
        >
          {row.map((color, rowCnt) => (
            <Cell
              key={`row_${rowCnt}`}
              color={color}
              grid={props.grid}
              cellSize={props.cellSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
