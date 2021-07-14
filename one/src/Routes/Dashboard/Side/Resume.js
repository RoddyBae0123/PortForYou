import { motion } from "framer-motion";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faFileInvoice} from '@fortawesome/free-solid-svg-icons';
import { Table } from 'reactstrap';

import Auth from "../../../Auth";

import { useEffect } from 'react';
import Tr from '../../../Components/Tr';
import Loader from "react-loader-spinner";

const SubTitle = styled.h5`
    font-size:17px;
    font-weight:400;
    transform: translateY(50%);
    margin-left:20px;
`
const Navbar = styled.div`
    height:60px;
    background-color:#F1E2E2;
    position: fixed;
    width: calc( 100% - 220px ); 
    border-bottom:1.5px solid lightgray;
    display:grid;
    grid-template-columns: 50% 50%;
    
`
const NabvarCenter = styled.div`
    display:flex;
    flex-direction: rows;
    justify-content: ${(props)=> props.position ? "flex-start" : "flex-end"};;
    align-items: center;
`
const Container = styled.div`
    margin-top:60px;
    display: flex;
    align-items: center;
    flex-direction: column;
    
`

const SearchForm = styled.form`
    margin-left : 20px;
    display:grid;
    grid-template-columns: 1fr 0.4fr;
    height:40px;
    border-radius: 4px;
`
const Input = styled.input`
    
    outline:none;
    border:none;
    background-color: rgba(232, 191, 191, 0.74);
    font-size:20px;
`
const Submit = styled.input`    
    border:none;
    border-left:2px solid white;
    background-color: rgba(232, 191, 191, 0.74);
`
const TopInfo = styled.div`
    display:flex;
    flex-direction: rows;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    width:90%;
    margin:30px 0 ;
    /* background-color:#F3F3F3; */
`
const Title = styled.h1`
    font-size:30px;
    font-weight:700;

`  

const Button = styled.button`
    background-color: transparent;
    cursor: pointer;
    border:none;
    font-size:20px;
    color:RGB(162, 162, 162);
    
    
`


const Makecenter = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:100vh;
`


const Resume = ({data, method}) => {
    
    useEffect(() => {
        method(Auth.getAccessToken());
    },[])
    
    console.log(data)
    return(
    data? <motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}} style={{width:"100%"}}>
    
    <Container>
        <TopInfo>
            <div style={{display:"flex",flexDirection:"rows",alignItems:"center",fontSize:30}}>
                    <FontAwesomeIcon icon={faFileInvoice} size="1x" style={{margin:"0 20px 0 0"}} />
                    <Title>Resume</Title>
                    <SubTitle>Manage your Resume.</SubTitle>
            </div>
            <Button>
                        <FontAwesomeIcon icon={faPlusCircle} size="2x"  />
            </Button>
        </TopInfo>
    <Table  style={{minWidth:700}}>
      <tbody>
            <Tr data={data &&data.data}/>
      </tbody>
    </Table>
    </Container>
    </motion.div> : <Makecenter>
        <Loader type="Rings"
    color="#FF8C94"
    height={300}
    width={300}
    timeout={10000}/>
    </Makecenter>
    )
}


export default Resume;
