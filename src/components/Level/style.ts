import styled from "styled-components";

export const LevelContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "dungGeunMo";
    font-size: 30px;
    width: 130px;
    color: white;
    padding: 10px;
    border-radius: 10px;
    background-color: black;
    box-shadow: 0rem 0rem 1rem hsl(0deg 0% 0% / 100%);
    user-select: none;
    gap: 5px;

    h3 {
        color: red;
    }

    p {
        font-size: 11px;
        padding: 5px 0;
    }
`;
