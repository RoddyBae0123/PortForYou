import React, { useEffect, useState } from  "react";
import styled from "styled-components";
import axios from 'axios';
import GoogleFontLoader from 'react-google-font-loader';
import wifi from "../../wifi";
import {Route, Switch,Link} from "react-router-dom";
import Apply from './Side/Apply';
import Resume from './Side/Resume';
import Study from './Side/Study';
const Back = styled.div`
    display:grid;
    grid-template-columns: 1fr 4fr;

`



const DashboardPresenter = ({match}) => {
    return(<>
    <div><h1>Dashboard fixed</h1>
    <Link to ={`${match.path}/apply`}>apply</Link>
    <Link to ={`${match.path}/resume`}>resume</Link>
    <Link to ={`${match.path}/study`}>study</Link>

    </div>
            <Switch>
            <Route path={`${match.path}/apply`} component={Apply}></Route>
            <Route path={`${match.path}/resume`} component={Resume}></Route>
            <Route path={`${match.path}/study`} component={Study}></Route>
            </Switch>
    </>)
}


export default DashboardPresenter;