import { useEffect, useState } from 'react';
import Auth from "../../Auth";
import DashboardPresenter from "./DashboardPresenter"
import axios from "axios";
import wifi from "../../wifi";
const DashboardContainer = ({match}) => {
    const [data , setData] = useState(undefined); //resume data
    const [profileImgUri , setProfileImgUri] = useState(undefined); //change profile
    const [userData , setUserData] = useState(undefined); //user information
    
    
    const getUserInfo = async() => {
        const api = await axios.create({
            baseURL:`${wifi}`
            });
    
        api.get('/api/user',{
            headers:{
                "Authorization":`Bearer ${Auth.getAccessToken()}`
            }
        }).then((res)=>{
            setUserData(res);
            setProfileImgUri("api/img/default?name="+res.data.uid+"_profile_img");
        }).catch((e)=>console.log(e))
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
        }).catch((e)=>console.log(e))
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
                imageHandler = {setProfileImage}>
            </DashboardPresenter>
        </>
    )
}




export default DashboardContainer;