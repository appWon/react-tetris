import styled from "styled-components";

import { CellProps } from "./index";

export const Cell = styled.div<CellProps>`
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background-color: ${(props) => props.color || "white"};
`;
