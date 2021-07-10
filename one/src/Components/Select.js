import styled from 'styled-components';

const Container = styled.div`
    width:80%;
    border:3.5px solid #D4D4D4;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows:1fr;
    padding:10px;
    border-radius: 20px;
    position:relative;
`
const Makecenter = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    background-color: #EDEDED;
    width:85%;
    height:60px;
    border-radius: 20px;
    margin:10px;
`
const SubTitle = styled.h1`
    background-color:white;
    position: absolute;
    top:-0.5rem;
    left:3.5rem;
    padding:0 7px;
    font-weight: 500;
`

const Select = ({data}) => 
    {   
        
        return(
        <Container>
            <SubTitle>Select your Position</SubTitle>
            {data&& data.map(e=><Makecenter key={e.idx}><Button type="button">{e.name}</Button></Makecenter>)}
            </Container>
        )
    }

export default Select;