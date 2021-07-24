import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Section from '../../../Components/Section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faTimes,faAngleDown,faAngleUp} from '@fortawesome/free-solid-svg-icons';
import Popup from 'reactjs-popup';
import {portFolioApi} from "../../../Api";

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    
`
const Makecenter = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100vh;
`
const Navbar = styled.div`
    height:70px;
    width:85%;
    border-bottom:1px solid #B6B6B6;

`
const NavBtn = styled.button`
    width:15%;
    height:100%;
    border-bottom:3px solid ${props=> props.picked ? "#B6B6B6" :"white"};
    opacity: ${props=> props.picked ? 1 :0.3};
    font-weight:500;
    font-size:20px;
    transition:all 300ms ease-in-out;
    transform:translateY(5%);

`

const MemberData = styled.div`
    width:85%;
    margin:20px 0 ;
`
const RruCreateBtn = styled.button`
    height:230px;
    border-radius:20px;
    box-shadow: 0 3px 6px lightgray;
    width:100%;
    margin-top:30px;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items:center;
    color:lightgray;
    font-weight: 500;
    font-size:30px;
    transition: all 300ms ease-in-out;
    &:hover{
    color:black;
    transform: translateY(-5px);
    box-shadow: 0px 8px 11px rgba(0,0,0,0.24) ;
}

` 
const PopupBkg = styled.div`
    position:fixed;
    height:100vh;
    top:0;
    left:0;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    z-index:300;
    background-color: rgba(0,0,0,0.1);
    display:${props => props.status ? "flex" : "none"};
  
`
const PopupUser = styled.form`
    width:900px;
    height:680px;
    background-color: white;    
    border-radius:25px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16) ;
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    position:relative;
`
const DelpopupBtn = styled.button`
    background-color: transparent;
    position:absolute;
    right:15px;
    top:15px;
    font-size:20px;
    color:lightgray;
    &:hover{
        color:black;
    }
    transition: all 200ms ease-in-out;

`
const RoomInput = styled.textarea`
    width:100%;
    height: 50px;
    background-color:RGB(238,238,238);;
    border:none;
    outline:none;
    font-size:17px;
    font-weight:500;
    padding:10px;
    &:focus{
        background-color:RGB(244, 248, 247);
    }
    transition: all 300ms ease-out;
    resize: none;

`
const CreateRecruitTitle = styled.h1`
    font-size:50px;
    font-weight:700;

`
const PositionList = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows:1fr;
    grid-gap:20px;
    overflow-Y:scroll;
    height:160px;
`
const PositionBtn = styled.button`
    width:100%;
    height:50px;
    background-color:white;
    box-shadow:  0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
    border-radius: 20px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    font-size:7px;

`
const PositionValue = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:12px;
    height:100%;
    font-weight: 500;

`
const InputNumber = styled.div`
    display:grid;
    grid-template-columns: 0.5fr 0.5fr;
    height:100%;

`
const InputUpDown = styled.div`
    display:grid;
    grid-template-rows: 1fr 1fr;
    
`
const UpDownBtn = styled.button`
    border:none;
    background-color:transparent;
    font-size:20px;
    &:hover{
        transform: scale(1.2,1.2);
    }
    transition: transform 300ms ease;
`



const Member = ({getPositionList,position}) => {

    const [picked,setPicked] = useState({
        first:true,
        second:false
    });
    useEffect(()=> {
        getPositionList();
    },[])
    const UpHandler = (e) => {
        e.preventDefault();
    }
    const PositionBtnHandler = (e)=> {
        {e.target.dataset.type==="father"|| e.target.dataset.type==="value" ? console.log("father") : console.log("son")}
        
    }
    const small = ()=> {
        console.log("small");
    }
    return( <motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}} style={{width:"100%"}}>
        <Container>
        <Section title={"Member"} message={"Let's team up and make your dreams come true."} nav={false} />
        <Navbar>
            <NavBtn picked={picked["first"]}>Members</NavBtn>
            <NavBtn picked={picked["second"]}>Recruit</NavBtn>
        </Navbar>
        <MemberData>
            <RruCreateBtn >
                <h2>Apply Recruit of your room </h2>
                <FontAwesomeIcon icon={faPlusCircle} style={{fontSize:50}}/>
            </RruCreateBtn>
        </MemberData>
        
    </Container>
    <PopupBkg status={true}>
        <PopupUser>
            <DelpopupBtn>
                <FontAwesomeIcon style={{fontSize:35}} icon={faTimes} />
            </DelpopupBtn>
            <CreateRecruitTitle>Create Recruit</CreateRecruitTitle>
            <div style={{width:"70%"}}>
                <label style={{marginBottom:15,fontSize:23,fontWeight:500}}>Title</label>
                <RoomInput data-kind={0} placeholder="Please enter at least two characters."></RoomInput>
            </div>
            <div style={{width:"70%"}}>
                <label style={{marginBottom:15,fontSize:23,fontWeight:500}}>Description</label>
            <RoomInput data-kind={1}  style={{height:150}}  placeholder="Please enter at least ten characters.
    "></RoomInput>
        </div> 
        <div style={{width:"70%"}} >
        <label style={{marginBottom:15,fontSize:23,fontWeight:500}}>Position</label>
                <PositionList>
                    {position&&position.map(e=><PositionBtn key={e.idx} type="button" onClick={PositionBtnHandler} data-type="father">
                        <PositionValue>{e.name}</PositionValue>
                        <InputNumber>
                            <PositionValue data-type="value">1</PositionValue>
                            <InputUpDown>
                                <UpDownBtn type="button"  data-type="son"><FontAwesomeIcon icon={faAngleUp}/></UpDownBtn>
                                <UpDownBtn type="button"  data-type="son"><FontAwesomeIcon icon={faAngleDown}/></UpDownBtn>
                            </InputUpDown>
                        </InputNumber>
                    </PositionBtn>)}
                    
                   

                </PositionList>
        </div>
        </PopupUser>
    </PopupBkg>
    </motion.div>)
}

export default Member;