import styled from "styled-components";

export const PlayerContainer = styled.div`
    display: flex;
    gap: 20px;

    & > div {
        display: flex;
        flex-direction: column;
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

    & > section {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`;

export const BoardContainer = styled.section`
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    border: 1px solid gray;
    background-color: black;
`;
