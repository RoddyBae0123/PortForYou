import styled from 'styled-components';
import StarRatings from 'react-star-ratings';
import { useEffect } from 'react';
import { faPython } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
    width:80%;
    border:3.5px solid #D4D4D4;
    display:grid;
    grid-template-columns: 0.2fr 0.5fr 0.2fr 0.1fr;
    border-radius: 20px;
    position:relative;
    padding:10px;
    height:130px;
    margin-bottom: 50px;
    column-gap: 10px;
    
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


const StackLogo = styled.div`
    width:100px;
    height:100px;
    border-radius:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    background-color: #EDEDED;
    margin-right:40px;

`
const Logo = styled.div`
    width:50px;
    height:50px;
    font-size:40px;
    border-radius: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color:RGB(255, 140, 148);

`

const LogoName = styled.h3`
    font-size:25px;
    font-weight: 600;

`
const Score = styled.h5`
    font-size:50px;
    font-weight:500;
    margin:10px 0;
`

const Input = styled.input`
    width:100%;
    height:100%;
    outline: none;
    background-color: white;
    border:3.5px solid rgb(212, 212, 212);;
`

const Stack = ({data,stackData,detail,setDetail}) => 
    {   
        
        var someStack = [];
        const copyData =[];

        useEffect(()=>{
            data.map(e=>{
                copyData.unshift({
                    idx:e.idx,
                    content:e.content,
                    stackIdx:e.stackIdx
                })
            })
            setDetail(copyData);
            return
        },[])
        return(<>
            {detail&&detail.map(e=> <Container>
            <LogoStructure>
                <Makecenter>
                    <Logo><FontAwesomeIcon icon={faPython} ></FontAwesomeIcon></Logo>
                
                </Makecenter>
                <LogoName style={{textAlign:"center"}}>Python</LogoName>
            </LogoStructure>
            <Input type="text" />
            <Makecenter><StarRatings
          rating={e.idx}
          starRatedColor="blue"
          numberOfStars={5}
          name='rating'
          starSpacing="3px"
          starDimension="20px"
        />
        <Score>{`${e.idx}/5`}</Score>
        </Makecenter>
        
            <div>{e.stackIdx}</div>

        </Container>)}
            
        
        
        </>
        )
    }


export default Stack;