import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled(Link)`
height:250px;
border-radius: 34px;
background-color: white;
box-shadow: 0px 3px 6px rgba(0,0,0,0.16) ;
margin:15px;
display:grid;
grid-template-rows: 1fr 1fr;
transition: all 300ms ease-in-out;
&:hover{
    color:black;
    transform: translateY(-5px);
    box-shadow: 0px 8px 11px rgba(0,0,0,0.24) ;
}

`
const RecruitInfo = styled.div`
display:grid;
grid-template-columns: 0.35fr 0.65fr;
`
const SomeInfo = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Position = styled.ul`
display:grid;
grid-template-columns: 1fr 1fr 1fr;
grid-auto-rows:25px;
grid-gap: 5px;
margin:10px;
`
const PositinOne = styled.li`
height:100%;
display:grid;
grid-template-columns: 0.6fr 0.4fr;
font-size:5px;
border:1px solid lightgray;
border-radius: 10px;
`
const Makecenter = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const PositionText = styled.h4`
font-size:10px;
font-weight: 400;
`
const RecruitPic = styled.img`

width:80px;
height:80px;
border-radius: 100%;
border: 1.5px solid lightgray;
`

const RecruitOne = () => {
    return (
    <Container>
        <RecruitInfo>
            <SomeInfo>
                <RecruitPic src={"https://avatars.githubusercontent.com/u/68287181?v=4"} style={{marginBottom:10}}/>
                <h3>BossName</h3>
            </SomeInfo>
            <SomeInfo>
                <h1 style={{fontSize:28,fontWeight:600,marginBottom:15}}>RoomName</h1>
                <h5 style={{fontSize:10,fontWeight:500}}>...Dummy syokai</h5>
            </SomeInfo>
        </RecruitInfo>
        <Position>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>
            <PositinOne>
                <Makecenter>
                    <PositionText>Front-end</PositionText>
                </Makecenter>
                <Makecenter>
                    <PositionText>0/3</PositionText>
                </Makecenter>
            </PositinOne>

        </Position>
    </Container>)
}

export default RecruitOne;