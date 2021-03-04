import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Painel administrativo da Nexoos</h1>
      <ul>
        <li>
          <Link to="/cadastro">Cadastrar um cliente</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
