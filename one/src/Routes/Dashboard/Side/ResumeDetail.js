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
import Loader from "react-loader-spinner";
import Select from '../../../Components/Select';
import Project from '../../../Components/Project';
import Stack from '../../../Components/Stack';
const Makecenter = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100vh;
`


const Container = styled.form`
    margin-top:60px;
    width:100%;
    display:flex;
    align-items: center;
    flex-direction: column;
`

const BigTitle = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;

`
const TitleContent = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`
const UserInfo  = styled.div`
    display:grid;
    grid-template-columns: 0.6fr 0.4fr;
    padding:10px;
    width:100%;
    height:100px;
`
const UserSection= styled.div`
    display:flex;
    justify-content:${props=>props.data ? "flex-end": "flex-start"};
    align-items: center;
    border-right:${props=> props.data ? `3.5px solid RGB(212, 212, 212)` : `none`};
`


const ResumeDetail = ({match}) => {

    const Idx=match.params.idx;
    const accessToken = Auth.getAccessToken();
    console.log(accessToken);
    const [data,setData] = useState(false);
    const [detail,setDetail]= useState(
        
    );
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
        <UserInfo>
        <UserSection data={1}>Title</UserSection>
        <UserSection data={0}>fuck</UserSection>
        </UserInfo>
            <h1 style={{fontSize:30,margin:"30px 0"}}>Position</h1>
            <Select data={data.data.positions} />
            <h1 style={{fontSize:30,margin:"30px 0"}}>Project</h1>
            <Project data={data.data.project} detail={detail} setDetail ={setDetail} />
            <h1 style={{fontSize:30,margin:"30px 0"}}>Stack</h1>
            <Stack data={data.data.content}/>
            
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
