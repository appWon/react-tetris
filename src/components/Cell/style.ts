import styled, { css } from "styled-components";

import { CellProps } from "./index";

type ContainerType = {
    cellSize: number;
    grid?: boolean;
};

export const Container = styled.div<ContainerType>`
    display: flex;
    padding: 1px;
    background: var(--cell-border-color);
    width: ${({ cellSize }) => `${cellSize}px`};
    height: ${({ cellSize }) => `${cellSize}px`};

    &:not(&:last-child) {
        border-right: ${({ grid }) => (grid ? "1px solid gray" : "unset")};
    }
`;

export const Cell = styled.div<CellProps>`
    flex: 1 1 auto;
    border-radius: 3px;
    background-color: ${(props) => props.color || "white"};
`;
