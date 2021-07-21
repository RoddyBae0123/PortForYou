import { useEffect, useState } from 'react';
import Auth from "../../Auth";
import DashboardPresenter from "./DashboardPresenter"
import axios from "axios";
import wifi from "../../wifi";
import { Link } from 'react-router-dom';
import {useAsync} from "react-async";
const DashboardContainer = ({match,history}) => {
    const [data , setData] = useState(undefined); //resume data
    const [profileImgUri , setProfileImgUri] = useState(undefined); //change profile
    const [userData , setUserData] = useState(undefined); //user information
    const [study,setStudy] = useState(undefined);
    const getUserInfo = async() => {
        const api = await axios.create({
            baseURL:`${wifi}`
            });
    
        api.get('/api/userInfo',{
            headers:{
                "Authorization":`Bearer ${Auth.getAccessToken()}`
            }
        }).then((res)=>{
            setUserData(res);
            setProfileImgUri("api/img/default?name="+res.data.uid+"_profile_img");
        }).catch((e)=>{
            if(e.response.status===401){
                history.push("/error401");
            }
        })
    }    

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
        }).catch((e)=>{
            if(e.response.status===401){
                history.push("/error401")
            }
        })
        
      }
      
      const setProfileImage = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("profile", e.target.files[0])
        const api = await axios.create({
            baseURL:`${wifi}`
            });
        api.post('/api/img/user',formData,{
                data: FormData,
                headers:{
                    "Authorization":`Bearer ${Auth.getAccessToken()}`,
                    "Content-Type": "multipart/form-data"
                }
                
            }).then((res)=>{
                if(profileImgUri.slice(-1) != "&")
                    setProfileImgUri("api/img/default?name="+userData.data.uid + "_profile_img&");
                if(profileImgUri.slice(-1) == "&")
                    setProfileImgUri("api/img/default?name="+userData.data.uid + "_profile_img");
            }).catch((t)=>console.log(t))
      }

      const DelResumeBtn = async(e) => {
        const api = await axios.create({
            baseURL:`${wifi}`,
            headers:{
                "Authorization":`Bearer ${Auth.getAccessToken()}`
            }
            });
        api.delete(`/api/user/portfolio?portfolio_idx=${e.target.parentElement.id}`).then(
            ()=>{ getResumeList(Auth.getAccessToken());
            }
        );
      }


      const getStudyList = async ()=>{
          try{
            const api = await axios.create({
                baseURL:`${wifi}`,
                headers:{
                    "Authorization":`Bearer ${Auth.getAccessToken()}`
                }
            });
            api.get("/api/user/studies")
            .then((e)=>setStudy(e.data))
          }
        catch(error){
            console.log(error);
        }

      }

    useEffect(()=>{
        getUserInfo();
    },[])

    
    

    return(
        <>  
            <DashboardPresenter 
                match={match} 
                data={data} 
                method={getResumeList} 
                profileImgUri = {profileImgUri} 
                imageHandler = {setProfileImage}
                setData={setData}
                DelResumeBtn={DelResumeBtn}
                getStudyList={getStudyList}
                history={history}
                setStudy={setStudy}
                study={study}
                >
                    
            </DashboardPresenter>
        </>
    )
}




export default DashboardContainer;