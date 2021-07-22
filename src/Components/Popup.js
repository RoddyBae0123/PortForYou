import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTimes} from '@fortawesome/free-solid-svg-icons';

const PopupBkg = styled.div`
    position:fixed;
    height:100vh;
    top:0;
    left:0;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:100%;
    z-index:300;
    background-color: rgba(0,0,0,0.1);
    display:${props => props.status ? "flex" : "none"};
`
const PopupUser = styled.div`
    width:500px;
    height:450px;
    background-color: white;    
    border-radius:25px;
    box-shadow: 0px 3px 6px rgba(0,0,0,0.16) ;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position:relative;
`
const DelpopupBtn = styled.button`
    background-color: transparent;
    position:absolute;
    right:15px;
    top:15px;
    font-size:20px;
    color:lightgray;
    &:hover{
        color:black;
    }
    transition: all 200ms ease-in-out;

`

const Popup = ({status,component}) => 

    <PopupBkg status={status}>
        <PopupUser>
            <DelpopupBtn >
                <FontAwesomeIcon style={{fontSize:35}} icon={faTimes} />
            </DelpopupBtn>
        </PopupUser>
    </PopupBkg>

export default Popup;