import React, { useEffect, useState } from  "react";
import styled from "styled-components";
import axios from 'axios';
import GoogleFontLoader from 'react-google-font-loader';
import wifi from "../../wifi";
import {Route, Switch,Link} from "react-router-dom";
import Apply from './Side/Apply';
import Resume from './Side/Resume';
import Study from './Side/Study';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt , faPencilAlt,faHome,faFileInvoice,faUserCheck,faUsers,faCogs,faTable,faBell} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { AnimatePresence,motion } from "framer-motion"
import Auth from "../../Auth";
import ResumeDetail from './Side/ResumeDetail';

const Back = styled.div`
    display:grid;
    grid-template-columns: 220px 1fr;
    height:100vh;
`
const Left = styled.div`
    display:flex;
    align-items:center;
    flex-direction: column;
    position: fixed;
    top: 0px;
    background-color:white;
    height:100%;
    width:220px;
    border-right:1.5px solid lightgray;

`
const Right = styled.div`
    background-color:RGB(254, 254, 254);
    height:100%;
    `

const Title = styled.h1`
    font-size:25px;
    font-weight:700;
    margin: 35px 0 ;
`
const UserContainer = styled.div`
    display:flex;
    align-items:center;
    flex-direction: column;
    width:100%;
    margin: 30px 0;
`
const UserProfile = styled.div`
    width:100px;
    height:100px;
    position:relative;
    border-radius:25px;
    background-color:#F3F3F3;
    display:flex;
    justify-content: center;
    align-items: center;
`
const UserImage = styled.h1`
    font-size:20px;
    font-weight: 600;
`
const UserId = styled.h3`
    font-size:18px;
    font-weight: 600;
    margin:25px 0 ;
`
const UserName = styled.h3`
    font-size:23px;
    font-weight: 700;
    margin-top:25px ;

`
const UserProfileEdit = styled.button`
    position:absolute;
    bottom:0;
    right:0;
    transform: translate(25%,25%);
    width:25px;
    height:25px;
    background-color:#FF8C94;
    border-radius:9px;
    font-size:15px;

`
const LinkList = styled.div`
    display:flex;
    align-items:center;
    flex-direction: column;
    justify-content: center;
    height:100%;
`
const LinkTitle = styled.h2`
    font-size:17px;
    font-weight: 700;
`
const LinkSexy = styled(Link)`
    display:grid;
    grid-template-columns: 60px 90px;
    font-size:10px;
    margin: 15px 0 ;
`
const LinkIcon = styled.div`
    width:40px;
    height:40px;
    border-radius:10px;
    background-color:#F3F3F3;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:10px;
`
const LinkCent = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;

`
const Navbar = styled.div`
    height:60px;
    background-color:#F1E2E2;
    position: fixed;
    width: calc( 100% - 220px ); 
    border-bottom:1.5px solid lightgray;
    display:grid;
    grid-template-columns: 50% 50%;
    z-index:100;
    
`
const NabvarCenter = styled.div`
    display:flex;
    flex-direction: rows;
    justify-content: ${(props)=> props.position ? "flex-start" : "flex-end"};;
    align-items: center;
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

const DashboardPresenter = ({match,data, method}) => {

     
    

    return(<>
    <GoogleFontLoader
      fonts={[
        {
          font: 'Roboto',
          weights: [400, 600],
        },
        {
          font: 'Roboto Mono',
          weights: [400, 700],
        },
      ]}
      subsets={['cyrillic-ext', 'greek']}
    />
    <Back>
        <Left>
            
            <Title style={{ fontFamily: 'Roboto Mono, monospaced' }}>Dashboard</Title>
            <hr style={{backgroundColor:"black",width:"10vw",height:1,border:"none"}} />
            <UserContainer>

                <UserProfile>
                    <UserImage style={{ fontFamily: 'Roboto Mono, monospaced' }}>User</UserImage>
                    <UserProfileEdit>
                        <FontAwesomeIcon icon={faPencilAlt}  />
                    </UserProfileEdit>
                </UserProfile>
                <UserName>Roddy</UserName>
            </UserContainer>
            <hr style={{backgroundColor:"black",width:"10vw",height:1,border:"none"}} />
            <LinkList>
                <LinkSexy to={`${match.path}`}>
                    <LinkCent>
                        <LinkIcon>
                            <FontAwesomeIcon icon={faTable} size="2x" />
                        </LinkIcon>
                    </LinkCent>
                    <LinkCent>
                        <LinkTitle>Main</LinkTitle>           
                    </LinkCent>
                </LinkSexy>
                <LinkSexy to ={`${match.path}/resume`}>
                    <LinkCent>
                            <LinkIcon>
                                <FontAwesomeIcon icon={faFileInvoice} size="2x" />
                            </LinkIcon>
                        </LinkCent>
                        <LinkCent>
                            <LinkTitle>Resume</LinkTitle>           
                        </LinkCent>
                    </LinkSexy>
                <LinkSexy to ={`${match.path}/apply`}>
                    <LinkCent>
                            <LinkIcon>
                                <FontAwesomeIcon icon={faUserCheck} size="2x" />
                            </LinkIcon>
                    </LinkCent>
                    <LinkCent>
                            <LinkTitle>Apply</LinkTitle>           
                    </LinkCent>
                </LinkSexy>
                
                <LinkSexy to ={`${match.path}/study`}>
                    <LinkCent>
                                <LinkIcon>
                                    <FontAwesomeIcon icon={faUsers} size="2x" />
                                </LinkIcon>
                        </LinkCent>
                        <LinkCent>
                                <LinkTitle>Study</LinkTitle>           
                        </LinkCent>
                </LinkSexy>
                <LinkSexy to ={`${match.path}/study`}>
                    <LinkCent>
                                <LinkIcon>
                                    <FontAwesomeIcon icon={faCogs} size="2x" />
                                </LinkIcon>
                        </LinkCent>
                        <LinkCent>
                                <LinkTitle>Setting</LinkTitle>           
                        </LinkCent>
                </LinkSexy>
            </LinkList>
            
        </Left>
        <div></div>
        <Right>
            <Navbar>
            <NabvarCenter position={true}>
                <SearchForm>
                        <Input type="text"></Input>
                            <Submit type="submit" value="&#128269;">
                        </Submit>
                    </SearchForm>
                </NabvarCenter>
                <NabvarCenter position={false}>
                    <Link to ="/" style={{fontSize:"10px",margin:"0 5px"}}>
                        <FontAwesomeIcon icon={faBell} size="2x" />
                    </Link>
                    <Link to ="/" style={{fontSize:"10px",margin:"0 20px"}}>
                        <FontAwesomeIcon icon={faHome} size="2x" />
                    </Link>
                </NabvarCenter>

            </Navbar>
                <AnimatePresence>
                    <Switch>
                        <Route path={`${match.path}/apply`}  render={(history) => <Apply history ={history} />}></Route>
                        
                        <Route exact path={`${match.path}/resume`}  render={() => <Resume data ={data} method = {method} />}></Route>
                        <Route path={`${match.path}/resume/:idx`}  component={ResumeDetail}></Route>
                        <Route path={`${match.path}/study`} component={Study}></Route>
                    </Switch>
                </AnimatePresence>
            
        </Right>
        

    </Back>
            
    </>)
}


export default DashboardPresenter;