import React from "react";
import {BrowserRouter as Router, Route,Redirect,Switch} from "react-router-dom"
import Home from "../Routes/Home";
import Login from "../Routes/Login";

export default () => (
    <Router>
        <>
            <Switch>
                <Route path="/" exact component={Home} />

                <Route path="/login" exact component={Login} />
            </Switch>
        </>
    </Router>
)