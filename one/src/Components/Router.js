import React from "react";
import {BrowserRouter as Router, Route,Redirect,Switch} from "react-router-dom"
import Home from "../Routes/Home";
import Signin from "../Routes/Signin";
import Signup from "../Routes/Signup";
import Dashboard from "../Routes/Dashboard";
import { AnimatePresence,motion } from "framer-motion"
import ErrorPage from "../Components/ErrorPage"
export default () => (
    <Router>
        <>  <AnimatePresence>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/dashboard"  component={Dashboard} />
                    <Route path="/error401"  component={ErrorPage} />

                </Switch>
        </AnimatePresence>
                
        </>
    </Router>
)