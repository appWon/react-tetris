import styled from "styled-components";
import { PlayerTypes } from "../../hooks/usePlayer";

export const OppernentContainer = styled.section<{ player: PlayerTypes[] }>`
    display: ${({ player }) => (player.length ? "flex" : "none")};
    flex-direction: column;
    flex-wrap: wrap-reverse;
    gap: 20px;

    & > div {
        display: flex;
    }
`;

export const BlockBoardContainer = styled.div`
    display: flex;
    position: relative;
    justify-content: center;
    padding: 10px;
    border-radius: 10px;
    background-color: black;
    box-shadow: 0rem 0rem 1rem hsl(0deg 0% 0% / 100%);

    & > div {
        display: flex;
        flex-direction: column;
        border: 1px solid gray;
    }
`;
