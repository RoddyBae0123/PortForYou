import { AnimatePresence,motion } from "framer-motion";
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck,faUsers,faPlusCircle} from '@fortawesome/free-solid-svg-icons';

const DashTitle = styled.div`
    width:90%;
    height:70px;
    background-color: white;
    border-radius: 10px;
    margin:50px 0 ;

    display:grid;
    grid-template-columns: 0.8fr 0.2fr;
`
const DashContent =styled.div`
    width:90%;
    height: 73%;
    background-color: white;
    border-radius: 10px;
    display:grid;
    grid-template-columns: repeat(auto-fill,33.3%);
    
`
const Container = styled.div`
    height:100%;
    width:100%;
    display:flex;
    flex-direction: column;
    align-items:center;
    margin-top:60px;
`
const Title = styled.h1`
    font-size:35px;
    font-weight:700;
    margin-right: 20px;
`
const SubTitle = styled.h5`
    font-size:21px;
    font-weight:400;
`
const Button = styled.button`
    font-size:20px;
    color:#A2A2A2;
`

const Apply = ({ }) => {
    return(<motion.div exit={{opacity:0}} animate={{opacity:1}} initial = {{opacity:0}} style={{width:"100%"}}>
        <Container>
            <DashTitle>
                <div style={{display:"flex", flexDirection:'rows',alignItems:"center"}}>
                    <FontAwesomeIcon icon={faUserCheck} size="2x" style={{margin:"0 30px"}} />
                    <Title>Apply</Title>
                    <SubTitle style={{transform:"translateY(50%)"}}>Manage your Applyment.</SubTitle>
                </div>
                <div style={{display:"flex", flexDirection:'rows',alignItems:"center",justifyContent:"flex-end"}}>
                    <Button>
                        <FontAwesomeIcon icon={faPlusCircle} size="2x" style={{margin:"0 30px"}} />
                    </Button>
                </div>
            </DashTitle>
            <DashContent><div>apply</div><div>apply</div><div>apply</div><div>apply</div><div>apply</div><div>apply</div></DashContent>
        </Container>
        </motion.div>)
}


export default Apply;