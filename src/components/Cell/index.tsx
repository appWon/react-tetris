import React from "react";

// styled-component
import * as S from "./style";

// type
import { BlockType } from "../../types";

export interface CellProps extends BlockType {
    shadowColor?: string;
    size?: number;
}

export const Cell = (props: CellProps) => {
    const getShadowColor = (hexColor: string): string => {
        const converNumber = parseInt(hexColor.slice(1), 16) - 20000;

        return "#" + converNumber.toString(16);
    };

    return (
        <S.Container size={props.size}>
            <S.Cell {...props} shadowColor={getShadowColor(props.color)} />
        </S.Container>
    );
};
