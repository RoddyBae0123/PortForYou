import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
const Container = styled(Link)`
height:280px;
border-radius: 37px;
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

const Bkg = styled.div`
    background-repeat: no-repeat;
    background-size:100% auto;
    background-position: center center;
    background-image: url(${props=> props.src});
    border-radius: 37px 34px 0 0 ;
    position:relative;
`

const Info = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;   
`
const Title = styled.h1`
    font-size:40px;
    font-weight: 500;
`
const Introducing = styled.p`
    opacity:0.6;
    text-align:center;
`

const Number = styled.div`
    position:absolute;
    top:10px;
    right:20px;
    width:50px;
    height:25px;
    background-color: white;
    border-radius: 30px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.65);
    display:flex;
    justify-content: space-evenly;
    align-items: center;
`

const CateGory = styled.h5`
    color:black;
    opacity:0.3;
    font-weight:600;
    font-size:15px;
`


const RoomOne = ({study}) => {

    const src = ["https://blog.kakaocdn.net/dn/DxPyJ/btqQwmsj2wr/a4k4hul2q1rnQ3HLbxTdek/img.gif","https://blog.kakaocdn.net/dn/cGtqnJ/btquvkcb0ZQ/QVKrushncK5UguLKlnyGb0/img.gif,","https://lh3.googleusercontent.com/proxy/jgjtmL3uNQNqztIHOScJoTa2-DjeLVvg-Xst5dZcDXkxYbpF3ROQKGs-Dp4spKBv1VizwodEyUVtMiTB5yBAGpb5Oi1mPruQE2VJHu-QmDvXxspB8b2cuSj7gg","https://blog.kakaocdn.net/dn/MqO89/btq1YlgVBdP/H6Phqzfc3WwlpUr6lzWBk0/img.gif","https://static-storychat.pstatic.net/316316_13956031/89g2af1idkj6c0.gif"];
    

    const returnData = () => {

        return(study.map(e => <Container to={`/dashboard/roomdetail/${e.idx}`} >
            <Bkg src={"https://blog.kakaocdn.net/dn/cEJqbx/btqXKwaZTjt/y1OZYzoLZ8bKcpxpAeZ49K/img.gif"}>
            {/* http://3.37.208.251:8080/api/img/default?name=youtube_profile_image */}
                <Number>
                    <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                    <div style={{fontSize:15}}>{e.members}</div>
                </Number>
            </Bkg>
            <Info>
                <Title>{e.title}</Title>
                <CateGory>{e.studyCategory["title"]}</CateGory>
                <Introducing>{e.content}</Introducing>
            </Info>
        </Container>)
    )
        }
    return(study ? returnData():<div>None</div>);
    
}

export default RoomOne;
