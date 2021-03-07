import React from "react";
import { Link } from "react-router-dom";
import * as S from "./style";

const Home = () => {
  return (
    <>
      <S.Title>Painel administrativo da Nexoos</S.Title>
      <S.List>
        <li>
          <Link to="/cadastro">
            <S.Card>Cadastrar um cliente</S.Card>
          </Link>
        </li>
        <li>
          <Link to="/solicitacao">
            <S.Card>Criar uma solicitação de crédito</S.Card>
          </Link>
        </li>
      </S.List>
    </>
  );
};

export default Home;
