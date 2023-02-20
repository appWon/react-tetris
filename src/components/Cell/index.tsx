import React from "react";

// styled-component
import * as S from "./style";

export interface CellProps {
    color: string;
    shadowColor?: string;
    size?: string;
    grid?: boolean;
}

export const Cell = (props: CellProps) => {
    const getShadowColor = (hexColor: string): string => {
        if (!hexColor) return "unset";
        const converNumber = parseInt(hexColor.slice(1), 16) - 20000;

        return "#" + converNumber.toString(16);
    };

    return (
        <S.Container size={props.size} grid={props.grid}>
            <S.Cell
                color={props.color || "black"}
                shadowColor={getShadowColor(props.color)}
            />
        </S.Container>
    );
};
