import { AnimatePresence,motion } from "framer-motion"
import styled from "styled-components";
import SectionTitle from '../../../Components/SectionTitle';
import ListWrapper from "../../../Components/ListWrapper";
import { useEffect,useState } from 'react';

const Container = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    margin-top:60px;
`

const NewCgry = styled.div`
    border-top: 1px solid lightgray;
    width:85%;
    margin-top:45px;
    position:relative;

`
const  Title2 = styled.div`
    width:${props=>props.name==="Manage" ? "90px":"60px"};
    height:20px;
    background-color: white;
    font-size:20px;
    color:#4a565e;
    position: absolute;
    top:-10px;
    left:90px;
    text-align:center;
    font-weight: 700;
    display: ${props=> props.status ? "block": "none"};
`

const Room = ({ match, history,getStudyList,setStudy,study }) => {
    
    const [name,setName] = useState("Manage");

    useEffect(()=>{
        getStudyList(false);
    },[]);
    

    return(<motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}}>
        <Container>
            <SectionTitle title={"Room"} message={"Make your dreams come true with your team members."} nav={true} connect={"Room"} study={study} setStudy={setStudy} getStudyList={getStudyList} setName={setName}></SectionTitle>
            <NewCgry>
                <Title2 status={true} name={name}>{name}</Title2>
            </NewCgry> 
            <ListWrapper status={false} kind={"RoomOne"} study={study} ></ListWrapper>
        </Container>
    </motion.div>)
}

export default Room;
