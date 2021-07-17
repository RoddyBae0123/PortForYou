import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faTrashAlt,faTrashRestore} from '@fortawesome/free-solid-svg-icons';
import wifi from '../wifi';
const Container = styled.div`
    width:80%;
    border:3.5px solid #D4D4D4;
    display:grid;
    grid-template-columns: 0.2fr 0.6fr 0.2fr ;
    border-radius: 20px;
    position:relative;
    padding:10px;
    height:150px;
    margin-bottom: 15px;
    column-gap: 10px;
    position:relative;
    box-shadow:  0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);

`
const Makecenter = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const LogoStructure = styled.div`
    display:grid;
    grid-template-rows: 0.7fr 0.3fr;
    border-right:3.5px solid RGB(212, 212, 212);
`
const SubTitle = styled.h1`
    background-color:white;
    position: absolute;
    top:-0.5rem;
    left:3.5rem;
    padding:0 7px;
    font-weight: 500;

`

const Logo = styled.div`
    width:70px;
    height:70px;
    font-size:40px;
    border-radius: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:white;
    border:3.5px solid RGB(212, 212, 212);
    box-shadow:0 3px 6px rgba(149,157,165,0.15);
`

const LogoName = styled.h3`
    font-size:25px;
    font-weight: 600;

`

const Input = styled.textarea`
    width:100%;
    height:100%;
    outline: none;
    background-color: white;
    border-radius: 15px;
    font-weight: 500;
    border: 3.5px solid #D4D4D4;
    padding:10px;
    resize: none;
    
`


const Addul = styled.ul`
    width:80%;
    background-color: white;
    border-radius: 20px;
    border: 3.5px solid #D4D4D4;
    display:flex;
    justify-content: space-around;
    align-items: center;
    height:150px;
    margin-bottom: 15px;
    position: relative;
    display:${props => props.status ? "flex":"none" };
`

const Addli = styled.li`
    width:60px;
    height:60px;
    border-radius: 100%;
    border:3.5px solid RGB(255,140,148);
    display:flex;
    justify-content: center;
    align-items: center;

`
const CreateStack = styled.button`
    width:100%;
    height:100%;
    border:none;
    cursor:pointer;
    

`

const DeleteButton = styled.button`
    position:absolute;
    right:13px;
    top:10px;
    width:50px;
    height:20px;
    border-radius: 10px;
    background-color:white;
    font-size:15px;
    &:hover{
        background-color: RGB(255, 140, 148);
    }
    transition: all 300ms ease;
    border:1px solid  RGB(255, 140, 148);

`   

const AddBtn = styled.button`
    width:230px;
    height:60px;
    border-radius: 20px;
    font-weight: 600;
    font-size:20px;
    background-color:white;
    border:3.5px solid  RGB(255, 140, 148);
    display:${props => props.status ? "none": "block"};
    &:hover{
        background-color: RGB(255, 140, 148);
    }
    transition: all 300ms ease;
    margin: 30px 0 150px 0;

`




const Stack = ({data,stackData,detail,setDetail}) => 
    {   
        
        var someStack = [];
        const copyData =[];
        const [currentStack,setCurrentStack]=useState();
        const [hideAdd,setHideAdd] =useState(false);
        useEffect(()=>{
            const current=[]
            data.map(e=>{
                copyData.unshift({
                    idx:e.idx,
                    content:e.content,
                    stackIdx:e.stackIdx,
                    ability:e.ability
                })
                current.unshift({idx:e.stackIdx})
            })
            var copyStackData = [...stackData];
            current.map(t=> copyStackData = copyStackData.filter(e=>e.idx!=t.idx));
            setCurrentStack(copyStackData);
            
            setDetail(copyData);
            return
        },[])

        const inputHandler = (e) => {
            const {value,id}= e.target;
            let copyDetail = [...detail];
            copyDetail[id].content=value;
            setDetail(copyDetail);

        }

        const delBtnHandler = (e) => {
            const DelId = e.target.parentElement.id;
            let copyDetail=[...detail];
            copyDetail=copyDetail.filter(e=>e.idx!=DelId);
            setDetail(copyDetail);
            var copyStackData = [...stackData];
            copyDetail.map(e=>{
                copyStackData=copyStackData.filter(t => t.idx!=e.stackIdx);
            })
            setCurrentStack(copyStackData);
        }

        const AddBtnHandler= (e) => {
            setHideAdd(true);
        }

        const ChoiceStackBtnHandler = (e) => {
            const copyDetail = [...detail];
            copyDetail.push({
                content:"",
                stackIdx:parseInt(e.target.id),
                idx:copyDetail.length ? copyDetail.length+1 : 0,
                ability:0
            })
            setDetail(copyDetail);
            var copyStackData = [...stackData];
            copyDetail.map(e=>{
                copyStackData=copyStackData.filter(t => t.idx!=e.stackIdx);
            })
            setCurrentStack(copyStackData);
            setHideAdd(false);
        }

        const changeRating = (newRating, name)=> {
            const copyDetail = [...detail];
            copyDetail[name].ability=newRating;
            setDetail(copyDetail);

        }
        return(<>
            {detail&&detail.map((e,idx)=> <Container key={e.idx} id={e.idx}>
            <DeleteButton type="button" onClick={delBtnHandler}><FontAwesomeIcon id={e.idx} icon={faTrash}></FontAwesomeIcon></DeleteButton>
            <LogoStructure>
                <Makecenter>
                    <Logo><img src={`${wifi}api/img/default?name=${stackData[e.stackIdx-1].name}`} style={{width:"70%"}}></img></Logo>
                
                </Makecenter>
                <LogoName style={{textAlign:"center"}}>{stackData[e.stackIdx-1].name}</LogoName>
            </LogoStructure>
            <Input type="text" value={e.content} onChange={inputHandler} id={idx} >
            </Input>
            <Makecenter style={{borderLeft:"3.5px solid RGB(212, 212, 212)"}}><StarRatings
          rating={e.ability}
          starRatedColor="RGB(255, 140, 148)"
          numberOfStars={5}
          starSpacing="5px"
          starDimension="20px"
          changeRating={changeRating}
          name={`${idx}`}

        />
        </Makecenter>
        

        </Container>)}
            
        <Addul status={hideAdd}>
            <SubTitle>Select your Stack</SubTitle>
            {currentStack&& currentStack.map(e=><Addli key={e.idx}><CreateStack type="button" onClick={ChoiceStackBtnHandler} id={e.idx}>{e.name}</CreateStack></Addli>)}
            
            
           
            

        </Addul>
        <AddBtn status={hideAdd} type="button" onClick={AddBtnHandler}>Add Stack</AddBtn>

        </>
        )
    }


export default Stack;