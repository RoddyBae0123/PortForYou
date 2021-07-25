import RoomBoardPresenter from './RoomBoardPresenter';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import { useEffect,useState } from 'react';
import axios from "axios";
import wifi from "../../wifi";
import Auth from "../../Auth";
import {portFolioApi} from "../../Api";

const RoomBoardContainer = ({match,history,location}) => {
    const [profileImgUri , setProfileImgUri] = useState(undefined); //change profile
    const [userData , setUserData] = useState(undefined); //user information
    const [position , setPosition] =useState([]);
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

    const getPositionList = async() => {
        try{
            const {data} = await portFolioApi.getPosition();
            {data&&data.map(e=> {
                setPosition((position)=>(
                    [...position,{
                        name:e.name,
                        position: {
                            idx: e.idx
                         },
                        demand: 1,
                        checked:false
                    }]
                ))
            })}
            
        }
        catch(e){
            console.log(e);
        }
        
    }
    

      useEffect(()=>{
        getUserInfo();
    },[])


    return(<RoomBoardPresenter location={location} match={match} history={history} profileImgUri = {profileImgUri} 
        imageHandler = {setProfileImage} getPositionList={getPositionList} position={position} setPosition={setPosition}/>)
}

export default RoomBoardContainer;