import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import MdataProcessing from "../../../Components/MdataProcessing";
import ListWrapper from "../../../Components/ListWrapper";
import { useEffect, useState } from "react";
import Section from "../../../Components/Section";
import Navigation from "../../../Components/Navigation";
import Popup from "../../../Components/Popup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NewCgry = styled.div`
  border-top: 1px solid lightgray;
  width: 100%;
  margin-top: 45px;
  position: relative;
`;
const Title2 = styled.div`
  background-color: white;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -30px;
  left: 90px;
  text-align: center;
  font-weight: 700;
  padding: 20px;
  display: ${(props) => (props.status ? "block" : "none")};
`;
const CreateRoomBtn = styled.button`
  width: 70px;
  height: 30px;
  border: 1px solid #b6b6b6;
  border-radius: 10px;
  color: #b6b6b6;
  font-weight: 500;
  font-size: 12px;
  &:hover {
    color: white;
    background: #b6b6b6;
  }
  transition: all 300ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-right: 30px;
`;

const CreateRoomTitle = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 50px 0;
`;

const CreateContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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
const SubmitButton = styled.input`
  width: 25%;
  height: 65px;
  border-radius: 20px;
  &:hover {
    background-color: #4a565e;
    color: white;
  }
  border: 5px solid #4a565e;
  font-weight: 500;
  transition: all 300ms ease-out;
  color: #4a565e;
  opacity: ${(props) => (props.status ? 0.1 : 1)};
  pointer-events: ${(props) => (props.status ? "none" : "auto")};
  margin-bottom: 50px;
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  background-color: RGB(238, 238, 238);
  border: none;
  outline: none;
  font-size: 35px;
  font-weight: 500;
  padding: 10px;
  &:focus {
    background-color: RGB(244, 248, 247);
  }
  transition: all 300ms ease-out;
  font-size: 17px;
`;
const Room = ({
  match,
  history,
  getStudyList,
  setStudy,
  study,
  roomCondition,
  setRoomCondition,
}) => {
  const [name, setName] = useState("Manage");
  const [popup, setPopup] = useState();
  useEffect(() => {
    getStudyList(false);
  }, []);

  console.log(history);

  const navbar = [
    {
      idx: 130,
      component: (state) =>
        state ? (
          <>
            <NewCgry>
              <Title2 status={true}>Managed</Title2>
            </NewCgry>
            <ListWrapper
              status={false}
              kind={"RoomOne"}
              study={study}
            ></ListWrapper>
          </>
        ) : null,
      name: "Managed",
      page: { pno: 1, lastPno: 1 },
    },
    {
      idx: 131,
      component: (state) =>
        state ? (
          <>
            <NewCgry>
              <Title2 status={true}>Joined</Title2>
            </NewCgry>
            <ListWrapper
              status={false}
              kind={"RoomOne"}
              study={study}
            ></ListWrapper>
          </>
        ) : null,
      name: "Joined",
      page: { pno: 1, lastPno: 1 },
    },
  ];

  const returnButton = (type) => {
    return type ? (
      <CreateRoomBtn onClick={createBtnHandler}>Create</CreateRoomBtn>
    ) : null;
  };
  const createBtnHandler = (e) => {
    setPopup(true);
  };

  const returnPopup = (e) => (
    <Popup
      status={true}
      component={returnDiv}
      size={{ width: "900px", height: "600px" }}
      setPopup={setPopup}
    />
  );

  const returnDiv = (e) => (
    <CreateContainer>
      <CreateRoomTitle>Create Room</CreateRoomTitle>
      <div style={{ width: "70%", marginBottom: "50px" }}>
        <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
          Title
        </label>
        <RoomInput
          data-kind={0}
          // onChange={setRoomValue}
          // value={room.title}
          placeholder="Please enter at least two characters.
"
        ></RoomInput>
      </div>
      <div style={{ width: "70%", marginBottom: "50px" }}>
        <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
          Description
        </label>
        <RoomInput
          // data-kind={1}
          // onChange={setRoomValue}
          style={{ height: 150 }}
          // value={room.content}
          placeholder="Please enter at least ten characters.
"
        ></RoomInput>
      </div>
      <div style={{ width: "70%", marginBottom: "50px" }}>
        <label style={{ marginBottom: 15, fontSize: 23, fontWeight: 500 }}>
          Category
        </label>
        <Select
          data-kind={2}
          // onChange={setRoomValue}
          // value={room.studyCategory["idx"]}
        >
          <option value="">--Please choose an option--</option>
          {/* {catgry &&
            catgry.map((e) => (
              <option key={e.idx} value={e.idx}>
                {e.title}
              </option>
            ))} */}
        </Select>
      </div>
      <SubmitButton
        type="submit"
        // status={disabled}
        // disabled={disabled}
        value="Create"
      ></SubmitButton>
    </CreateContainer>
  );

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Container>
        <Section
          title={"Room"}
          message={"Let's team up and make your dreams come true."}
          nav={false}
        />
        {study && (
          <Navigation
            navbar={navbar}
            data={roomCondition}
            change={setRoomCondition}
            additup={returnButton}
          />
        )}

        {/* <ListWrapper
          status={false}
          kind={"RoomOne"}
          study={study}
        ></ListWrapper> */}
        {popup && returnPopup()}
      </Container>
    </motion.div>
  );
};

export default Room;
