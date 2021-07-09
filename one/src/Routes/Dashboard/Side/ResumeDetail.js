import { AnimatePresence,motion } from "framer-motion";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck,faUsers,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { Table } from 'reactstrap';
import {Route, Switch,Link} from "react-router-dom";
import { faJava,faPython } from '@fortawesome/free-brands-svg-icons'
import Auth from "../../../Auth";
import axios from 'axios';
import wifi from '../../../wifi';
import { useEffect, useState } from 'react';
import Tr from '../../../Components/Tr';
import Loader from "react-loader-spinner";

const Makecenter = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100vh;
`


const Container = styled.div`
    height:100vh;
    width:100%;
    display:flex;
    align-items: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size:35px;
    font-weight:700;
    margin-right: 20px;
`
const SubTitle = styled.h5`
    font-size:21px;
    font-weight:400;
`
const Button = styled.button`
    font-size:20px;
    color:#A2A2A2;
`
const DashTitle = styled.div`
    width:90%;
    height:70px;
    background-color: white;
    border-radius: 10px;
    margin:50px 0 ;

    display:grid;
    grid-template-columns: 0.8fr 0.2fr;
`
const DashContent =styled.div`
    width:90%;
    height: 73%;
    background-color: white;
    border-radius: 10px;
    display:grid;
    grid-template-columns: repeat(auto-fill,33.3%);
    
`
const ResumeDetail = ({match}) => {

    const Idx=match.params.idx;
    const accessToken = Auth.getAccessToken();
    console.log(accessToken);
    const [data,setData] = useState(false);
    useEffect(()=>{
        getResumeDetail(accessToken,Idx);

    },[])

    const getResumeDetail = async(token,idx) => {
        const api = await axios.create({
        baseURL:`${wifi}`
        });
        api.get(`/api/user/portfolio?portfolio_idx=${idx}`,{
            headers:{
                "Authorization":`Bearer ${token}`,

            }
        }).then((res)=>{
            setData(res);
        }).catch((e)=>console.log(e))
      }
      {data && console.log(data.data)}
    return(data ? (<div style={{marginTop:"60px"}}>
        <Container>
            <DashTitle>
                <div style={{display:"flex", flexDirection:'rows',alignItems:"center"}}>
                    <FontAwesomeIcon icon={faUserCheck} size="2x" style={{margin:"0 30px"}} />
                    <Title>Resume</Title>
                    <SubTitle style={{transform:"translateY(50%)"}}>Manage your Applyment.</SubTitle>
                </div>
                <div style={{display:"flex", flexDirection:'rows',alignItems:"center",justifyContent:"flex-end"}}>
                    <Button>
                        <FontAwesomeIcon icon={faPlusCircle} size="2x" style={{margin:"0 30px"}} />
                    </Button>
                </div>
            </DashTitle>
            <DashContent><div>apply</div><div>apply</div><div>apply</div><div>apply</div><div>apply</div><div>apply</div></DashContent>
        </Container>
    </div>) : <Makecenter>
        <Loader type="Rings"
    color="#FF8C94"
    height={300}
    width={300}
    timeout={10000}/>
    </Makecenter>)
}


export default ResumeDetail;
