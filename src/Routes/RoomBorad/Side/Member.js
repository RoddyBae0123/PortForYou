import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Section from "../../../Components/Section";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimes,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { studyApi } from "../../../Api";
import Loader from "react-loader-spinner";
import RecruitOne from "../../../Components/RecruitOne";
import List from "../../../Components/List";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Makecenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const Navbar = styled.div`
  height: 70px;
  width: 85%;
  border-bottom: 1px solid #b6b6b6;
`;
const NavBtn = styled.button`
  width: 15%;
  height: 100%;
  border-bottom: 3px solid ${(props) => (props.picked ? "#B6B6B6" : "white")};
  opacity: ${(props) => (props.picked ? 1 : 0.3)};
  font-weight: 500;
  font-size: 20px;
  transition: all 300ms ease-in-out;
  transform: translateY(5%);
`;

const MemberData = styled.div`
  width: 85%;
  margin: 20px 0;
`;
const RruCreateBtn = styled.button`
  height: 230px;
  border-radius: 20px;
  box-shadow: 0 3px 6px lightgray;
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  color: lightgray;
  font-weight: 500;
  font-size: 30px;
  transition: all 300ms ease-in-out;
  &:hover {
    color: black;
    transform: translateY(-5px);
    box-shadow: 0px 8px 11px rgba(0, 0, 0, 0.24);
  }
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
const PopupUser = styled.form`
  width: 900px;
  height: 720px;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
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
const RoomInput = styled.textarea`
  width: 100%;
  height: 50px;
  background-color: RGB(238, 238, 238);
  border: none;
  outline: none;
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  &:focus {
    background-color: RGB(244, 248, 247);
  }
  transition: all 300ms ease-out;
  resize: none;
`;
const CreateRecruitTitle = styled.h1`
  font-size: 50px;
  font-weight: 700;
`;
const PositionList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  grid-gap: 20px;
  overflow-y: scroll;
  height: 160px;
`;
const PositionBtn = styled.button`
  opacity: ${(props) => (props.checked ? 1 : 0.3)};
  border: 2px solid RGB(238, 238, 238);
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.checked ? "RGB(238,238,238)" : "white"};
  border-radius: 20px;
  display: grid;
  grid-template-columns: ${(props) => (props.checked ? "1fr 1fr" : "1fr")};
  font-size: 7px;
  transition: all 300ms ease-in-out;
`;
const PositionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
  font-weight: 500;
`;
const PositionValue = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 100%;
  width: 100%;
  font-weight: 500;
  text-align: center;
  border: none;
  pointer-events: none;
  background-color: transparent;
`;

const InputNumber = styled.div`
  grid-template-columns: 0.5fr 0.5fr;
  height: 100%;
  display: ${(props) => (props.checked ? "grid" : "none")};
`;
const InputUpDown = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const UpDownBtn = styled.button`
  border: none;
  background-color: transparent;
  font-size: 20px;

  &:hover {
    transform: scale(1.2, 1.2);
  }
  transition: transform 300ms ease;
`;

const Submit = styled.input`
  opacity: ${(props) => (props.disabled ? 0.1 : 1)};
  width: 30%;
  height: 50px;
  border-radius: 20px;
  border: 5px solid lightgray;
  font-weight: 500;
  transition: all 300ms ease-out;
  color: ${(props) => (props.disabled ? "lightgray" : "black")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  background-color: ${(props) => (props.disabled ? "white" : "lightgray")};
`;

const Member = ({
  getPositionList,
  location,
  history,
  position,
  setPosition,
  setRcSave,
  rcSave,
  saveRecruit,
  save,
  annList,
  ann,
  getApplication,
  applicant,
}) => {
  const {
    state: { idx, where },
  } = location;
  const [picked, setPicked] = useState({
    first: true,
    second: false,
  });
  const [popUp, setPopUp] = useState(false);
  const [disabled, setDisabled] = useState(true);
  // this.setState(prevState => ({
  //     todoItems: prevState.todoItems.map(
  //       el => el.key === key? { ...el, status: 'done' }: el
  //     )
  //   }))

  useEffect(() => {
    var copythem = [...position];
    copythem = copythem.filter((e) => e.checked == true);
    copythem.length && rcSave.title.length && rcSave.content.length
      ? setDisabled(false)
      : setDisabled(true);
  }, [position, rcSave]);

  useEffect(() => {
    getPositionList();
    getApplication();
    save();
    {
      where == "recruit" &&
        setPicked({
          first: false,
          second: true,
        });
    }
  }, []);

  const UpDown = (e) => {
    {
      e.target.childNodes.length
        ? ChangeDm(e.target.id, e.target.dataset.type)
        : ChangeDm(
            e.target.parentElement.id,
            e.target.parentElement.dataset.type
          );
    }
  };
  const ChangeDm = (number, type) => {
    const copyPosition = [...position];
    if (copyPosition[number].demand < 5 && copyPosition[number].demand > 1) {
      {
        type == "true"
          ? (copyPosition[number].demand += 1)
          : (copyPosition[number].demand -= 1);
      }
    } else if (copyPosition[number].demand == 1) {
      {
        type == "true"
          ? (copyPosition[number].demand += 1)
          : console.log("fuckit");
      }
    } else {
      {
        type == "false"
          ? (copyPosition[number].demand -= 1)
          : console.log("fuckit");
      }
    }
    setPosition([...copyPosition]);
  };
  const PositionBtnHandler = (e) => {
    const copyPosition = [...position];
    if (e.target.checked === false && !e.target.dataset.type) {
      {
        e.target.childNodes.length
          ? (copyPosition[e.target.id].checked = true)
          : (copyPosition[e.target.parentElement.id].checked = true);
      }
    } else if (e.target.checked === true && !e.target.dataset.type) {
      {
        e.target.childNodes.length
          ? (copyPosition[e.target.id].checked = false)
          : (copyPosition[e.target.parentElement.id].checked = false);
      }
    }
    setPosition(copyPosition);
  };
  const changeRc = (e) => {
    const copyRcSave = {
      studyIdx: idx,
      title: rcSave.title,
      content: rcSave.content,
    };
    if (e.target.dataset.kind == "0") {
      copyRcSave.title = e.target.value;
    } else if (e.target.dataset.kind == "1") {
      copyRcSave.content = e.target.value;
    }
    {
      copyRcSave && setRcSave(copyRcSave);
    }
  };

  const SumbitHandler = (e) => {
    e.preventDefault();
    var copythem = [...position];
    copythem = copythem.filter((e) => e.checked == true);
    // copythem.map(e=> {delete e.checked})
    const data = {
      study: { idx },
      title: rcSave.title,
      content: rcSave.content,
      demandPosition: [...copythem],
    };
    saveRecruit(data);
    history.push({
      pathname: location.pathname,
      state: { idx, where: "recruit" },
    });
    setPopUp(false);
  };

  const DelectAll = () => {
    setPopUp(false);
    setPosition([]);
    getPositionList();
    save();
  };

  // (<RruCreateBtn onClick ={() => setPopUp(true)} >
  //             <h2>fuck </h2>
  //             <FontAwesomeIcon icon={faPlusCircle} style={{fontSize:50}}/>
  //         </RruCreateBtn>)
  // {AnnList&&getAnn(AnnList[0].idx)}

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <Container>
        <Section
          title={"Member"}
          message={"Let's team up and make your dreams come true."}
          nav={false}
        />
        <Navbar>
          <NavBtn picked={picked["first"]}>Members</NavBtn>
          <NavBtn picked={picked["second"]}>Recruit</NavBtn>
        </Navbar>
        <MemberData>
          {ann ? (
            <>
              <RecruitOne newAnnList={[ann.data]} type={"Member"}></RecruitOne>
              <List applicant={applicant}></List>
            </>
          ) : (
            <Loader
              type="Rings"
              color="#FF8C94"
              height={300}
              width={300}
              timeout={10000}
            />
          )}
        </MemberData>
      </Container>

      <PopupBkg status={popUp}>
        <PopupUser onSubmit={SumbitHandler}>
          <DelpopupBtn type="button" onClick={DelectAll}>
            <FontAwesomeIcon style={{ fontSize: 35 }} icon={faTimes} />
          </DelpopupBtn>
          <CreateRecruitTitle>Create Recruit</CreateRecruitTitle>
          <div style={{ width: "70%" }}>
            <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
              Title
            </label>
            <RoomInput
              onChange={changeRc}
              data-kind={0}
              placeholder="Please enter at least two characters."
              value={rcSave && rcSave.title}
            />
          </div>
          <div style={{ width: "70%" }}>
            <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
              Description
            </label>
            <RoomInput
              onChange={changeRc}
              data-kind={1}
              style={{ height: 120 }}
              placeholder="Please enter at least ten characters.
    "
              value={rcSave && rcSave.content}
            />
          </div>

          <div style={{ width: "70%" }}>
            <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
              Position
            </label>
            <PositionList>
              {position &&
                position.map((e, idx) => (
                  <PositionBtn
                    key={e.position.idx}
                    id={idx}
                    checked={e.checked}
                    type="button"
                    onClick={PositionBtnHandler}
                  >
                    <PositionTitle id={idx} checked={e.checked} readOnly>
                      {e.name}
                    </PositionTitle>
                    <InputNumber checked={e.checked} id={idx}>
                      <PositionValue
                        value={e.demand}
                        checked={e.checked}
                        id={idx}
                        readOnly
                      ></PositionValue>
                      <InputUpDown>
                        <UpDownBtn
                          type="button"
                          id={idx}
                          onClick={UpDown}
                          data-type={true}
                        >
                          <FontAwesomeIcon
                            id={idx}
                            data-type={true}
                            icon={faAngleUp}
                          />
                        </UpDownBtn>
                        <UpDownBtn
                          type="button"
                          id={idx}
                          onClick={UpDown}
                          data-type={false}
                        >
                          <FontAwesomeIcon
                            id={idx}
                            data-type={false}
                            icon={faAngleDown}
                          />
                        </UpDownBtn>
                      </InputUpDown>
                    </InputNumber>
                  </PositionBtn>
                ))}
            </PositionList>
          </div>
          <div
            style={{ width: "70%", display: "flex", justifyContent: "center" }}
          >
            <Submit value="CREATE" type="submit" disabled={disabled} />
          </div>
        </PopupUser>
      </PopupBkg>
    </motion.div>
  );
};

export default Member;
