import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Bem vindo a Nexoos</h1>
      <ul>
        <Link to="/cadastro">
          <li>Cadastrar um participante</li>
        </Link>
      </ul>
    </>
  );
};

export default Home;
