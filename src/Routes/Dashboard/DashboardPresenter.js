import React, { useEffect, useState, memo } from "react";
import styled from "styled-components";
import GoogleFontLoader from "react-google-font-loader";
import wifi from "../../wifi";
import { Route, Switch, Link } from "react-router-dom";
import Recruit from "./Side/Recruit";
import Resume from "./Side/Resume";
import Room from "./Side/Room";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faHome,
  faFileInvoice,
  faSignOutAlt,
  faCogs,
  faTable,
  faBell,
  faUser,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import ResumeDetail from "./Side/ResumeDetail";
import { GroupAddSharp } from "@material-ui/icons";
import Auth from "../../Auth";

const Back = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  height: 100vh;
`;
const Left = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: fixed;
  top: 0px;
  background-color: var(--color-theme);
  width: 220px;
  border-right: 2px solid var(--color-line);
  z-index: 20;
  min-height: 100vh;
`;
const Right = styled.div`
  background-color: white;
  height: 100%;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
  margin: 35px 0;
  color: #e4e4e4;
`;
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin: 25px 0;
`;
const UserProfile = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 25px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserImage = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 100px;
  height: 100px;
  border-radius: 9px;
  text-align: center;
  line-height: 100px;
  background-image: url("${(props) => props.profileImgUri}");
  background-size: 100% auto;
  background-position: center center;
  background-repeat: no-repeat;
  color: #e4e4e4;
`;

const UserName = styled.h3`
  font-size: 23px;
  font-weight: 700;
  margin-top: 25px;
  color: var(--color-text);
`;
const UserProfileEdit = styled.label`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(25%, 25%);
  width: 25px;
  height: 25px;
  background-color: #ff8c94;
  border-radius: 9px;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LinkList = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;
const LinkTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
`;
const LinkSexy = styled(Link)`
  display: grid;
  grid-template-columns: 60px 90px;
  font-size: 10px;
  margin: 15px 0;
`;
const LinkIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: var(--color-theme);
`;
const LinkCent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
`;
const Navbar = styled.div`
  height: 60px;
  background-color: white;
  position: fixed;
  width: calc(100% - 220px);
  border-bottom: 1.5px solid lightgray;
  display: grid;
  grid-template-columns: 50% 50%;
  z-index: 100;
  color: black;
`;
const NabvarCenter = styled.div`
  display: flex;
  flex-direction: rows;
  justify-content: ${(props) => (props.position ? "flex-start" : "flex-end")};
  align-items: center;
`;
const SearchForm = styled.form`
  margin-left: 20px;
  display: grid;
  grid-template-columns: 1fr 0.4fr;
  height: 40px;
  border-radius: 4px;
`;
const Input = styled.input`
  border: 1px solid lightgray;
  outline: none;
  background-color: white;
  font-size: 20px;
  border-radius: 10px 0 0 10px;
  border-right: none;
  box-shadow: 1px 1px 5px lightgray;
`;
const Submit = styled.input`
  border: 1px solid lightgray;
  border-radius: 0 10px 10px 0;
  background-color: white;
  box-shadow: 1px 1px 5px lightgray;
`;

const PopupBkg = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.status ? "flex" : "none")};
`;
const PopupUser = styled.div`
  width: 500px;
  height: 450px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const PopupBtns = styled.button`
  width: 40%;
  height: 50px;
  background-color: white;
  color: #ff8484;
  border-radius: 13px;
  font-size: 20px;
  font-weight: 800;
  border: 3.5px solid #ff8484;
  transition: all 300ms ease-in-out;
  &:hover {
    background-color: #ff8484;
    color: white;
  }
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: 0.3fr 0.7fr;
`;

const Makecenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const DelpopupBtn = styled.button`
  background-color: transparent;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
  color: lightgray;
  &:hover {
    color: black;
  }
  transition: all 200ms ease-in-out;
`;

const UserInfoBtn = styled.button`
  font-size: 10px;
  margin: 0 10px;
  color: var(--color-text);
`;

const DashboardPresenter = ({
  match,
  data,
  method,
  imageHandler,
  profileImgUri,
  setData,
  DelResumeBtn,
  history,
  getStudyList,
  setStudy,
  study,
  otherAnnList,
  getOtherAnnList,
  setAlcondition,
  alCondition,
}) => {
  const [popup, setPopup] = useState(false);
  const delBtnHandler = () => {
    setPopup(false);
  };
  const UserInfoBtnHandler = () => {
    setPopup(true);
  };
  const LogoutBtnHandler = () => {
    Auth.logout();
    history.push("/signin");
  };

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, 600],
          },
          {
            font: "Roboto Mono",
            weights: [400, 700],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <PopupBkg status={popup}>
        <PopupUser>
          <DelpopupBtn onClick={delBtnHandler}>
            <FontAwesomeIcon style={{ fontSize: 35 }} icon={faTimes} />
          </DelpopupBtn>
          <PopupBtns>
            <Makecenter>
              <FontAwesomeIcon style={{ fontSize: 35 }} icon={faUser} />
            </Makecenter>
            <Makecenter>
              <p>USER INFO</p>
            </Makecenter>
          </PopupBtns>
          <PopupBtns onClick={LogoutBtnHandler}>
            <Makecenter>
              <FontAwesomeIcon style={{ fontSize: 35 }} icon={faSignOutAlt} />
            </Makecenter>
            <Makecenter>
              <p>LOG OUT</p>
            </Makecenter>
          </PopupBtns>
        </PopupUser>
      </PopupBkg>
      <Back>
        <Left>
          <Makecenter style={{ justifyContent: "flex-start" }}>
            <Title style={{ fontFamily: "Roboto Mono, monospaced" }}>
              StudyMall
            </Title>
            <UserContainer>
              <UserProfile>
                <UserImage
                  profileImgUri={profileImgUri}
                  style={{ fontFamily: "Roboto Mono, monospaced" }}
                ></UserImage>
              </UserProfile>
              <UserName>Roddy</UserName>
            </UserContainer>
            <hr
              style={{
                backgroundColor: "var(--color-line)",
                width: "140px",
                height: 2,
                border: "none",
                margin: "10px 0",
                opacity: "1",
              }}
            />
            <NabvarCenter position={false}>
              <UserInfoBtn onClick={UserInfoBtnHandler}>
                <FontAwesomeIcon icon={faUser} size="2x" />
              </UserInfoBtn>
              <Link
                to="/"
                style={{
                  fontSize: "10px",
                  margin: "0 10px",
                  color: "var(--color-text)",
                }}
              >
                <FontAwesomeIcon icon={faBell} size="2x" />
              </Link>
              <Link
                to="/"
                style={{
                  fontSize: "10px",
                  margin: "0 10px",
                  color: "var(--color-text)",
                }}
              >
                <FontAwesomeIcon icon={faHome} size="2x" />
              </Link>
            </NabvarCenter>
            <hr
              style={{
                backgroundColor: "var(--color-line)",
                width: "140px",
                height: 2,
                border: "none",
                margin: "10px 0",
                opacity: "1",
              }}
            />
          </Makecenter>

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
            <LinkSexy to={`${match.path}/resume`}>
              <LinkCent>
                <LinkIcon>
                  <FontAwesomeIcon icon={faFileInvoice} size="2x" />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Resume</LinkTitle>
              </LinkCent>
            </LinkSexy>
            <LinkSexy to={`${match.path}/Recruit`}>
              <LinkCent>
                <LinkIcon>
                  <GroupAddSharp />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Recruit</LinkTitle>
              </LinkCent>
            </LinkSexy>

            <LinkSexy to={`${match.path}/room`}>
              <LinkCent>
                <LinkIcon>
                  <FontAwesomeIcon icon={faCodepen} size="2x" />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Room</LinkTitle>
              </LinkCent>
            </LinkSexy>
            <LinkSexy to={`${match.path}/study`}>
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
        <Right style={{ minWidth: 1200 }}>
          {/* <Navbar>
            <NabvarCenter position={true}>
                <SearchForm>
                        <Input type="text"></Input>
                        <Submit type="submit" value="&#128269;"></Submit>
                    </SearchForm>
                </NabvarCenter>
                <NabvarCenter position={false}>
                    <UserInfoBtn onClick={UserInfoBtnHandler}>
                        <FontAwesomeIcon icon={faUser} size="2x" />
                    </UserInfoBtn>
                    <Link to ="/" style={{fontSize:"10px",margin:"0 10px"}}>
                        <FontAwesomeIcon icon={faBell} size="2x" />
                    </Link>
                    <Link to ="/" style={{fontSize:"10px",margin:"0 10px"}}>
                        <FontAwesomeIcon icon={faHome} size="2x" />
                    </Link>
                </NabvarCenter>

            </Navbar> */}
          <AnimatePresence>
            <Switch>
              <Route
                path={`${match.path}/recruit`}
                component={() => (
                  <Recruit
                    getStudyList={getStudyList}
                    history={history}
                    otherAnnList={otherAnnList}
                    getOtherAnnList={getOtherAnnList}
                    setAlcondition={setAlcondition}
                    alCondition={alCondition}
                  />
                )}
              ></Route>

              <Route
                exact
                path={`${match.path}/resume`}
                render={() => (
                  <Resume
                    data={data}
                    method={method}
                    setData={setData}
                    DelResumeBtn={DelResumeBtn}
                  />
                )}
              ></Route>
              <Route
                path={`${match.path}/resume/:idx`}
                component={ResumeDetail}
              ></Route>
              <Route
                path={`${match.path}/room`}
                render={() => (
                  <Room
                    getStudyList={getStudyList}
                    setStudy={setStudy}
                    study={study}
                    history={history}
                  ></Room>
                )}
              ></Route>
            </Switch>
          </AnimatePresence>
        </Right>
      </Back>
    </>
  );
};

export default memo(DashboardPresenter);
