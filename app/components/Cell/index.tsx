import { memo } from "react";

export type CellProps = {
  color: string;
  cellSize: number;
  grid?: boolean;
};

export const Cell = memo((props: CellProps) => {
  return (
    <div
      className={`flex p-px bg-m-black ${
        props.grid && "not-last:border-r-[1px] not-last:border-r-m-gray"
      }`}
      style={{ width: props.cellSize, height: props.cellSize }}
    >
      <div
        className={`flex-auto rounded-[3px]`}
        style={{ backgroundColor: props.color || "black" }}
      />
    </div>
  );
});
