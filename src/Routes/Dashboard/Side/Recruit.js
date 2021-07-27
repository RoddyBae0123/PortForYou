import { motion } from "framer-motion";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck} from '@fortawesome/free-solid-svg-icons';
import MdataProcessing from "../../../Components/MdataProcessing";
import ListWrapper from "../../../Components/ListWrapper";
import RecruitOne from '../../../Components/RecruitOne';
import { useState } from 'react';
import RecruitDetail from '../../../Components/RecruitDetail';

const Container = styled.div`
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    align-items:center;
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

const NewCgry = styled.div`
    border-top: 1px solid lightgray;
    width:85%;
    margin-top:45px;
    position:relative;

`
const  Title2 = styled.div`
    width:70px;
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


const Recruit = () => {

    const [popup, setPopup] = useState(true);


    return(<motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}} style={{width:"100%"}}>
        <Container>
            <MdataProcessing title={"Recruit"} message={"Let's team up and make your dreams come true."} nav={true} connect={"Recruit"}></MdataProcessing>
            <ListWrapper status={true} kind={"RecruitOne"} />
            <NewCgry>
                <Title2 status={true}>New</Title2>
            </NewCgry>
            <ListWrapper status={false} kind={"RecruitOne"} />

        </Container>
        <RecruitDetail popup={popup}></RecruitDetail>
        </motion.div>)
}


export default Recruit;