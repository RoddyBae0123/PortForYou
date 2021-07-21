import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { GroupAddSharp } from '@material-ui/icons';
import {faCodepen} from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px ;
    border-bottom:${props => props.nav ? "1px solid lightgray": "none"};
    width:100%;
`

const Title = styled.div`
    width:500px;
    justify-content:space-around;
    height:150px;
    align-items: center;
    display:flex;
    font-size:100px;
`
const TitleHead = styled.h1`
    font-size:70px;
    font-weight:600;
    display: inline;
`
const Add = styled.h4`
    font-size:22px;
    font-weight:400;
    opacity:0.5;
    margin-bottom:35px;
`
const Navbar = styled.div`
    height:70px;
    width:100%;
    transform:translateY(5%);
    display: ${props => props.nav ? "grid" : "none"};
    grid-template-columns: 1fr 1fr;
`
const NavBtn = styled.button`
    width:30%;
    height:100%;
    border-bottom:3px solid ${props=> props.picked ? "#B6B6B6" :"white"};
    opacity: ${props=> props.picked ? 1 :0.3};
    font-weight:500;
    font-size:20px;
    transition:all 300ms ease-in-out;
`

const SearchForm = styled.form`
    margin-right : 20px;
    display:${props=>props.connect==="Recruit"?"grid":"none"};
    grid-template-columns: 230px 40px;
    height:40px;
    border-radius: 4px;

`
const Input = styled.input`
    
    border: 1px solid lightgray;
    outline: none;
    background-color: white;
    font-size: 20px;
    border-radius: 10px 0 0 10px;
    border-right: none;
    box-shadow: 1px 1px 5px lightgray;

`
const Submit = styled.input`    
    border:1px solid lightgray;
    border-radius: 0 10px 10px 0 ;
    background-color: white;
    box-shadow: 1px 1px 5px lightgray;

`




const SectionTitle = ({title,message,nav,connect,study,setStudy,getStudyList,setName}) => {

    const [picked,setPicked] = useState({
        first:true,
        second:false,
        third:false
    })

    const d = ()=>{switch (title) {
        case "Recruit":
            return(<GroupAddSharp style={{fontSize:150}}></GroupAddSharp>)
            break;
        case "Resume":
            return(<FontAwesomeIcon icon={faFileInvoice} size="1x" style={{fontSize:100}} />
            )
             break;
        case "Room":
            return(<FontAwesomeIcon icon={faCodepen} size="1x" style={{fontSize:100}}/>)
             break;     
        default:
            break;
    }}

    const GobtnHandler = (e) => {



        if(e.target.dataset.connect!=="Recruit" &&e.target.dataset.number==2){
            getStudyList(true);
            setPicked({
                first:false,
                second:true,
                third:false
            })
            setName("Join");

        }
        else if(e.target.dataset.connect!=="Recruit" &&e.target.dataset.number==1){
            getStudyList(false);
            setPicked({
                first:true,
                second:false,
                third:false
            })
            setName("Manage");

        }
        else{
        }

    }





    return(<Container nav={nav}>
        <Title>       
        {d()}
        <TitleHead>{title}</TitleHead>
        </Title>
        <Add>{message}</Add>
        <Navbar nav={nav}>
            <div>
            <NavBtn picked={picked["first"]} onClick={GobtnHandler} data-connect={connect} data-number={1}>{connect==="Recruit" ? "Recommend" : "Manage"}</NavBtn>
            <NavBtn onClick={GobtnHandler} data-connect={connect} data-number={2} picked={picked["second"]}>{connect==="Recruit" ? "New" : "Joined"}</NavBtn>
            <NavBtn picked={picked["third"]} >{connect==="Recruit" ? "Imminent" : "Status"}</NavBtn>
            </div>
            <div style={{display:"flex", justifyContent:"flex-end",alignItems:"center"}}>
                <SearchForm connect={connect}>
                    <Input type="text"></Input>
                    <Submit type="submit" value="&#128269;"></Submit>
                </SearchForm>
            </div>
            
        </Navbar>
    </Container>)
}

export default SectionTitle;