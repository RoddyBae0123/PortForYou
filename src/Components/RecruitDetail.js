import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimes,
  faFileInvoice,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faJava,
  faPython,
  faJs,
  faCuttlefish,
} from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState, memo } from "react";
import { studyApi } from "../Api";
import Popup from "./Popup";
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
const PopupUser = styled.form`
  width: 1000px;
  height: 650px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;

  align-items: center;
  position: relative;
  overflow-y: scroll;
`;
const DelpopupBtn = styled.button`
  background-color: transparent;
  position: fixed;
  right: 25px;
  top: 25px;
  font-size: 50px;
  color: lightgray;
  &:hover {
    color: black;
  }
  transition: all 200ms ease-in-out;
`;
const RoomInfo = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.3fr 0.4fr;
  justify-content: space-evenly;
  align-items: center;
  height: 150px;
  width: 100%;
  margin-top: 30px;
`;
const RoomData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => (props.direction ? "60%" : "35%")};
`;
const MakeCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const RecruitPic = styled.img`
  width: 95px;
  height: 95px;
  border-radius: 100%;
  border: 1.5px solid lightgray;
`;
const NewCgry = styled.div`
  border-top: 1px solid lightgray;
  width: 85%;
  margin: 45px 0;
  position: relative;
`;
const Title = styled.div`
  height: 20px;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -10px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  display: ${(props) => (props.status ? "flex" : "none")};
  justify-content: center;
`;

const RecruitContent = styled.div`
  font-size: 50px;
  margin: 20px 0;
  text-align: left;
  font-weight: 600;
  width: 85%;
  margin-bottom: 80px;
`;

const RecruitSet = styled.div`
  position: relative;
  display: ${(props) => props.grid};
  grid-template-columns: repeat(auto-fill, 33.3%);
  background-color: white;
  border-radius: 25px;
  width: 100%;
  border: ${(props) =>
    props.status ? "1px solid lightgray" : "1px solid red"};
  position: relative;
  padding: 25px 10px;
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
  &:focus {
    border-color: black;
  }
`;

const Position = styled.button`
  opacity: ${(props) => (props.clicked ? 1 : 0.5)};
  background-color: white;
  height: 50px;
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  margin: 8px 15px;
  border: 1px solid lightgray;
  border-radius: 20px;
  box-shadow: ${(props) => (props.clicked ? "0 3px 6px lightgray" : "none")};
  transition: all 300ms ease;
`;
const PositionTitle = styled.span`
  font-size: 18px;
  font-weight: 500;
`;
const PositionPeople = styled.div`
  font-size: 20px;
  margin-left: 10px;
`;

const PortFolio = styled.button`
  opacity: ${(props) => (props.checked ? 1 : 0.5)};
  background-color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 230px;
  margin: 8px 15px;
  border-radius: 30px;
  border: 1px solid lightgray;
  padding: 15px;
  transition: all 300ms ease;
  box-shadow: ${(props) => (props.checked ? "0 3px 6px lightgray" : "none")};
`;
const PfTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 24%;
  width: 100%;
  font-size: 35px;
  text-align: center;
  align-items: center;
`;
const PfPosition = styled.div`
  height: 15%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid lightgray;
  padding: 10px 20px;
  font-weight: 500;
`;

const DelBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 1px solid lightgray;
  border-radius: 15px;
  font-size: 15px;
  color: lightgray;
  margin: 20px;
  &:hover {
    color: red;
    border-color: red;
  }
  transition: all 300ms ease;
`;
const StackList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20%);
  width: 80%;
  font-size: 25px;
`;

const Submit = styled.input`
  width: 200px;
  height: 50px;
  border: 1px solid lightgray;
  border-radius: 15px;
  font-weight: 600;
  background: white;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transition: all 300ms ease;
  box-shadow: ${(props) => (props.disabled ? "none" : "0 3px 6px lightgray")};
`;

const RecruitDetail = ({
  popup,
  setPopup,
  ann,
  setAnn,
  port,
  setPort,
  setResult,
  getAnnouncementList,
  location,
  history,
  type,
  setApplicant,
  save,
}) => {
  const delPopupBtnHandler = () => {
    setPopup(false);
    type == "recruit" && setAnn(undefined);
  };

  const delAnnBtnHandler = async () => {
    try {
      const data = await studyApi.deleteAnnouncement(ann.idx);
      if (data && data.status == 204) {
        getAnnouncementList(location.state.idx);
        setApplicant && setApplicant(undefined);
        // history.push({
        //   pathname: `${pathname}`,
        //   state: { idx: state.idx },
        // });
      }
      setPopup(false);
    } catch (e) {
      console.log(e);
    }
  };

  const returnDeleteAnn = () => (
    <RecruitSet status={false} grid={"flex"}>
      <Title status={true}>
        <h3
          style={{
            backgroundColor: "white",
            padding: " 0 15px",
            color: "red",
          }}
        >
          Dangerous Zone
        </h3>
      </Title>
      <DelBtn type="button" onClick={delAnnBtnHandler}>
        DELETE
      </DelBtn>
    </RecruitSet>
  );

  const [submit, setSubmit] = useState({
    portfolio: {
      idx: undefined,
    },
    position: {
      idx: undefined,
    },
    announcement: {
      idx: undefined,
    },
  });

  const [disabled, setDisabled] = useState(true);

  const clonedeep = require("lodash.clonedeep");

  useEffect(() => {
    checkSubmit();
  }, [submit]);

  const checkSubmit = () => {
    submit.portfolio.idx && submit.position.idx && submit.announcement.idx
      ? setDisabled(false)
      : setDisabled(true);
  };

  const setchecked = (type, idx, id) => {
    const copySub = clonedeep(submit);
    if (type === "port") {
      const copy = clonedeep(port);
      copy.map((e) => (e.checked = false));
      copy[id].checked ? (copy[id].checked = false) : (copy[id].checked = true);
      copy[id].checked
        ? (copySub.portfolio.idx = idx)
        : (copySub.portfolio.idx = undefined);
      setPort && setPort(copy);
    } else if (type === "position") {
      const copy = clonedeep(ann);
      copy.demandPosition.map((e) => (e.checked = false));

      copy.demandPosition[id].checked
        ? (copy.demandPosition[id].checked = false)
        : (copy.demandPosition[id].checked = true);
      copy.demandPosition[id].checked
        ? (copySub.position.idx = idx)
        : (copySub.position.idx = undefined);
      setAnn && setAnn(copy);
    }
    copySub.announcement = { idx: ann.idx };
    setSubmit(copySub);
  };

  const PositionBtnHandler = (e) => {
    const { id } = e.target;
    setchecked(e.target.dataset.kind, id, e.target.dataset.num);
  };

  const sumbitHander = async (e) => {
    try {
      const { data, status } = await studyApi.setApplication(submit);
      {
        data && console.log(data, status);
        setPopup(false);
        status && setResult(status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const returnSubmitBtn = () =>
    setResult ? (
      <Submit
        type="button"
        value="APPLY"
        disabled={disabled}
        onClick={sumbitHander}
      />
    ) : null;

  {
    port && console.log(port);
  }

  return port && popup && ann ? (
    <PopupBkg status={popup}>
      <PopupUser>
        <DelpopupBtn onClick={delPopupBtnHandler}>
          <FontAwesomeIcon icon={faTimes} />
        </DelpopupBtn>

        <RoomInfo>
          <RoomData direction={true}>
            <h1 style={{ fontSize: 40, fontWeight: 500, textAlign: "center" }}>
              {ann.study.title}
            </h1>
            <h4
              style={{
                fontSize: 10,
                fontWeight: 400,
                opacity: "0.4",
                textAlign: "center",
              }}
            >
              {ann.study.studyCategory.title}
            </h4>
            <h2
              style={{
                fontSize: 15,
                fontWeight: 500,
                opacity: "0.7",
                textAlign: "center",
              }}
            >
              {ann.study.content.substring(0, 35)}...
            </h2>
          </RoomData>
          <MakeCenter>
            <RecruitPic
              src={"https://avatars.githubusercontent.com/u/68287181?v=4"}
            />
          </MakeCenter>

          <RoomData direction={false}>
            <div style={{ fontSize: 20, textAlign: "center" }}>
              <strong style={{ fontColor: "black", fontWeight: "600" }}>
                Boss:
              </strong>
              {ann.study.user.name}
            </div>
            <div style={{ fontSize: 20, textAlign: "center" }}>
              <strong style={{ fontColor: "black", fontWeight: "600" }}>
                Site:
              </strong>
              <a href={ann.study.user.site}>{ann.study.user.site}</a>
            </div>
          </RoomData>
        </RoomInfo>
        <NewCgry>
          <Title status={true}>
            <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
              Recruitment
            </h3>
          </Title>
        </NewCgry>
        <RecruitContent>
          <h2 style={{ marginBottom: "40px", textAlign: "center" }}>
            {ann.title}
          </h2>
          <h5 style={{ fontSize: "17px", fontWeight: "100" }}>{ann.content}</h5>
        </RecruitContent>
        <NewCgry>
          <Title status={true}>
            <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
              Choose your position and portfolio to apply for the room
            </h3>
          </Title>
        </NewCgry>
        <div
          style={{
            width: "85%",
            margin: "30px 0",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <RecruitSet status={true} grid={"grid"}>
            <Title status={true}>
              <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
                Position List
              </h3>
            </Title>
            {ann.demandPosition.map((e, idx) => (
              <Position
                data-kind="position"
                clicked={e.checked}
                type="button"
                key={e.idx}
                id={e.position.idx}
                data-num={idx}
                onClick={PositionBtnHandler}
              >
                <MakeCenter
                  data-kind="position"
                  id={e.position.idx}
                  data-num={idx}
                >
                  <PositionTitle key={e.position.idx}>
                    {e.position.name}
                  </PositionTitle>
                </MakeCenter>
                <MakeCenter
                  data-kind="position"
                  id={e.position.idx}
                  data-num={idx}
                  style={{ flexDirection: "row" }}
                >
                  <FontAwesomeIcon icon={faUserAlt} />
                  <PositionPeople>{e.demand}</PositionPeople>
                </MakeCenter>
              </Position>
            ))}
          </RecruitSet>
          <RecruitSet status={true} grid={"grid"}>
            <Title status={true}>
              <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
                Portfolio List
              </h3>
            </Title>
            {port.map((e, idx) => (
              <PortFolio
                data-kind="port"
                type="button"
                key={e.idx}
                checked={e.checked}
                id={e.idx}
                onClick={PositionBtnHandler}
                data-num={idx}
              >
                <PfTitle>
                  <FontAwesomeIcon icon={faFileInvoice} />
                  <h1
                    style={{
                      fontWeight: 500,
                      fontSize: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {e.title.substring(0, 8)}...
                  </h1>
                </PfTitle>
                <h2>{e.content.substring(0, 50)}...</h2>
                <PfPosition key={e.position.idx}>{e.position.name}</PfPosition>
                <StackList>
                  {e.stack &&
                    e.stack.map((e) => (
                      <MakeCenter>
                        <img
                          style={{ width: "80%" }}
                          src={`http://3.37.208.251:8080/api/img/default/${e.stackName}`}
                        />
                      </MakeCenter>
                    ))}
                </StackList>
              </PortFolio>
            ))}
          </RecruitSet>
          {type == "recruit" && returnSubmitBtn()}
          {type == "member" && returnDeleteAnn()}
        </div>
      </PopupUser>
    </PopupBkg>
  ) : null;
};

export default RecruitDetail;
