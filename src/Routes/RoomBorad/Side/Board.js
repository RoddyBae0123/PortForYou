import styled from "styled-components";
import { connect } from "react-redux";
import Popup from "../../../Components/Popup";
import { actionCreators } from "../../../store";
import { useState, useEffect } from "react";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.75fr 0.25fr;
  width: 100%;
  height: 100vh;
`;

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: rgb(74, 86, 94);
  display: inline-flex;
`;

const Left = styled.div`
  display: grid;
  grid-template-rows: 0.1fr 0.55fr 0.35fr;
  height: 100%;
  width: 80%;
`;
const Right = styled.div`
  width: 100%;
  height: 100%;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;

const DashBoard = styled.div`
  width: 80%;
  height: 90%;
  border-radius: 20px;
  box-shadow: 0 3px 6px lightgray;
  position: relative;
  display: ${(props) => (props.list ? "flex" : "block")};
  justify-content: center;
  align-items: center;
`;

const CreateBoard = styled.button`
  width: ${(props) => (props.list ? "50px" : "200px")};
  height: ${(props) => (props.list ? "25px" : "100px")};
  border-radius: 20px;
  /* box-shadow: 0 3px 6px lightgray; */
  /* 2px solid lightgray */
  border: ${(props) => (props.list ? "2px solid lightgray" : "none")};
  position: ${(props) => (props.list ? "absolute" : "static")};
  box-shadow: ${(props) => (props.list ? "none" : "0 3px 6px lightgray")};
  right: 15px;
  top: 10px;
`;

const BoardList = styled.div`
  padding: 50px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 0.9fr 0.1fr;
  row-gap: 15px;
`;

const BoardUl = styled.ul`
  display: grid;
  grid-template-rows: 16.666fr 16.666fr 16.666fr 16.666fr 16.666fr 16.666fr;
  row-gap: 10px;
`;
const BoardLi = styled.li`
  display: grid;
  grid-template-columns: 0.1fr 0.4fr 0.3fr 0.2fr;
  width: 100%;
  box-shadow: ${(props) => (props.header ? "none" : "0 3px 6px lightgray")};
  border-radius: 15px;
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
const Board = ({ data, setData, match }) => {
  const {
    params: { idx: studyIdx },
  } = match;
  const [boardPopup, setBoardPopup] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState({ name: "", content: "" });
  useEffect(() => {
    if (value.name.length > 10 && value.content.length > 10) {
      setDisabled(false);
    }

    console.log(disabled);
  }, [value]);

  const popupContents = () => (
    <Flex
      setting={{
        justify: "space-evenly",
        align: "center",
        dir: "column",
      }}
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

  const submitHandler = () => {
    setData.setBoardList({
      studyIdx,
      name: value.name,
      content: value.content,
    });
  };

  return (
    <>
      {data && data.boardList ? (
        <Container>
          <Flex setting={{ justify: "center", align: "flex-end", dir: "rows" }}>
            <Left>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
              >
                <Text size={"30px"} weight={"800"}>
                  Our Board
                </Text>
              </Flex>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
              >
                <DashBoard list={!data.boardList.length}>
                  <CreateBoard
                    onClick={() => setBoardPopup(true)}
                    list={!data.boardList.length}
                  >
                    {!data.boardList.length ? "Create a Board" : "CREATE"}
                  </CreateBoard>
                  {!data.boardList.length ? null : (
                    <BoardList>
                      <BoardUl>
                        <BoardLi header={true}>
                          <span></span>
                          <Text size={"17px"} weight={"800"}>
                            Title
                          </Text>
                          <Text size={"17px"} weight={"800"}>
                            Author
                          </Text>
                          <Text size={"17px"} weight={"800"}>
                            Day
                          </Text>
                        </BoardLi>
                        <BoardLi>
                          <Flex
                            setting={{
                              justify: "center",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"12px"} weight={"500"}>
                              1
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"500"}>
                              Title of Dashboard
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <ChatImg
                              size={"25px"}
                              url={
                                "http://3.37.208.251:8080/api/img/default/33_profile_img"
                              }
                            />
                            <Text
                              size={"15px"}
                              weight={"400"}
                              style={{ marginLeft: 15 }}
                            >
                              Yuri
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"400"}>
                              2021/08/16
                            </Text>
                          </Flex>
                        </BoardLi>
                        <BoardLi>
                          <Flex
                            setting={{
                              justify: "center",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"12px"} weight={"500"}>
                              1
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"500"}>
                              Title of Dashboard
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <ChatImg
                              size={"25px"}
                              url={
                                "http://3.37.208.251:8080/api/img/default/33_profile_img"
                              }
                            />
                            <Text
                              size={"15px"}
                              weight={"400"}
                              style={{ marginLeft: 15 }}
                            >
                              Yuri
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"400"}>
                              2021/08/16
                            </Text>
                          </Flex>
                        </BoardLi>
                        <BoardLi>
                          <Flex
                            setting={{
                              justify: "center",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"12px"} weight={"500"}>
                              1
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"500"}>
                              Title of Dashboard
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <ChatImg
                              size={"25px"}
                              url={
                                "http://3.37.208.251:8080/api/img/default/33_profile_img"
                              }
                            />
                            <Text
                              size={"15px"}
                              weight={"400"}
                              style={{ marginLeft: 15 }}
                            >
                              Yuri
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"400"}>
                              2021/08/16
                            </Text>
                          </Flex>
                        </BoardLi>
                        <BoardLi>
                          <Flex
                            setting={{
                              justify: "center",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"12px"} weight={"500"}>
                              1
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"500"}>
                              Title of Dashboard
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <ChatImg
                              size={"25px"}
                              url={
                                "http://3.37.208.251:8080/api/img/default/33_profile_img"
                              }
                            />
                            <Text
                              size={"15px"}
                              weight={"400"}
                              style={{ marginLeft: 15 }}
                            >
                              Yuri
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"400"}>
                              2021/08/16
                            </Text>
                          </Flex>
                        </BoardLi>
                        <BoardLi>
                          <Flex
                            setting={{
                              justify: "center",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"12px"} weight={"500"}>
                              1
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"500"}>
                              Title of Dashboard
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <ChatImg
                              size={"25px"}
                              url={
                                "http://3.37.208.251:8080/api/img/default/33_profile_img"
                              }
                            />
                            <Text
                              size={"15px"}
                              weight={"400"}
                              style={{ marginLeft: 15 }}
                            >
                              Yuri
                            </Text>
                          </Flex>
                          <Flex
                            setting={{
                              justify: "flex-start",
                              align: "center",
                              dir: "rows",
                            }}
                          >
                            <Text size={"15px"} weight={"400"}>
                              2021/08/16
                            </Text>
                          </Flex>
                        </BoardLi>
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
            </Left>
          </Flex>

          <Right></Right>
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

export default connect(getCurrentState)(Board);
