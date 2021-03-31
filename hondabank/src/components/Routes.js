import React from 'react'

import { Router, Switch, Route } from "react-router";

import Loguin from '../pages/loguin/Loguin'
import Register from '../pages/register/Register'
import Home from '../pages/home/Home'
import CreditRequest from '../pages/creditRequest/CreditRequest'
import LoanRequest from '../pages/loanRequest/LoanRequest'
import NotFound from '../components/NotFound'
import PrivateRoute from './PrivateRoute'

import {history} from '../history'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Loguin} exact path="/login"/>
            <Route component={Register} exact path="/register"/>
            <PrivateRoute component={Home} exact path="/"/>
            <PrivateRoute component={CreditRequest} exact path="/credit"/>
            <PrivateRoute component={LoanRequest} exact path="/loan"/>
            <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes