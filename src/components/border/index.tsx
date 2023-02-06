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
                        <Cell size={size} key={`row_${rowCnt}`} {...v}></Cell>
                    ))}
                </S.RowCoinatiner>
            ))}
        </>
    );
};
