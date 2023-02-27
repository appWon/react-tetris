import styled from "styled-components";

export const NextBlocksContainer = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    background-color: black;
    box-shadow: 0rem 0rem 1rem hsl(0deg 0% 0% / 100%);

    h3 {
        color: green;
        font-size: 2rem;
        font-family: "dungGeunMo";
        user-select: none;
    }
`;

export const NextBlockList = styled.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const NextBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
