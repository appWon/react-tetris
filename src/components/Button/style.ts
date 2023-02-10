import styled from "styled-components";

type ButtonTypes = {
    size?: string;
};

export const Button = styled.button<ButtonTypes>`
    position: absolute;
    color: yellow;
    font-family: "dungGeunMo";
    background: unset;
    border: unset;
    user-select: none;
    bottom: 10%;
    transform: translate(50%, 0);
    font-size: ${(props) => props.size || "3rem"};

    &:hover {
        cursor: pointer;
    }
`;
