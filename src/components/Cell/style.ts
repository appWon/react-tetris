import styled from "styled-components";

import { CellProps } from "./index";

export const Container = styled.div`
    display: flex;
    padding: 0.5px;
    width: 30px;
    height: 30px;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
`;

export const Cell = styled.div<CellProps>`
    flex: 1 1 auto;
    border-radius: 5px;
    background-color: ${(props) => props.color || "white"};
    box-shadow: ${(props) =>
        props.shadowColor ? `inset 0 0 10px 0 ${props.shadowColor}` : "unset"};
`;
