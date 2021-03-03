import React from "react";
import * as S from "./style";

const TextInput = ({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  disabled,
}) => {
  return (
    <S.Input
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
};

export default TextInput;
