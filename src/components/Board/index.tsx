import React from "react";

// component
import { Cell } from "../Cell";

// style-component
import * as S from "./style";

// type
import { Board as BoardType } from "../../types";

type BoderProps = {
    render: BoardType;
    cellSize: number;
    grid?: boolean;
};

export const Board = (props: BoderProps) => {
    return (
        <S.BoraderContainer>
            {props.render.map((row, columnCnt) => (
                <S.RowCoinatiner key={`column_${columnCnt}`} grid={props.grid}>
                    {row.map((color, rowCnt) => (
                        <Cell
                            key={`row_${rowCnt}`}
                            color={color}
                            grid={props.grid}
                            cellSize={props.cellSize}
                        />
                    ))}
                </S.RowCoinatiner>
            ))}
        </S.BoraderContainer>
    );
};
