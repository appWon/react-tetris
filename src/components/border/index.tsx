import React from "react";

// component
import { Cell } from "../Cell";

// style-component
import * as S from "./style";

// type
import { BlockType } from "../../types";

type BoderProps = {
    render: BlockType[][];
    size?: number;
};

export const Border = ({ render, size }: BoderProps) => {
    return (
        <>
            {render.map((v, columnCnt) => (
                <S.RowCoinatiner key={`column_${columnCnt}`}>
                    {v.map((v, rowCnt) => (
                        <Cell
                            key={`row_${rowCnt}`}
                            color={v.color}
                            state={v.state}
                            size={size}
                        ></Cell>
                    ))}
                </S.RowCoinatiner>
            ))}
        </>
    );
};
