import React, { useEffect, useState, memo, useRef } from "react";
import styled from "styled-components";
import GoogleFontLoader from "react-google-font-loader";
import wifi from "../../wifi";
import { Route, Switch, Link } from "react-router-dom";
import Recruit from "./Side/Recruit";
import Resume from "./Side/Resume";
import Room from "./Side/Room";
import Setting from "./Side/Setting";
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
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import ResumeDetail from "./Side/ResumeDetail";
import { GroupAddSharp } from "@material-ui/icons";
import Auth from "../../Auth";
import { connect } from "react-redux";

const Back = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  height: 100vh;
`;
const Left = styled.div`
  position: fixed;
  top: 0px;
  background-color: white;
  z-index: 20;
  min-height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: var(--color-text-ver3);
`;
const Right = styled.div`
  background-color: var(--color-background);
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
  width: 25px;
  height: 25px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("${(props) => props.profileImgUri}");
  background-size: 100% auto;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 100%;
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
const LinkList = styled.ul`
  display: grid;
  grid-auto-rows: 60px;
  overflow-x: hidden;
  width: 50px;
  height: 100%;
`;
const LinkTitle = styled.h2`
  font-size: 17px;
  font-weight: 700;
`;
const LinkSexy = styled(Link)`
  display: grid;
  grid-template-columns: 50px 150px;
  font-size: 10px;
  background-color: ${(props) =>
    props.checked ? "var(--color-background-focus)" : "transparent"};
`;
const LinkIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  color: var(--color-text-ver3);
`;
const LinkCent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  color: var(--color-text);
  border-left: 3px solid ${(props) => (props.checked ? "blue" : "transparent")};
  border-right: 3px solid transparent;
  background-color: ${(props) =>
    props.checked ? "var(--color-background-focus)" : "transparent"};
  height: 100%;
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

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: rgb(74, 86, 94);
  display: inline-flex;
`;
const MenuBtn = styled.button`
  width: 100%;
  height: 25px;
  font-size: 10px;
  padding: 0 3px;
  margin: 20px 0;
  color: var(--color-text-ver3);
`;

const DashboardPresenter = memo(
  ({
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
    roomCondition,
    setRoomCondition,
    getUserInfo,
    userData,
  }) => {
    console.log(userData);
    const [popup, setPopup] = useState(false);
    const delBtnHandler = () => {
      setPopup(false);
    };
    const userInfoBtnHandler = () => {
      setPopup(true);
    };
    const LogoutBtnHandler = () => {
      Auth.logout();
      history.push("/signin");
    };
    const setWide = () => {
      console.log(Lists.current.style.width);
      if (Lists.current.style.width == "50px") {
        Lists.current.style.width = "100%";
      } else {
        Lists.current.style.width = "50px";
      }
    };
    const Lists = useRef();
    const { location } = history;
    const [checked, setChecked] = useState({
      main: false,
      room: false,
      recruit: false,
      setting: false,
      resume: false,
      [location.pathname.substring(11).toLowerCase()]: true,
    });

    const setEntireChecked = (e) => {
      setChecked({
        main: false,
        room: false,
        recruit: false,
        setting: false,
        resume: false,
        [e]: true,
      });
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
            <Flex
              setting={{
                justify: "center",
                align: "flex-start",
                dir: "column",
              }}
            >
              <LinkList ref={Lists}>
                <LinkSexy as={"div"}>
                  <MenuBtn onClick={setWide}>
                    <FontAwesomeIcon icon={faBars} size="2x" />
                  </MenuBtn>
                  <Flex
                    setting={{ justify: "center", align: "center", dir: "row" }}
                  >
                    <Text size={"15px"} weight={"400"}></Text>
                  </Flex>
                </LinkSexy>

                <LinkSexy as={"button"} style={{ padding: 0 }}>
                  <LinkCent>
                    <UserProfile>
                      <UserImage
                        onClick={() => setPopup(true)}
                        profileImgUri={profileImgUri}
                        style={{ fontFamily: "Roboto Mono, monospaced" }}
                      ></UserImage>
                    </UserProfile>
                  </LinkCent>
                  <LinkCent>
                    <LinkTitle>{userData && userData.data.name}</LinkTitle>
                  </LinkCent>
                </LinkSexy>
                <LinkSexy
                  to={`${match.path}`}
                  onClick={() => setEntireChecked("main")}
                  checked={checked.main}
                >
                  <LinkCent checked={checked.main}>
                    <LinkIcon>
                      <FontAwesomeIcon icon={faTable} size="2x" />
                    </LinkIcon>
                  </LinkCent>
                  <Flex
                    setting={{ justify: "center", align: "center", dir: "row" }}
                  >
                    <Text
                      size={"15px"}
                      weight={"500"}
                      style={{
                        color: checked.main ? "blue" : "var(--color-text-ver3)",
                      }}
                    >
                      Main
                    </Text>
                  </Flex>
                </LinkSexy>
                <LinkSexy
                  to={`${match.path}/resume`}
                  onClick={() => setEntireChecked("resume")}
                  checked={checked.resume}
                >
                  <LinkCent checked={checked.resume}>
                    <LinkIcon>
                      <FontAwesomeIcon icon={faFileInvoice} size="2x" />
                    </LinkIcon>
                  </LinkCent>
                  <Flex
                    setting={{ justify: "center", align: "center", dir: "row" }}
                  >
                    <Text
                      size={"15px"}
                      weight={"500"}
                      style={{
                        color: checked.resume
                          ? "blue"
                          : "var(--color-text-ver3)",
                      }}
                    >
                      Resume
                    </Text>
                  </Flex>
                </LinkSexy>
                <LinkSexy
                  to={`${match.path}/Recruit`}
                  onClick={() => setEntireChecked("recruit")}
                  checked={checked.recruit}
                >
                  <LinkCent checked={checked.recruit}>
                    <LinkIcon>
                      <GroupAddSharp />
                    </LinkIcon>
                  </LinkCent>
                  <Flex
                    setting={{ justify: "center", align: "center", dir: "row" }}
                  >
                    <Text
                      size={"15px"}
                      weight={"500"}
                      style={{
                        color: checked.recruit
                          ? "blue"
                          : "var(--color-text-ver3)",
                      }}
                    >
                      Recruit
                    </Text>
                  </Flex>
                </LinkSexy>

                <LinkSexy
                  to={`${match.path}/room`}
                  onClick={() => setEntireChecked("room")}
                  checked={checked.room}
                >
                  <LinkCent checked={checked.room}>
                    <LinkIcon>
                      <FontAwesomeIcon icon={faCodepen} size="2x" />
                    </LinkIcon>
                  </LinkCent>
                  <Flex
                    setting={{ justify: "center", align: "center", dir: "row" }}
                  >
                    <Text
                      size={"15px"}
                      weight={"500"}
                      style={{
                        color: checked.room ? "blue" : "var(--color-text-ver3)",
                      }}
                    >
                      Room
                    </Text>
                  </Flex>
                </LinkSexy>
                <LinkSexy
                  to={`${match.path}/setting`}
                  onClick={() => setEntireChecked("setting")}
                  checked={checked.setting}
                >
                  <LinkCent checked={checked.setting}>
                    <LinkIcon>
                      <FontAwesomeIcon icon={faCogs} size="2x" />
                    </LinkIcon>
                  </LinkCent>
                  <Flex
                    setting={{ justify: "center", align: "center", dir: "row" }}
                  >
                    <Text
                      size={"15px"}
                      weight={"500"}
                      style={{
                        color: checked.setting
                          ? "blue"
                          : "var(--color-text-ver3)",
                      }}
                    >
                      Setting
                    </Text>
                  </Flex>
                </LinkSexy>
              </LinkList>
            </Flex>
           

           
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
                    <UserInfoBtn onClick={userInfoBtnHandler}>
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
                      roomCondition={roomCondition}
                      setRoomCondition={setRoomCondition}
                    ></Room>
                  )}
                ></Route>
                <Route
                  path={`${match.path}/setting`}
                  render={() => (
                    <Setting getUserInfo={getUserInfo} userData={userData} />
                  )}
                />
              </Switch>
            </AnimatePresence>
          </Right>
        </Back>
      </>
    );
  }
);

export default DashboardPresenter;
