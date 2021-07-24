import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoice,faTimes} from '@fortawesome/free-solid-svg-icons';
import { GroupAddSharp, TrainRounded } from '@material-ui/icons';
import {faCodepen} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import wifi from "../wifi";
import Auth from "../Auth";
import HowToRegIcon from '@material-ui/icons/HowToReg';

const Container = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-top: 50px ;
    
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
    margin-bottom:50px;
`
const Navbar = styled.div`
    height:70px;
    width:85%;
    transform:translateY(5%);
    display: ${props => props.nav ? "grid" : "none"};
    grid-template-columns: 1fr 1fr;
    border-bottom:${props => props.nav ? "1px solid lightgray": "none"};
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
const CreateRoomBtn = styled.button`
    width:70px;
    height:30px;
    border:1px solid #B6B6B6;;
    border-radius:10px;
    color:#B6B6B6;;
    font-weight:500;
    font-size:12px;
    &:hover{
        color:white;
        background:#B6B6B6;;
    }
    transition:all 300ms ease-in-out;
    display:${props=>props.connect==="Recruit"?"none":"flex"};    
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right:30px;
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
    width:800px;
    height:650px;
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
const CreateRoomTitle = styled.h1`
    font-size:50px;
    font-weight:700;

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
const Select = styled.select`
    width:100%;
    height: 50px;
    background-color:RGB(238,238,238);;
    border:none;
    outline:none;
    font-size:35px;
    font-weight:500;
    padding:10px;
    &:focus{
        background-color:RGB(244, 248, 247);
    }
    transition: all 300ms ease-out;
    font-size:17px;

` 
const SubmitButton =styled.input`
    width:25%;
    height:50px;
    border-radius:20px;
    &:hover{
        background-color:#4a565e;
        color:white;
    }
    border: 5px solid #4a565e;
    font-weight:500;
    transition: all 300ms ease-out;
    color:#4a565e;
    opacity:${props=> props.status ? 0.1:1};
    pointer-events:${props=> props.status ? "none":"auto"};
`

const MdataProcessing = ({title,message,nav,connect,getStudyList,setName}) => {

    useEffect(()=>{
        if(connect="Room"){
            getCategoryList();
        }
    },[])
   
    const [picked,setPicked] = useState({
        first:true,
        second:false,
        third:false
    })
    const [popup,setPopup] = useState(false);
    const [room, setRoom] = useState({
        title:"",
        content:"",
        studyCategory:{
            idx:""
        }
    })
    const [catgry ,setCatgry] =useState();
    const [disabled,setDisabled] =useState(true);

    useEffect(()=>{
            
            {(room&&room["title"].length>2 && room["content"].length>10&&room["studyCategory"].idx )? setDisabled(false):setDisabled(true)}
            console.log(disabled);
    },[room])
    const body = document.querySelector("body");

    const changeTitle = ()=>{switch (title) {
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
        case "Member":
            return(<HowToRegIcon style={{fontSize:100}}></HowToRegIcon>)
            return   
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
        

    }

    const RoomBtnHandler = (e) => {
        setPopup(e);
        if(e){
            body.style.overflow = "hidden";
        }
        else{
            body.style.overflow = "auto";

        }
        setRoom({
            title:"",
            content:"",
            studyCategory:{
                idx:""
            }
        })
            
    }
    const SubmitBtnHandler= (e) =>{
        console.log(e);
        e.preventDefault();
        const api = axios.create({
            baseURL:`${wifi}`,
            headers:{
                "Authorization":`Bearer ${Auth.getAccessToken()}`
            }
        });
        api.post('/api/user/study',room)
        .then(res=>{
            {res&&getStudyList(false)}
            RoomBtnHandler(false);
            setRoom({
                title:"",
                content:"",
                studyCategory:{
                    idx:""
                }
            });
        })
        .catch(e=>console.log(e))
    }
    const setRoomValue = (e) => {
        if(e.target.dataset.kind==="0"){
            setRoom({
                title:e.target.value,
                content:room["content"],
                studyCategory:{
                    idx:room["studyCategory"].idx
                }
            })
        }
        else if (e.target.dataset.kind==="1"){
            setRoom({
                // e.target.value
                title:room["title"],
                content:e.target.value,
                studyCategory:{
                    idx:room["studyCategory"].idx
                }
            })
        }
        else{
            setRoom({
                // e.target.value
                title:room["title"],
                content:room["content"],
                studyCategory:{
                    idx:e.target.value
                }
            })
        }
        

    }

    const getCategoryList = ()=> {
        const api = axios.create({
            baseURL:`${wifi}`,
            headers:{
                "Authorization":`Bearer ${Auth.getAccessToken()}`
            }
        });
        api.get('/api/user/study/categories')
        .then(res=>{
            {res&&setCatgry(res.data)}
        })
        .catch(e=>console.log(e));

    }
    
    
    return(<><Container nav={nav}>
        <Title>       
        {changeTitle()}
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
                <CreateRoomBtn onClick={()=>RoomBtnHandler(true)} connect={connect}>Create</CreateRoomBtn>
            </div>
            
        </Navbar>
    </Container>
    <PopupBkg status={popup}>
        <PopupUser onSubmit={SubmitBtnHandler}>
            <DelpopupBtn type="button" onClick ={()=>RoomBtnHandler(false)} >
                <FontAwesomeIcon style={{fontSize:35}} icon={faTimes} />
            </DelpopupBtn>
        <CreateRoomTitle>Create Room</CreateRoomTitle>
        <div style={{width:"70%"}}>
            <label style={{marginBottom:15,fontSize:23,fontWeight:500}}>Title</label>
            <RoomInput data-kind={0}onChange={setRoomValue} value={room.title} placeholder="Please enter at least two characters.
"></RoomInput>
        </div>
        <div style={{width:"70%"}}>
            <label style={{marginBottom:15,fontSize:23,fontWeight:500}}>Description</label>
            <RoomInput data-kind={1} onChange={setRoomValue} style={{height:150}} value={room.content} placeholder="Please enter at least ten characters.
"></RoomInput>
        </div>
        <div style={{width:"70%"}}>
            <label style={{marginBottom:15,fontSize:23,fontWeight:500}}>Category</label>
            <Select data-kind={2} onChange={setRoomValue} value={room.studyCategory["idx"]}>
                <option value="">--Please choose an option--</option>
                {catgry&&catgry.map(e=><option key ={e.idx}value={e.idx}>{e.title}</option>)}
                
            

            </Select>
        </div>
        <SubmitButton type="submit" status={disabled} disabled={disabled} value="Create"></SubmitButton>
        </PopupUser>
    </PopupBkg>
    </>
    )
}

export default MdataProcessing;