import React from  "react";
import styled from "styled-components";
import {Link} from  "react-router-dom";
import axios from 'axios';

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
`
const Form = styled.form`
    display:flex;
    flex-direction: column;
    width:100%;
    align-items: center;
    
`
const Input = styled.input`
    height:50px;
    width:496px;
    
    margin:0 0 20px 0;
    padding:0;
    
`
const Submit = styled.input`
    height:60px;
    width:500px;
    padding:0;

`

const LoginPresenter = () => {
    let id= undefined;
    let pw= undefined;

    
    const updateOne = (event) => {
        const {target} = event;
        if(target.name==="id"){
            id=target.value;
        }
        else{
            pw=target.value;
        }
    
    }
    const handleSubmit = (event) =>{
        event.preventDefault();        
        gopost(id,pw);
    }
    
    const gopost= async(id,pw)=> {
        const api = await axios.create({
        baseURL:"http://192.168.242.90:8080/"
        });
        api.post('/api/login',{
          username:id,
          password:pw
        }).then((res)=>{
          console.log(res)
        })
      }
    return(<Container>
    <Header>
        <Logo to ="/">
            <Back what={require("../../assets/logo_transparent.png").default} / >
        </Logo>
    </Header>
    <Form onChange={updateOne} onSubmit={handleSubmit}>
        <Input type="text" name="id" />
        <Input type="password" name="pw" />
        <Submit type="submit"  value="Login"/>
    </Form>

</Container>)}
export default LoginPresenter;