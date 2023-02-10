import styled from "styled-components";

export const PlayerContainer = styled.section`
    display: flex;
    gap: 20px;

    & > div {
        position: relative;
        padding: 10px;
        border-radius: 10px;
        background-color: black;
        box-shadow: 0rem 0rem 1rem hsl(0deg 0% 0% / 100%);

        & > button {
            bottom: 5rem;
            left: 50%;
            transform: translate(-50%, 0);
        }
    }
`;

export const BorderContainer = styled.div`
    display: flex;
    position: relative;
    width: fit-content;
    height: fit-content;
    justify-content: center;
    border: 1px solid gray;
    background-color: black;
`;
