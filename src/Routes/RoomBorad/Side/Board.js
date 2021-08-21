import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Popup from "../../../Components/Popup";
import Loader from "react-loader-spinner";
import { boardApi } from "../../../Api";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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

const InputWrap = styled.div`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: ${(props) => props.height};
  background-color: RGB(238, 238, 238);
  border: none;
  outline: none;
  font-size: 17px;
  font-weight: 500;
  padding: 10px;
  transition: all 300ms ease-out;
  resize: none;
`;
const Submit = styled.input`
  height: 50px;
  width: 170px;
  border: none;
  outline: none;
  border: 2px solid lightgray;
  border-radius: 20px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  background-color: transparent;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  &:hover {
    background-color: lightgray;
    color: white;
  }
  transition: all 300ms ease;
`;

const Ul = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
  grid-auto-rows: 150px;
  grid-gap: 20px;
`;
const Li = styled.li`
  width: 100%;
  height: 100%;
`;

const BoardOne = styled.div`
  display: grid;
  grid-template-rows: 25% 25% 25% 25%;
  background-color: rgba(216, 216, 216, 0.2);
  row-gap: 1px;
  width: 100%;
  height: 100%;
  box-shadow: 0 3px 6px lightgray;
`;

const CreateBoard = styled.button`
  width: 60px;
  height: 30px;
  border-radius: 20px;
  /* box-shadow: 0 3px 6px lightgray; */
  /* 2px solid lightgray */
  border: 2px solid lightgray;

  font-size: 5px;
`;
const Board = ({ data, setData, match, getData }) => {
  const {
    params: { studyIdx },
  } = match;
  const [boardPopup, setBoardPopup] = useState(false);
  const [warningPopup, setWaningPopup] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({ name: "", content: "" });
  const [post, setPost] = useState();
  const [setting, setSetting] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    data && getPrepost();
  }, [data]);
  console.log(post);
  useEffect(() => {
    if (value.name.length > 2 && value.content.length > 10) {
      setDisabled(false);
    }
  }, [value]);
  useEffect(() => {
    boardPopup == false && setValue({ name: "", content: "" });
  }, [boardPopup]);

  const getPrepost = async () => {
    try {
      data.boardList.map(async (e) => {
        const res = await boardApi.getPosts(e.idx);

        setPost((prevState) => ({
          [e.idx]: res.data.slice(0, 3),
          ...prevState,
        }));
      });
      setSetting(true);
    } catch (e) {
      console.log(e);
    }
  };

  const popupContents = () => (
    <Flex
      setting={{
        justify: "space-evenly",
        align: "center",
        dir: "column",
      }}
      style={{ height: "100%" }}
      as={"form"}
    >
      <Text size={"50px"} weight={"700"} as={"span"}>
        Create Board
      </Text>
      <InputWrap style={{ width: "80%" }}>
        <Text
          size={"23px"}
          weight={"500"}
          as={"label"}
          style={{ marginBottom: 20 }}
        >
          Name
        </Text>
        <Input
          height={"50px"}
          value={value.name}
          data-type="name"
          onChange={inputOnchangeHandler}
        />
      </InputWrap>
      <InputWrap style={{ width: "80%" }}>
        <Text
          size={"23px"}
          weight={"500"}
          as={"label"}
          style={{ marginBottom: 20 }}
        >
          Contents
        </Text>
        <Input
          height={"200px"}
          as={"textarea"}
          value={value.content}
          data-type="content"
          onChange={inputOnchangeHandler}
        />
      </InputWrap>
      <Submit
        type="submit"
        value="CREATE"
        disabled={disabled}
        onClick={submitHandler}
      />
    </Flex>
  );
  const returnCreateBoard = (boardPopup) =>
    boardPopup && (
      <Popup
        status={true}
        component={popupContents}
        size={{ width: "800px", height: "670px" }}
        setPopup={setBoardPopup}
        notover={true}
      />
    );

  const warningContents = () => (
    <Flex
      setting={{
        justify: "space-evenly",
        align: "center",
        dir: "column",
      }}
      style={{ height: "100%" }}
    >
      <Text size={"20px"} weight={"700"}>
        Do you really want to delete this Board?
      </Text>
      <Flex
        setting={{
          justify: "space-evenly",
          align: "center",
          dir: "rows",
        }}
      >
        <Text
          size={"20px"}
          weight={"500"}
          as={"button"}
          style={{
            border: "1px solid lightgray",
            padding: "10px 20px 10px 20px",
            borderRadius: 10,
          }}
          onClick={() => delBtnHandler(selected)}
        >
          Yes
        </Text>
        <Text
          size={"20px"}
          weight={"500"}
          as={"button"}
          style={{
            border: "1px solid lightgray",
            padding: "10px 20px 10px 20px",
            borderRadius: 10,
          }}
          onClick={() => setWaningPopup(false)}
        >
          No
        </Text>
      </Flex>
    </Flex>
  );

  const returnWarning = (warning) =>
    warning && (
      <Popup
        status={true}
        size={{ width: "500px", height: "400px" }}
        setPopup={setWaningPopup}
        component={warningContents}
        notover={true}
      />
    );

  const inputOnchangeHandler = (e) => {
    e.target.dataset.type == "name"
      ? setValue({
          name: e.target.value,
          content: value.content,
        })
      : setValue({
          name: value.name,
          content: e.target.value,
        });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setBoardPopup(false);
    setValue({ name: "", content: "" });
    setData.setBoardList({
      studyIdx,
      name: value.name,
      content: value.content,
    });
  };

  const delBtnHandler = async (idx) => {
    try {
      const res = await boardApi.deleteBoard(idx);

      res && getData.getBoardList();
    } catch (e) {
      console.log(e);
    } finally {
      setWaningPopup(false);
    }
    // const data = await boardApi();
  };
  return (
    <>
      {data && setting && post && data.boardList ? (
        <Container>
          <Flex
            setting={{
              justify: "space-between",
              align: "flex-end",
              dir: "rows",
            }}
            style={{
              width: "80%",
              padding: "30px 0",
              borderBottom: "2px solid lightgray",
            }}
          >
            <Text size={"40px"} weight={"700"}>
              Our Board
            </Text>
            <CreateBoard onClick={() => setBoardPopup(true)}>
              CREATE
            </CreateBoard>
          </Flex>
          <Flex
            setting={{
              justify: "flex-start",
              align: "center",
              dir: "rows",
            }}
            style={{ width: "80%", marginTop: "35px" }}
          >
            <Ul>
              {data.boardList.map((e) => (
                <Li key={e.idx}>
                  <BoardOne>
                    <Flex
                      setting={{
                        justify: "space-between",
                        align: "center",
                        dir: "rows",
                      }}
                      style={{ background: "transparent", padding: "0 10px" }}
                    >
                      <Text size={"20px"} weight={"700"}>
                        <Link
                          to={{
                            pathname: `/roomboard/${studyIdx}/board/${e.idx}/post`,
                            state: { idx: studyIdx, where: "room" },
                          }}
                        >
                          {e.name.length > 15
                            ? e.name.substring(0, 15) + "..."
                            : e.name}
                        </Link>
                      </Text>
                      <Text
                        size={"10px"}
                        weight={"900"}
                        as={"button"}
                        onClick={() => {
                          setWaningPopup(true);
                          setSelected(e.idx);
                        }}
                      >
                        X
                      </Text>
                    </Flex>
                    <Flex
                      setting={{
                        justify: "flex-start",
                        align: "center",
                        dir: "rows",
                      }}
                      style={{
                        background: "white",
                        color: "black",
                        padding: "0 10px",
                      }}
                    >
                      <Text
                        size={"10px"}
                        weight={"400"}
                        as={Link}
                        to={{
                          pathname:
                            post[e.idx] &&
                            post[e.idx][0] &&
                            `/roomboard/${studyIdx}/board/${e.idx}/postDetail/${
                              post[e.idx][0].idx
                            }`,
                          state: { idx: studyIdx, where: "room" },
                        }}
                      >
                        {post[e.idx] && post[e.idx][0]
                          ? post[e.idx][0].title
                          : "none"}
                      </Text>
                    </Flex>

                    <Flex
                      setting={{
                        justify: "flex-start",
                        align: "center",
                        dir: "rows",
                      }}
                      style={{
                        background: "white",
                        color: "black",
                        padding: "0 10px",
                      }}
                    >
                      <Text
                        size={"10px"}
                        weight={"400"}
                        as={Link}
                        to={{
                          pathname:
                            post[e.idx] &&
                            post[e.idx][1] &&
                            `/roomboard/${studyIdx}/board/${e.idx}/postDetail/${
                              post[e.idx][1].idx
                            }`,
                          state: { idx: studyIdx, where: "room" },
                        }}
                      >
                        {post[e.idx] && post[e.idx][1]
                          ? post[e.idx][1].title
                          : "none"}
                      </Text>
                    </Flex>

                    <Flex
                      setting={{
                        justify: "flex-start",
                        align: "center",
                        dir: "rows",
                      }}
                      style={{
                        background: "white",
                        color: "black",
                        padding: "0 10px",
                      }}
                    >
                      <Text
                        size={"10px"}
                        weight={"400"}
                        as={Link}
                        to={{
                          pathname:
                            post[e.idx] &&
                            post[e.idx][2] &&
                            `/roomboard/${studyIdx}/board/${e.idx}/postDetail/${
                              post[e.idx][2].idx
                            }`,
                          state: { idx: studyIdx, where: "room" },
                        }}
                      >
                        {post[e.idx] && post[e.idx][2]
                          ? post[e.idx][2].title
                          : "none"}
                      </Text>
                    </Flex>
                  </BoardOne>
                </Li>
              ))}
            </Ul>
          </Flex>
        </Container>
      ) : (
        <Container style={{ justifyContent: "center" }}>
          <Loader
            type="ThreeDots"
            color="lightgray"
            height={300}
            width={300}
            timeout={10000}
          />
        </Container>
      )}
      {returnCreateBoard(boardPopup)}
      {returnWarning(warningPopup)}
    </>
  );
};
const getCurrentState = (state, ownProps) => {
  console.log(state, ownProps);

  return state;
};
export default connect(getCurrentState)(Board);
