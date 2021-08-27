import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import wifi from "../../wifi";
import { Route, Switch, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCalendarAlt,
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
import { Forum, Chat } from "@material-ui/icons";
import Auth from "../../Auth";
import Post from "./Side/Post";
import Board from "./Side/Board";
import Calender from "./Side/Calender";
import Channel from "./Side/Channel";
import Member from "./Side/Member";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import PostDetail from "./Side/PostDetail";
import PostEdit from "./Side/PostEdit";
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
  color: var(--color-text2);
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
  color: var(--color-text2);
`;

const LinkList = styled.div`
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
const Makecenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
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
  color: var(--color-text2);
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

const RoomBoardPresenter = ({
  userData,
  match,
  history,
  profileImgUri,
  getPositionList,
  position,
  setPosition,
  setRcSave,
  rcSave,
  saveRecruit,
  save,
  props,
  annList,
  ann,
  getApplication,
  applicant,
  setAnn,
  getAnnouncementList,
  getAnn,
  setApplicant,
  roomIdx,
  memberListData,
}) => {
  const [popup, setPopup] = useState(false);
  const { location } = history;

  const [checked, setChecked] = useState({
    board: false,
    calender: false,
    channel: false,
    setting: false,
    member: false,
    [location.pathname.substring(11).toLowerCase()]: true,
  });
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
  const setWide = () => {
    console.log(Lists.current.style.width);
    if (Lists.current.style.width == "50px") {
      Lists.current.style.width = "100%";
    } else {
      Lists.current.style.width = "50px";
    }
  };
  const Lists = useRef();
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
      <Back>
        <Left>
          {/* <Makecenter style={{ justifyContent: "flex-start" }}>
            <Title style={{ fontFamily: "Roboto Mono, monospaced" }}>
              StudyRoom
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
                backgroundColor: "var(--color-line2)",
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
                  color: "var(--color-text2)",
                }}
              >
                <FontAwesomeIcon icon={faBell} size="2x" />
              </Link>
              <Link
                to="/"
                style={{
                  fontSize: "10px",
                  margin: "0 10px",
                  color: "var(--color-text2)",
                }}
              >
                <FontAwesomeIcon icon={faHome} size="2x" />
              </Link>
            </NabvarCenter>
            <hr
              style={{
                backgroundColor: "var(--color-line2)",
                width: "140px",
                height: 2,
                border: "none",
                margin: "10px 0",
                opacity: "1",
              }}
            />
          </Makecenter> */}

          {/* <LinkList>
            <LinkSexy
              state={{ idx: roomIdx }}
              to={{
                pathname: `/roomboard/${roomIdx}/board/`,
                state: { idx: roomIdx, where: "room" },
              }}
            >
              <LinkCent>
                <LinkIcon>
                  <FontAwesomeIcon icon={faTable} size="2x" />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Board</LinkTitle>
              </LinkCent>
            </LinkSexy>
            <LinkSexy
              to={{
                pathname: `/roomboard/member/${roomIdx}`,
                state: { idx: roomIdx, where: "room" },
              }}
            >
              <LinkCent>
                <LinkIcon>
                  <HowToRegIcon />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Member</LinkTitle>
              </LinkCent>
            </LinkSexy>
            <LinkSexy
              to={{
                pathname: `/roomboard/channel/${roomIdx}`,
                state: { idx: roomIdx, where: "room" },
              }}
            >
              <LinkCent>
                <LinkIcon>
                  <Forum />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Channel</LinkTitle>
              </LinkCent>
            </LinkSexy>
            
            <LinkSexy
              to={{
                pathname: `/roomboard/calender/${roomIdx}`,
                state: { idx: roomIdx, where: "room" },
              }}
            >
              <LinkCent>
                <LinkIcon>
                  <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Calender</LinkTitle>
              </LinkCent>
            </LinkSexy>
            <LinkSexy
              to={{
                pathname: `/roomboard/setting/${roomIdx}`,
                state: { idx: roomIdx, where: "room" },
              }}
            >
              <LinkCent>
                <LinkIcon>
                  <FontAwesomeIcon icon={faCogs} size="2x" />
                </LinkIcon>
              </LinkCent>
              <LinkCent>
                <LinkTitle>Setting</LinkTitle>
              </LinkCent>
            </LinkSexy>
          </LinkList> */}
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
                state={{ idx: roomIdx }}
                to={{
                  pathname: `/roomboard/${roomIdx}/board/`,
                  state: { idx: roomIdx, where: "room" },
                }}
                onClick={() => setEntireChecked("board")}
                checked={checked.board}
              >
                <LinkCent checked={checked.board}>
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
                      color: checked.board ? "blue" : "var(--color-text-ver3)",
                    }}
                  >
                    Board
                  </Text>
                </Flex>
              </LinkSexy>
              <LinkSexy
                to={{
                  pathname: `/roomboard/channel/${roomIdx}`,
                  state: { idx: roomIdx, where: "room" },
                }}
                onClick={() => setEntireChecked("channel")}
                checked={checked.channel}
              >
                <LinkCent checked={checked.channel}>
                  <LinkIcon>
                    <Forum />
                  </LinkIcon>
                </LinkCent>
                <Flex
                  setting={{ justify: "center", align: "center", dir: "row" }}
                >
                  <Text
                    size={"15px"}
                    weight={"500"}
                    style={{
                      color: checked.channel
                        ? "blue"
                        : "var(--color-text-ver3)",
                    }}
                  >
                    Channel
                  </Text>
                </Flex>
              </LinkSexy>
              <LinkSexy
                to={{
                  pathname: `/roomboard/calender/${roomIdx}`,
                  state: { idx: roomIdx, where: "room" },
                }}
                onClick={() => setEntireChecked("calender")}
                checked={checked.calender}
              >
                <LinkCent checked={checked.calender}>
                  <LinkIcon>
                    <FontAwesomeIcon icon={faCalendarAlt} size="2x" />
                  </LinkIcon>
                </LinkCent>
                <Flex
                  setting={{ justify: "center", align: "center", dir: "row" }}
                >
                  <Text
                    size={"15px"}
                    weight={"500"}
                    style={{
                      color: checked.calender
                        ? "blue"
                        : "var(--color-text-ver3)",
                    }}
                  >
                    Calender
                  </Text>
                </Flex>
              </LinkSexy>

              <LinkSexy
                to={{
                  pathname: `/roomboard/member/${roomIdx}`,
                  state: { idx: roomIdx, where: "room" },
                }}
                onClick={() => setEntireChecked("member")}
                checked={checked.member}
              >
                <LinkCent checked={checked.member}>
                  <LinkIcon>
                    <HowToRegIcon />
                  </LinkIcon>
                </LinkCent>
                <Flex
                  setting={{ justify: "center", align: "center", dir: "row" }}
                >
                  <Text
                    size={"15px"}
                    weight={"500"}
                    style={{
                      color: checked.member ? "blue" : "var(--color-text-ver3)",
                    }}
                  >
                    Member
                  </Text>
                </Flex>
              </LinkSexy>
              <LinkSexy
                to={{
                  pathname: `/roomboard/setting/${roomIdx}`,
                  state: { idx: roomIdx, where: "room" },
                }}
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
        <div></div>
        <Right style={{ minWidth: 1200 }}>
          <AnimatePresence>
            <Switch>
              <Route
                path={`${match.path}/:studyIdx/board/`}
                component={Board}
                exact
              ></Route>
              <Route
                path={`${match.path}/:studyIdx/board/:boardIdx/post`}
                component={Post}
                exact
              ></Route>
              <Route
                path={`${match.path}/:studyIdx/board/:boardIdx/postdetail/:postIdx/postEdit`}
                component={PostEdit}
                exact
              ></Route>
              <Route
                path={`${match.path}/:studyIdx/board/:boardIdx/postdetail/:postIdx`}
                component={PostDetail}
              ></Route>
              <Route
                path={`${match.path}/member/:idx`}
                render={(props) => (
                  <Member
                    {...props}
                    getPositionList={getPositionList}
                    position={position}
                    setPosition={setPosition}
                    setRcSave={setRcSave}
                    saveRecruit={saveRecruit}
                    rcSave={rcSave}
                    save={save}
                    annList={annList}
                    ann={ann}
                    getApplication={getApplication}
                    applicant={applicant}
                    setAnn={setAnn}
                    getAnnouncementList={getAnnouncementList}
                    getAnn={getAnn}
                    setApplicant={setApplicant}
                    memberListData={memberListData}
                  ></Member>
                )}
              ></Route>
              <Route
                path={`${match.path}/channel/:idx`}
                component={Channel}
              ></Route>
              <Route
                path={`${match.path}/calender/:studyIdx`}
                component={Calender}
              ></Route>
            </Switch>
          </AnimatePresence>
        </Right>
      </Back>
    </>
  );
};

export default RoomBoardPresenter;
