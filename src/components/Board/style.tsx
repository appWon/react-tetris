import styled from "styled-components";

type RowCoinatinerType = {
    grid?: boolean;
};

export const BoraderContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    width: 100%;
`;

export const RowCoinatiner = styled.div<RowCoinatinerType>`
    display: flex;

    &:not(&:last-child) {
        border-bottom: ${({ grid }) => (grid ? "1px solid gray" : "unset")};
    }
`;
