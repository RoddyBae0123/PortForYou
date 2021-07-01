import React, { useEffect, useState } from  "react";
import SignupPresenter  from "./SignupPresenter";
import axios from "axios";
import wifi from "../../wifi";


const Signcontainer = (props) => {

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
    

    
    const Signup= async(username,password,name)=> {
        const api = await axios.create({
        baseURL:`${wifi}`
        });
        api.post('/api/signup',{
          username,
          password,
          name
        }).then((res)=>{
          console.log(res);
        }).catch((e)=>console.log(e))
      }


    return(<SignupPresenter Signup={Signup} error={error}></SignupPresenter>)
}


export default Signcontainer;