import styled from 'styled-components';
import Auth from "../../../Auth";
import axios from 'axios';
import wifi from '../../../wifi';
import { useEffect, useState } from 'react';
import Loader from "react-loader-spinner";
import Select from '../../../Components/Select';
import Project from '../../../Components/Project';
import Stack from '../../../Components/Stack';
import Education from '../../../Components/Education';
import { motion } from "framer-motion";

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
    position:relative;
`

const UserInfo  = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    margin:70px 0;
    width:100%;
    height:150px;
`
const UserSection= styled.div`
    display:flex;
    justify-content:${props=> props.data ? `flex-end` : `flex-start`};
    align-items: center;
    border-right:${props=> props.data ? `3.5px solid RGB(212, 212, 212)` : `none`};
    padding:${props=> props.data ? `0 95px 0 0` : `0 0 0 95px`};

`
const UserTitle = styled.div`
    display:flex;
    justify-content:space-between ;
    flex-direction: column;
    text-align:center;
    align-items: center;
`
const UserFace = styled.div`
    width:130px;
    height:130px;
    border:7px solid black;
    border-radius: 16px;
`
const SectionTitle = styled.div`
    display:flex;
    font-size:40px;
    font-weight:600;
    align-items:center;
    width:80%;
    margin:0 0  30px 0;
`

const SubmitBtnHandler = styled.button`
    position:absolute;
    top:20px;
    right:20px;
    width:60px;
    height:30px;
    background-color:white;
    border:1.8px solid #D4D4D4;
    border-radius: 5px;
    font-size:5px;
    box-shadow:0 3px 6px rgba(149,157,165,0.15);

`
const TitleInput = styled.input`
    outline: none;
    border: 3.5px solid white;
    width:400px;
    height:60px;
    border-radius: 10px;
    font-size:40px;
    font-weight:700;
    margin-bottom:20px;
    transition: border 300ms ease-out;
    &:focus{
        border-color: lightgreen;
    }
    text-align:center;
`
const ContentInput = styled.input`
    outline: none;
    border: 3.5px solid white;
    width:300px;
    height:60px;
    border-radius: 5px;
    font-size:20px;
    font-weight:700;
    margin-bottom:20px;
    transition: border 300ms ease-out;
    &:focus{
        border-color: lightgreen;
    }
    text-align:center;

`

const ResumeDetail = ({match}) => {
    
    useEffect(()=>{
        let mounted = true;
        if(mounted){
            getResumeDetail(accessToken,Idx);
            getStackList();
            getPositionList();
            getEducationList();
        }
        
        return () => (mounted =false);
        
    },[]);

    const [main,setMain] = useState();
   
    const Idx=match.params.idx;
    const accessToken = Auth.getAccessToken();
    const [data,setData] = useState(false); //Entire Data
    const [project,setProject]= useState(); //Entire Data.project Data
    
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
            setMain({
                title:res.data.title,
                content:res.data.content
            })
        }).catch((e)=>console.log(e))
      }
    const [stackData ,setStack] =useState(undefined);//project Data=>stack data of project
    const getStackList= async() =>{
            const api = await axios.create({
                baseURL:`${wifi}`
            });
            api.get(`/api/user/portfolio/stacks`)
            .then(res=>
                setStack(res.data)) 
            .catch(e=> console.log(e))
    }
    
    const [positionData,setPositionData] = useState(undefined);//position Data=>position List
    const getPositionList= async() =>{
        const api = await axios.create({
            baseURL:`${wifi}`
        });
        api.get(`/api/user/portfolio/positions`)
        .then(res=>
            setPositionData(res.data))
        .catch(e=> console.log(e))
        }
    const [position,setPosition] = useState(undefined);

    const [educationData,setEducationData] = useState(undefined);
    const getEducationList =async()=>{
        const api = await axios.create({
            baseURL:`${wifi}`
        });
        api.get(`/api/user/portfolio/educations`)
        .then(res=>
            setEducationData(res.data))
        .catch(e=>console.log(e))
    }
    const [education,setEducation] = useState(undefined);

    const [stackList,setStackList]= useState([]);
    
    const [stackNew,setStackNew] = useState(undefined);
    const show = () => {
        console.log(project,position,education,stackNew);
        setResumeList(Auth.getAccessToken());
    }
    const setResumeList = async(token) => {
        const api = await axios.create({
        baseURL:`${wifi}`
        });
        api.post('/api/user/portfolio',{
            headers:{
                "Authorization":`Bearer ${token}`,
            
            },
            data:{
                "title": 'test portfolio endpoint',
                "content": "so boring tasks ever",
                "project":[
                    
                        ...project
                          
                ],
                "positions":[{
                    "idx":position.idx
                }],
                "tech" :[
                    ...stackNew
                ],
                "education": {
                    "idx":education.idx
                }
            }
        }).then((res)=>{
            setData(res);
        }).catch((e)=>console.log(e))
      }

    const mainHandler = (e) => {
        const {target,target:{value,name}} = e;
        {name==="title" ? setMain({
            title:value,
            content:main.content
        }):setMain({
            title:main.title,
            content:value
        })}
        
        
    }

    return(data&&main ? (<motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}} style={{width:"100%"}}><div style={{marginTop:"60px"}}>
        <Container>
        <SubmitBtnHandler type="button" onClick={show}>Submit</SubmitBtnHandler>
        <UserInfo>
        <UserSection data={1}>
            <UserTitle>
                <TitleInput placeholder="Plz Enter Title (2-15)" name="title" value={main.title} onChange={mainHandler} />
                <ContentInput placeholder="Plz Enter Content (2-10)" style={{fontWeight:"400"}} name="content" value={`${main.content}`} onChange={mainHandler} />
                </UserTitle>
            </UserSection>
        <UserSection ><UserFace /></UserSection>
        </UserInfo>
            <SectionTitle><h1 style={{margin:"30px 0"}}>Position</h1></SectionTitle> 
            <Select data={data.data.positions} positionData={positionData} detail={position} setDetail={setPosition}/>
            <SectionTitle><h1 style={{margin:"30px 0"}}>Education</h1></SectionTitle>
            <Education data={data.data.education} educationData={educationData} detail={education} setDetail={setEducation}/> 
            <SectionTitle><h1 style={{margin:"30px 0"}}>Project</h1></SectionTitle>
            <Project data={data.data.project} setDetail={setProject} detail={project}  stackData={stackData} />
            <SectionTitle><h1 style={{margin:"30px 0"}}>Stack</h1></SectionTitle>
            <Stack data={data.data.tech} stackData = {stackData}detail={stackNew} setDetail={setStackNew}/>
            
        </Container>
    </div></motion.div>) : <Makecenter>
        <Loader type="Rings"
    color="#FF8C94"
    height={300}
    width={300}
    timeout={10000}/>
    </Makecenter>)
}


export default ResumeDetail;
