import styled from "styled-components";

export const BlockBoardContainer = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    background-color: black;
    box-shadow: 0rem 0rem 1rem hsl(0deg 0% 0% / 100%);

    & > div {
        display: flex;
        border: 1px solid gray;
    }
`;

export const RowCoinatiner = styled.div`
    &:not(&:last-child) {
        border-right: 1px solid gray;
    }
`;
