import styled from "styled-components";

export const ScoreContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 130px;
    border-radius: 10px;
    background-color: black;
    user-select: none;
    box-shadow: 0rem 0rem 1rem hsl(0deg 0% 0%);
    font-family: "dungGeunMo";
    font-size: 30px;
    gap: 5px;

    h1 {
        color: orange;
    }

    p {
        font-size: 30px;
        color: white;
    }
`;
