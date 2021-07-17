import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck,faFileInvoice,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { GroupAddSharp } from '@material-ui/icons';

const Container = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin: 50px 0 ;
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
`


const SectionTitle = ({title,message}) => {

    const d = ()=>{switch (title) {
        case "Recruit":
            return(<GroupAddSharp style={{fontSize:150}}></GroupAddSharp>)
            break;
        case "Resume":
            return(<FontAwesomeIcon icon={faFileInvoice} size="1x" style={{fontSize:100}} />
            )
             break;
        case "C":
            return(<FontAwesomeIcon icon={faPlusCircle} size="2x" />)
             break;     
        default:
            break;
    }}


    return(<Container>
        <Title>       
        {d()}
        <TitleHead>{title}</TitleHead>
        </Title>
        <Add>{message}</Add>
    </Container>)
}

export default SectionTitle;