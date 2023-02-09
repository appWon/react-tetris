import styled from "styled-components";

export const NextBlocksContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 450px;
    width: 110px;
    padding: 10px;
    border-radius: 10px;
    background-color: black;
    box-shadow: 0rem 0rem 1rem hsl(0deg 0% 0% / 100%);

    & > p {
        font-size: 2rem;
        color: white;
        font-family: "dungGeunMo";
        user-select: none;
    }
`;

export const NextBlock = styled.div`
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;

    & > div {
        border-right: unset !important;

        & > div {
            border-bottom: unset !important;
        }
    }
`;
