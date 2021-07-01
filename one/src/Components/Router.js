import React from "react";
import {BrowserRouter as Router, Route,Redirect,Switch} from "react-router-dom"
import Home from "../Routes/Home";
import Signin from "../Routes/Signin";
import Signup from "../Routes/Signup";
import Dashboard from "../Routes/Dashboard";
export default () => (
    <Router>
        <>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/dashboard" exact component={Dashboard} />

            </Switch>
        </>
    </Router>
)