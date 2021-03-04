import React from "react";
import * as S from "./style";

const Button = ({ children, ...rest }) => {
  return <S.Button {...rest}>{children}</S.Button>;
};

export default Button;
