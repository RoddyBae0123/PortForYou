import { useEffect, useState } from 'react';
import Auth from "../../Auth";
import DashboardPresenter from "./DashboardPresenter"
import axios from "axios";
import wifi from "../../wifi";
const DashboardContainer = ({match}) => {
    const [data , setData] = useState(undefined);

    const getResumeList = async(token) => {
        const api = await axios.create({
        baseURL:`${wifi}`
        });
        api.get('/api/user/portfolios',{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        }).then((res)=>{
            setData(res);
        }).catch((e)=>console.log(e))
      }

    // useEffect(()=>{
    //     getResumeList(Auth.getAccessToken());
    // },[])

    
    

    return(
        <>  
            <DashboardPresenter match={match} data={data} method={getResumeList}></DashboardPresenter>
        </>
    )
}




export default DashboardContainer;