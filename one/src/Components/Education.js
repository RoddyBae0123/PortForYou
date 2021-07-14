import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width:80%;
    border:3.5px solid #D4D4D4;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows:1fr;
    padding:10px;
    border-radius: 20px;
    position:relative;
    margin-bottom:30px;
    box-shadow:  0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
`
const Makecenter = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    background-color: #EDEDED;
    width:85%;
    height:60px;
    border-radius: 20px;
    margin:10px;
    opacity:${props=> props.select ? "1":"0.34"};

`
const SubTitle = styled.h1`
    background-color:white;
    position: absolute;
    top:-0.5rem;
    left:3.5rem;
    padding:0 7px;
    font-weight: 500;
`

const Education = ({data,educationData,detail,setDetail}) => 
    {   
        useEffect(()=>{
            {setDetail({
                idx:data.idx,
                name:data.name,
            
            })}
            
            return
        },[])

        const selectBtnHandler = (event) => {
            const selectedId = event.target.id;
            const value = event.target.innerHTML;
            
                setDetail({
                    idx:parseInt(selectedId),
                    name:value
                })

            }
            

        return(
        <Container>
            <SubTitle>Select your Education</SubTitle>
            {detail&&educationData&& educationData.map(e=><Makecenter key={e.idx}><Button onClick={selectBtnHandler} select={detail.name===e.name}
            data-select={detail.name===e.name}type="button" id={e.idx}>{e.name}</Button></Makecenter>)}
            </Container>
        )
    }

export default Education;