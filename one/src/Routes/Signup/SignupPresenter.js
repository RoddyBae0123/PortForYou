import React, { useEffect, useState } from  "react";
import styled from "styled-components";
import {Link} from  "react-router-dom";
import axios from 'axios';
import GoogleFontLoader from 'react-google-font-loader';
import wifi from "../../wifi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

const Back = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100%;
    height:100vh;
`

const Container = styled.div`
    display:grid;
    grid-template-columns:  50% 50%;
    width:1150px;
    height:600px;
    border-radius:20px;
    box-shadow: 3px 3px 0vw black;

`

const Signup = styled.div`
    background-color:RGB(255, 211, 181);
    border-radius:20px 0 0 20px;
    display:flex;
    flex-direction:column;
    justify-content: center;


`
const Signin = styled.div`
    background-color:white;
    border-radius: 0 20px 20px 0;
    display:flex;
    flex-direction:column;
    justify-content: center;

`

const Warning = styled.p`
    font-size:20px;
    color:red;
    display:${(props)=> props.status ? "block" : "none"};

`

const Linkto = styled(Link)`
    display:flex;
    justify-content: center;

`
const Logo = styled.img`
    width:22%;
    padding-bottom:10px;
    border-bottom:5px solid RGB(255, 140, 148);
`
const Lefttitle= styled.h1`
    text-align:center;
    font-size:40px;
    margin:20px 0 20px 0  ;
`

const LeftAdd = styled.h3`
    text-align: center;
    font-size:14px;
    margin-bottom:45px ;

` 
const Button = styled.button`
    background-color:RGB(255, 140, 148);
    width:300px;
    height:56px;
    border-radius: 20px;
    opacity:0.5;
    &:hover{
        opacity:1;
    }
    transition:all 300ms ease-in-out;
`

const Righttitle = styled.h1`
    text-align:center;
    font-size:50px;
    margin:0px 0 20px 0  ;
    font-weight:600;
    color:RGB(255, 140, 148);

`

const RightAdd = styled.h3`
    text-align: center;
    font-size:20px;
    color:RGB(59, 72, 81);
    font-weight: 600;
    margin-bottom:40px;

`

const Form  = styled.form`
    display:flex;
    flex-direction: column;
    align-items: center;
`
const Inputdef = styled.input`
    width:300px;
    height:56px;
    margin:10px 0 ;
    outline:none;
    background-color:RGB(238,238,238);;
    border:none;
    &:focus{
        background-color:#F4F8F7;

    }
    transition:all 300ms ease-in-out;
    font-size:40px;
    padding:20px;
`
const Submitdef = styled.input`
    width:300px;
    height:56px;
    margin:30px 0 10px 0  ;
    outline:none;
    background-color:white;

    border:5px solid RGB(255, 140, 148);
    transition:all 300ms ease-in-out;
    &:hover{
        background-color:RGB(255, 140, 148);

    }
    border-radius: 20px;
    cursor:pointer;
`
const A= styled.a`
    
`
const SignupPresenter = ({Signup,error}) => {
    
    var id = undefined;
    var pw = undefined;
    var name = undefined;
    const handleSubmit = (event) =>{
        
        event.preventDefault();
        
        id=event.target[0].value;
        pw=event.target[1].value;
               
        Signup(id,pw,name);
    }
    
    
    return(
    <>
    <GoogleFontLoader
      fonts={[
        {
          font: 'Roboto',
          weights: [400, 600],
        },
        {
          font: 'Roboto Mono',
          weights: [400, 700],
        },
      ]}
      subsets={['cyrillic-ext', 'greek']}
    />
    <Back>
    <Container>
      <Signup>
        <Linkto to="/">
            <Logo src={`${wifi}api/img/default?name=logo_transparent_small`}></Logo>
        </Linkto>
        <Lefttitle>Welcome Developer!</Lefttitle>
        <LeftAdd>To keep connected with us ,<br />
        please login with your personal info  </LeftAdd>
        <Linkto to="/signin">
            <Button>SIGN IN</Button>
        </Linkto>
      </Signup>
      <Signin>
        <Righttitle>Create Account</Righttitle>
        <RightAdd>Please type the infomation</RightAdd>
        <Form onSubmit={handleSubmit}>
            <Inputdef placeholder="Id" type="text" name="id" ></Inputdef>
            <Inputdef placeholder="Password" type="password"  name="pw"></Inputdef>
            <Inputdef placeholder="name" type="text"  name="name"></Inputdef>
            <Submitdef type="submit" value="SIGN UP"></Submitdef>
        </Form>
        
      </Signin>

    </Container>

</Back>
</>)}

export default SignupPresenter;