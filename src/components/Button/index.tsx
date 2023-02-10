import React, { ReactNode } from "react";

// styled-component
import * as S from "./style";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    size?: string;
}

export const Button = (props: ButtonProps) => {
    return <S.Button {...props} />;
};
