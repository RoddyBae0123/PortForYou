import React from "react";
import LoginPresenter  from "./LoginPresenter";
import axios from "axios";

export default class extends React.Component {

    state={
        error:null,
        token:undefined
    }

    login = async(id,pw) => {
        const api =  await axios.create({
            baseURL:"http://192.168.242.90:8080/"
        });
        api.post("/api/login",{
            username:id,
            password:pw
        }).catch((error)=>{console.log(error.response.status)}).then((res)=>{if(res!== undefined){console.log(res)}} );
        
        
    }
    
     componentDidMount(){
        

    }


    render(){
        return(<LoginPresenter></LoginPresenter>)
    }    
}
