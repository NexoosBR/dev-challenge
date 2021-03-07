import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import CreditApplication from "./components/pages/CreditApplication";

import * as S from "./style";
import "~/styles/global.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import GlobalStyles from "./styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <S.Container>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cadastro" component={SignUp} />
            <Route path="/solicitacao" component={CreditApplication} />
          </Switch>
        </Router>
      </S.Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
