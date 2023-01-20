import React from "react";

// styled-component
import * as S from "./style";

export interface CellProps {
    color: string;
    state: "blank" | "fixed" | "drop" | "duplicated";
}

export const Cell = (props: CellProps) => {
    return <S.Cell {...props} />;
};
