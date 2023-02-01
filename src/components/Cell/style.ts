import styled from "styled-components";

import { CellProps } from "./index";

export const Container = styled.div`
    display: flex;
    padding: 0.5px;
    width: var(--cell-size);
    height: var(--cell-size);
    background: var(--cell-border-color);
`;

export const Cell = styled.div<CellProps>`
    flex: 1 1 auto;
    border-radius: 3px;
    background-color: ${(props) => props.color || "white"};
    box-shadow: ${(props) =>
        props.shadowColor ? `inset 0 0 10px 0 ${props.shadowColor}` : "unset"};
`;
