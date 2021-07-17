import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck,faFileInvoice,faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import { GroupAddSharp } from '@material-ui/icons';


const Container = styled.div`   
    display:grid;
    grid-template-columns: repeat(auto-fill,33.3%);
    background-color: #F5F5F5;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    width:85%;
`

const RecruitList = () => {

    return(<Container>
        <div style={{height:300}}>yoyo</div>
        <div style={{height:300}}>yoyo</div>
        <div style={{height:300}}>yoyo</div>
        <div style={{height:300}}>yoyo</div>
        <div style={{height:300}}>yoyo</div>
        <div style={{height:300}}>yoyo</div>
        <div style={{height:300}}>yoyo</div>
        <div style={{height:300}}>yoyo</div>



    </Container>)
}

export default RecruitList;