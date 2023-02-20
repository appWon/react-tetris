import styled from "styled-components";

type RowCoinatinerType = {
    grid?: boolean;
};

export const RowCoinatiner = styled.div<RowCoinatinerType>`
    display: flex;
    &:not(&:last-child) {
        border-bottom: ${({ grid }) => (grid ? "1px solid gray" : "unset")};
    }
`;

// {({ grid }) => (grid ? "1px solid gray" : "unset;")
