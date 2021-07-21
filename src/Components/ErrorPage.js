import React from "react";
import styled from 'styled-components';
import {Link} from "react-router-dom";


const Container = styled.div`
    height:100vh;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgb(255,211,181);
background: linear-gradient(149deg, rgba(255,211,181,1) 0%, rgba(255,141,149,1) 100%);
`
const MainError = styled.main`
    display:flex;
    flex-direction: column;
    align-items: center;
`

const ErrorType = styled.h1`
    font-size:120px;
    color: white;
    font-weight: 600;
    margin: 20px 0 ;
`
const ErrorMsg = styled.h3`
    font-size:15px;
    color:white;
    opacity:0.5;
    font-weight: 300;
    margin: 10px 0 ;

`

const GoSignin = styled.button`
    width:210px;
    height:50px;
    border-radius: 15px;
    border:2px solid white;
    font-weight: 500;
    color:white;
    transition:all 300ms ease-in-out;
    &:hover{
        background-color:white;
        color: rgba(255,211,181,1);
    }
`
const SexyLink = styled(Link)`
 margin-top:50px;
`


const ErrorPage = () => {

    return(<Container>
        <MainError>
            <ErrorType>401</ErrorType>
            <ErrorMsg>You do not have permission. Please log in again.</ErrorMsg>
            
        </MainError>
        <hr style={{width:200,color:"white",height:2,opacity:1}}></hr>

            <SexyLink to='/signin'><GoSignin>SIGN IN</GoSignin></SexyLink>
    </Container>)
}

export default ErrorPage ;