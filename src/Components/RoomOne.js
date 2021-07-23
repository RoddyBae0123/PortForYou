import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
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

    const src = ["https://blog.kakaocdn.net/dn/DxPyJ/btqQwmsj2wr/a4k4hul2q1rnQ3HLbxTdek/img.gif","http://file3.instiz.net/data/cached_img/upload/2020/12/13/0/7ed6204dbd625e1542ac2a07d08e8505_mp4.gif","https://thumbs.gfycat.com/AnguishedPleasantDormouse-size_restricted.gif","https://4.bp.blogspot.com/-SMhgPXD3dI0/XK76cyEwo2I/AAAAAAAAAtM/dHPqpjRaHGIFvSvEwqZCsMYUmTnVO7W6ACLcBGAs/s1600/99F1663C5CAEEFC627D758.gif","https://static-storychat.pstatic.net/316316_13956031/89g2af1idkj6c0.gif","http://2.bp.blogspot.com/-lMeWST7dARQ/XKsfeke4LzI/AAAAAAAA6t0/XQkjB1udsQozhIOBd9zRyln77as_YXfmQCLcBGAs/s1600/1.gif","https://3.bp.blogspot.com/-JZw_bffcevI/XLnOn51lYSI/AAAAAAAA19I/v2KBuUJJddQPhGeHfEfSV_96u9JTUTF9wCLcBGAs/s1600/Honeycam%2B2019-04-19%2B22-17-47.gif"];
    

    const returnData = () => {
        var i =0;
        return(study.map(e => <Container to={`/dashboard/roomdetail/${e.idx}`} >
            <Bkg src={src[i++]}>
            {/* http://3.37.208.251:8080/api/img/default?name=youtube_profile_image */}
                <Number>
                    <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>
                    <div style={{fontSize:15}}>{e.members}</div>
                </Number>
            </Bkg>
            <Info>
                <Title>{e.title.length>12 ?`${e.title.substring(0,12)}...`:e.title}</Title>
                <CateGory>{e.studyCategory["title"]}</CateGory>
                <Introducing>{e.content}</Introducing>
            </Info>
        </Container>)
    )
        }
    return(study ? returnData():<div>None</div>);
    
}

export default RoomOne;
