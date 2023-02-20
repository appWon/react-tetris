import styled from "styled-components";

import { CellProps } from "./index";

type ContainerType = {
    size?: string;
    grid?: boolean;
};

export const Container = styled.div<ContainerType>`
    display: flex;
    padding: 0.5px;
    width: ${({ size }) => (size ? "10px" : "var(--cell-size)")};
    height: ${({ size }) => (size ? "10px" : "var(--cell-size)")};
    background: var(--cell-border-color);

    &:not(&:last-child) {
        border-right: ${({ grid }) => (grid ? "1px solid gray" : "unset")};
    }
`;

export const Cell = styled.div<CellProps>`
    flex: 1 1 auto;
    border-radius: 3px;
    background-color: ${(props) => props.color || "white"};
    box-shadow: ${(props) =>
        props.shadowColor ? `inset 0 0 10px 0 ${props.shadowColor}` : "unset"};
`;
