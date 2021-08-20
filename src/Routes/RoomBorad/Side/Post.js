import styled from "styled-components";
import { connect } from "react-redux";
import Popup from "../../../Components/Popup";
import { actionCreators } from "../../../store";
import { useState, useEffect } from "react";
import { KeyboardArrowDown } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { boardApi } from "../../../Api";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  align-items: center;
  height: 100vh;
`;

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: rgb(74, 86, 94);
  display: inline-flex;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;

const DashBoard = styled.div`
  width: 100%;
  height: 500px;
`;

const CreateBoard = styled(Link)`
  width: 60px;
  height: 30px;
  border-radius: 20px;
  /* box-shadow: 0 3px 6px lightgray; */
  /* 2px solid lightgray */
  border: 2px solid lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5px;
`;

const BoardList = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 100%;
`;

const BoardUl = styled.ul`
  display: grid;
  grid-auto-rows: 60px;
  row-gap: 10px;
`;
const BoardLi = styled.li`
  display: grid;
  grid-template-columns: 0.4fr 0.2fr 0.2fr 0.1fr 0.1fr;
  width: 100%;
  background-color: ${(props) =>
    props.header ? "transparent" : "rgba(216, 216, 216, 0.2)"};
  height: ${(props) => (props.header ? "50%" : "100%")};
`;

const PageBtn = styled.button`
  width: 20px;
  height: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  color: rgb(74, 86, 94);
  font-size: 9px;
`;

const ChatImg = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100%;
  box-shadow: 0 3px 6px lightgray;
  background-image: ${(props) => `url(${props.url})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
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

const MovetoDetail = styled(Link)`
  font-size: 15px;
  &:hover {
    color: lightblue;
  }
  background-color: transparent;
  font-weight: 500;
  transition: all 300ms ease;
`;
const Post = ({ data, setData, match, getData }) => {
  const {
    params: { studyIdx, boardIdx },
  } = match;

  const [boardPopup, setBoardPopup] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({ name: "", content: "" });
  const [board, setBoard] = useState();

  useEffect(() => {
    getBoard();
  }, []);

  useEffect(() => {
    getData && getData.getPosts(boardIdx);
  }, [getData]);
  useEffect(() => {
    if (value.name.length > 10 && value.content.length > 10) {
      setDisabled(false);
    }
  }, [value]);
  useEffect(() => {
    boardPopup == false && setValue({ name: "", content: "" });
  }, [boardPopup]);

  const getBoard = async () => {
    const { data } = await boardApi.getBoard(boardIdx);
    data && setBoard(data);
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
        Create Post
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
    setData.setPost({
      boardIdx,
      title: value.name,
      content: value.content,
    });
  };

  // const paging = (e) => {
  //   try {
  //     for (let i = 5 * e - 5; i < 5 * e; i++) {
  //       if (data.boardList[i] == null) {
  //         break;
  //       }
  //       setNow([...now, data.boardList[i]]);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <>
      {board ? (
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
              {board.name}
            </Text>
            <CreateBoard
              to={{
                pathname: `/roomboard/${studyIdx}/board/${boardIdx}/postDetail/create/postEdit`,
                state: { idx: studyIdx, where: "room", boardIdx },
              }}
            >
              CREATE
            </CreateBoard>
          </Flex>
          <Flex
            setting={{
              justify: "flex-start",
              align: "center",
              dir: "rows",
            }}
            style={{ width: "80%" }}
          >
            <DashBoard>
              {data.posts && !data.posts.length ? null : (
                <BoardList>
                  <BoardLi header={true} as={"lable"} style={{ height: 50 }}>
                    <Text
                      size={"20px"}
                      weight={"800"}
                      style={{ marginLeft: 20 }}
                    >
                      Title
                    </Text>
                    <Text size={"20px"} weight={"800"}>
                      Author
                    </Text>
                    <Text size={"20px"} weight={"800"}>
                      Day
                    </Text>
                    <Text size={"20px"} weight={"800"}>
                      Views
                    </Text>
                  </BoardLi>
                  <BoardUl>
                    {data.posts &&
                      data.posts.map((e) => (
                        <BoardLi key={e.idx}>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                            style={{ height: "100%" }}
                          >
                            <Text
                              size={"15px"}
                              weight={"500"}
                              style={{ marginLeft: 20 }}
                            >
                              <MovetoDetail
                                to={{
                                  pathname: `/roomboard/${studyIdx}/board/${boardIdx}/postdetail/${e.idx}`,
                                  state: { idx: studyIdx, where: "room" },
                                }}
                              >
                                {e.title}
                              </MovetoDetail>
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                            style={{ height: "100%" }}
                          >
                            <ChatImg size={"25px"} url={e.user.img} />
                            <Text
                              size={"15px"}
                              weight={"400"}
                              style={{ marginLeft: 15 }}
                            >
                              {e.user.name}
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                            style={{ height: "100%" }}
                          >
                            <Text size={"15px"} weight={"400"}>
                              {e.regDate.substring(0, 10)}
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                            style={{ height: "100%" }}
                          >
                            <Text size={"15px"} weight={"400"}>
                              16
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "center",
                              align: "center",
                              dir: "rows",
                            }}
                            style={{ height: "100%" }}
                          >
                            <Text size={"15px"} weight={"400"} as={"button"}>
                              <KeyboardArrowDown />
                            </Text>
                          </Flex>
                        </BoardLi>
                      ))}
                  </BoardUl>
                  <Flex
                    setting={{
                      justify: "space-evenly",
                      align: "center",
                      dir: "rows",
                    }}
                  >
                    <PageBtn>1</PageBtn>
                  </Flex>
                </BoardList>
              )}
            </DashBoard>
          </Flex>
        </Container>
      ) : (
        <div>waiting</div>
      )}
      {returnCreateBoard(boardPopup)}
    </>
  );
};

const getCurrentState = (state, ownProps) => {
  console.log(state, ownProps);

  return state;
};

export default connect(getCurrentState)(Post);
