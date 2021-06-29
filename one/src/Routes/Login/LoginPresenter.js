import React, { useEffect, useState } from  "react";
import styled from "styled-components";
import {Link} from  "react-router-dom";
import axios from 'axios';
import GoogleFontLoader from 'react-google-font-loader';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    width:100%;
    height:100vh;
`
const Header = styled.h1`
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: none;
`
const Logo = styled(Link)`
    margin: 0 auto;
`
const Back = styled.div`
    background-image:url(${props=> props.what});
    width: 250px;
    height: 250px;    
    background-position: center center;
    background-size:cover;
    margin-top:10px;
       
`
const Form = styled.form`
    display:flex;
    flex-direction: column;
    width:100%;
    align-items: center;
    
`
const Input = styled.input`
    height:50px;
    width:500px;
    
    margin:0 0 20px 0;
    padding:0;
    border:1px solid RGB(74, 86, 94);
    &:focus { border:2px solid RGB(246, 201, 14);}
    outline:none;
    border-radius: 5px;
    
`
const Submit = styled.input`
    height:60px;
    width:500px;
    padding:0;
    background-color:RGB(246, 201, 14);
    border:1px solid RGB(246, 201, 14);
    cursor:pointer;
    border-radius: 5px;
    outline: none;
    margin-top:20px;
`

const Warning = styled.p`

    font-size:20px;
    color:red;
    display:${(props)=> props.status ? "block" : "none"};

`

const LoginPresenter = () => {
    const [Id ,setId] =useState(undefined);
    const [pw ,setpw] =useState(undefined);
    const [result ,setResult] =useState(undefined);
    const [error ,setError] =useState(false);
    const hey = () => console.log(error);
    useEffect(hey , [error]);

    const updateOne = (event) => {
        const {target} = event;
        if(target.name==="id"){
            setId(target.value);
        }
        else{
            setpw(target.value);
        }
    
    }
    const handleSubmit = (event) =>{
        event.preventDefault();        
        gopost(Id,pw);
    }
    
    const gopost= async(id,pw)=> {
        const api = await axios.create({
        baseURL:"http://192.168.228.90:8080/"
        });
        api.post('/api/login',{
          username:id,
          password:pw
        }).then((res)=>{
          setResult(res);
        }).catch((e)=>setError(e.response.status))
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
    <Container>
    <Header>
        <Logo to ="/">
            <Back what={require("../../assets/logo_transparent.png").default} / >
        </Logo>
    </Header>
    <Form onChange={updateOne} onSubmit={handleSubmit}>
        <Input type="text" name="id" />
        <Input type="password" name="pw" />
        <Warning status={error}>Login failed</Warning>
        <Submit type="submit"  value="Login" style={{ fontFamily: 'Roboto Mono, monospaced', weights:"700"}}/>
    </Form>

</Container>
</>)}

export default LoginPresenter;

