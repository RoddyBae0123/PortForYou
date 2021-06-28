import React from "react";
import LoginPresenter  from "./LoginPresenter";
import axios from "axios";

export default class extends React.Component {

    state={
        message:undefined,
        token:undefined
    }

    login = async(id,pw) => {
        const api =  await axios.create({
            baseURL:"http://192.168.242.90:8080/"
        });
        api.post("/api/login",{
            username:id,
            password:pw
        }).then((res)=>
        console.log(res))
    }
    
     componentDidMount(){
        
        this.login("admin","admin");

    }


    render(){
        return(<LoginPresenter data="Login"></LoginPresenter>)
    }    
}
