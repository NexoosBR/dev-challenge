import React from "react";
import * as S from "./style";

const Label = ({ title, children }) => {
  return (
    <S.Label>
      <S.LabelText>{title}</S.LabelText>
      {children}
    </S.Label>
  );
};

export default Label;
