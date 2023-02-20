import React from "react";

// component
import { Cell } from "../Cell";

// style-component
import * as S from "./style";

// type
import { Board } from "../../types";

type BoderProps = {
    render: Board;
    size?: number;
    grid?: boolean;
};

export const Border = (props: BoderProps) => {
    return (
        <>
            {props.render.map((v, columnCnt) => (
                <S.RowCoinatiner key={`column_${columnCnt}`} grid={props.grid}>
                    {v.map((v, rowCnt) => (
                        <Cell
                            key={`row_${rowCnt}`}
                            color={v}
                            grid={props.grid}
                        />
                    ))}
                </S.RowCoinatiner>
            ))}
        </>
    );
};
