import React, { useEffect, useState } from  "react";
import SigninPresenter  from "./SigninPresenter";
import axios from "axios";
import wifi from "../../wifi";


const Signincontainer = (props) => {

    const [error,setError] = useState(undefined);
    const [result ,setResult] =useState(undefined);
    const {history:{push}} = props;
    const Iserror = () => {
      if(error===401)
      {
        push("/signup");
      }
       setError(undefined);
    };
    useEffect(Iserror , [error]);
    const Isresult = () => {if(result===200){
      push("/dashboard");
    }};
    useEffect(Isresult , [result]);
    

    
    const login= async(id,pw)=> {
        const api = await axios.create({
        baseURL:`${wifi}`
        });
        api.post('/api/login',{
          username:id,
          password:pw
        }).then((res)=>{
          setResult(res.status);
        }).catch((e)=>setError(e.response.status))
      }


    return(<SigninPresenter login={login} error={error}></SigninPresenter>)
}


export default Signincontainer;