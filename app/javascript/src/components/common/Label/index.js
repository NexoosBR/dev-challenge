import React from "react";
import * as S from "./style";

const Label = ({ title, children }) => {
  return (
    <S.Label>
      {title}
      {children}
    </S.Label>
  );
};

export default Label;
