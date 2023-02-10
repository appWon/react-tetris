import styled from "styled-components";

type ContainerType = {
    size?: string;
};

export const GameResultContainer = styled.p<ContainerType>`
    position: absolute;
    top: 5%;
    left: 50%;
    transform: translate(-50%, 0);
    color: white;
    font-family: "dungGeunMo";
    text-shadow: 5px 5px 5px grey;
    font-size: ${(props) => props.size || "5rem"};
`;
