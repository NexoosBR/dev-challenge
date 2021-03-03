import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import * as S from "./style";
import "~/styles/global.css";

const App = () => {
  return (
    <S.Container>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cadastro" component={SignUp} />
        </Switch>
      </Router>
    </S.Container>
  );
};

export default App;
