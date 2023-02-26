import React, { memo } from "react";

// styled-component
import * as S from "./style";

export interface CellProps {
    color: string;
    cellSize: number;
    grid?: boolean;
}

export const Cell = memo((props: CellProps) => {
    return (
        <S.Container grid={props.grid} cellSize={props.cellSize}>
            <S.Cell color={props.color || "black"} cellSize={props.cellSize} />
        </S.Container>
    );
});
