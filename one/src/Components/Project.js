import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:80%;
    border:3.5px solid #D4D4D4;
    display:flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    position:relative;
    padding:30px;
    margin-bottom:35px;
`
const Makecenter = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const SubTitle = styled.h1`
    background-color:white;
    position: absolute;
    top:-0.5rem;
    left:3.5rem;
    padding:0 7px;
    font-weight: 500;

`

const Section = styled.h1`
    font-size:24px;
    font-weight: 500;
    margin-bottom:20px;
`

const Input= styled.input`
    border:none;
    border-radius: 10px;
    width:100%;
    height:50px;
    outline: none;
    background-color: #EDEDED;
    padding:10px;
    font-size:20px;
    color:rgba(0,0,0,0.5);
    font-weight:500;
    margin-bottom:20px;

`

const Stacks = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows:1fr;
    position:relative;
    grid-gap: 15px;
`


const Button = styled.button`
    background-color: #EDEDED;
    width:100%;
    height:60px;
    border-radius: 20px;
`


const Project = ({data,detail,setDetail}) => 
    {   
        
        
        
        useEffect(()=>{
            data.map(e=>{
                
               setDetail(()=>(
                   
                [
                    {
                        idx:e.idx,
                        title:e.title,
                        content:e.content,
                        stack:e.stack
                    }
                ]))
                
            })
            return
        },[])
        
        
        const heyme = (event) => {
            if(event.target.name=="P_DESCRIPTION"){
                setDetail(()=>([
                    {   
                        content:event.target.value
                    }
    
                ]))
            }
            
        }

        return(
        <>
        {data&& detail!=undefined&& detail.map(e=>
            <Container key={e.idx}>
                
            <SubTitle>Project{e.idx}</SubTitle>
            <Section>Title</Section>
            <Input value={e.title} type="text" name="P_TITLE" />
            <Section>Description</Section>
            <Input value={e.content} type="text" name="P_DESCRIPTION" onChange={heyme}/>
            <Section>Stack</Section>
            <Stacks>
                <Makecenter>
                    <Button type="button">React</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Js</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Html</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Css</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Java</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Spring</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">C</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Java</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Spring</Button>
                </Makecenter>
            </Stacks>
        </Container>)}
        
        </>
        )
    }


export default Project;