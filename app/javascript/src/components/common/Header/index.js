import React from "react";
import { NEXOOS_LOGO_SRC } from "./constants";
import * as S from "./style";

const Header = () => {
  return (
    <S.Container>
      <S.Logo src={NEXOOS_LOGO_SRC} />
    </S.Container>
  );
};

export default Header;
