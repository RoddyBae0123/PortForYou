import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import wifi from '../wifi';
const Container = styled.div`
    width:80%;
    border:3.5px solid #D4D4D4;
    display:flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 20px;
    position:relative;
    padding:30px;
`
const Makecenter = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`


const SubTitle = styled.h1`
    background-color:white;
    position: absolute;
    top:-0.5rem;
    left:3.5rem;
    padding:0 7px;
    font-weight: 500;

`

const Section = styled.h1`
    font-size:24px;
    font-weight: 500;
    margin-bottom:20px;
`

const Input= styled.input`
    border:none;
    border-radius: 10px;
    width:100%;
    height:50px;
    outline: none;
    background-color: #EDEDED;
    padding:10px;
    font-size:20px;
    color:rgba(0,0,0,0.5);
    font-weight:500;
    margin-bottom:20px;

`

const Stacks = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows:1fr;
    position:relative;
    grid-gap: 15px;
`


const Button = styled.button`
    background-color: #EDEDED;
    width:100%;
    height:60px;
    border-radius: 20px;
`

const StackInfo = styled.div`
    padding:20px;
    display: grid;
    grid-template-columns:1fr 1fr;
`

const StackSection= styled.div`
    display:flex;
    justify-content:${props=>props.data ? "flex-end": "flex-start"};
    align-items: center;
    border-right:${props=> props.data ? `3.5px solid RGB(212, 212, 212)` : `none`};
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
const Logo = styled.img`
    width:70%;
`

const LogoName = styled.h3`
    font-size:30px;
    margin-left:40px;


`

const stack = ({data}) => 
    {   
        



        return(// data.map(e=><div>{e.name}</div>)
        <Container>
            <StackInfo>
                <StackSection data={1}>
                    <StackLogo><Logo src={`${wifi}api/img/default?name=python`}></Logo></StackLogo>
                </StackSection>
                <StackSection data={0}>
                <LogoName>Python</LogoName>
                </StackSection>
            </StackInfo>
           
            <Section>Description</Section>
            <Input value="sexy company" type="text" name="P_DESCRIPTION" />
            <Section>Stack</Section>
            <Stacks>
                <Makecenter>
                    <Button type="button">React</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Js</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Html</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Css</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Java</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Spring</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Spring</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Spring</Button>
                </Makecenter>
                <Makecenter>
                    <Button type="button">Spring</Button>
                </Makecenter>
            </Stacks>
        </Container>
        )
    }


export default stack;