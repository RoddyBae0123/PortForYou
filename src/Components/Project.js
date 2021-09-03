import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTrashAlt,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import { portFolioApi } from "../Api";
import { connect } from "react-redux";
import { actionCreators } from "../store";

const Container = styled.div`
  width: 100%;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  margin-bottom: 30px;
  padding: 30px;
`;
const Makecenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.h1`
  background-color: white;
  position: absolute;
  top: -0.5rem;
  left: 6.5rem;
  padding: 0 14px;
  font-weight: 500;
  color: var(--color-text-ver2);
`;

const Section = styled.h1`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid var(--color-border);
  width: 100%;
  height: 60px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 400;
  margin-bottom: 20px;
  background-color: var(--color-background);
  transition: border 300ms ease-out;
  padding: 0 20px;
  .search-wrap {
    width: 100%;
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 0.75rem rgb(20 20 94 / 6%),
      0 1.25rem 1.25rem -0.125rem rgb(20 20 94 / 12%),
      0 1.5rem 2.125rem -0.125rem rgb(20 20 94 / 6%),
      0 2rem 2.5rem -2rem rgb(20 20 94 / 5%);
    overflow: hidden;
    position: absolute;
    z-index: 2000;
    left: 0;
  }
  .search-list {
    width: 100%;
    max-height: 13.125rem;
    background-color: white;
    overflow-y: auto;
    cursor: pointer;
    &::-webkit-scrollbar {
      width: 12px;
      background-color: var(--color-background);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--color-text-ver3);
    }
  }
  .search-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem !important;
    border-bottom: 1px solid #dee2e6;
    &:hover {
      background: var(--color-button);
    }
  }
  .search-footer {
    width: 100%;
    height: 3.75rem;
    color: #98a8b9;
    background-color: #f7f7fb;
    border-top: 1px solid #dee2e6;
    padding: 1rem !important;
    cursor: pointer;
  }
`;

const ContentInput = styled.textarea`
  outline: none;
  border: 1px solid var(--color-border);
  width: 100%;
  height: 180px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 400;
  margin-bottom: 20px;
  background-color: var(--color-background);
  transition: border 300ms ease-out;
  padding: 20px;
  resize: none;
`;

const Stacks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  position: relative;
  grid-gap: 15px;
`;

const Button = styled.button`
  background-color: #ededed;
  width: 100%;
  height: 60px;
  border-radius: 20px;
  opacity: ${(props) => (props.select ? "1" : "0.34")};
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 33px;
  top: 20px;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--color-button);
  font-size: 12px;
  color: white;
`;

const AddBtn = styled.button`
  width: 240px;
  height: 60px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 20px;
  color: white;
  background-color: blue;
  &:hover {
    background-color: RGB(255, 140, 148);
  }
  transition: all 300ms ease;
  margin: 20px 0;
`;

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  display: inline-flex;
`;

const FormControl = styled.div`
  height: 50px;
  min-height: 2.5rem;
  height: 100%;
  display: flex;
  .select-list {
    width: 100%;
    padding: 0 0.5rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 -0.25rem !important;
  }
  .select-item {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    margin: 0 2.5px;
    padding: 3px 8px;
    border: 0;
    border-radius: 0.25rem;
    color: #263747;
    overflow: hidden;
    background-color: #d7e2eb;
    box-shadow: none;
    list-style: none;
  }
  .select-list .input {
    height: 1.25rem;
    background-color: transparent;
    display: inline-flex;
    padding-left: 0.125rem;
  }
  .search-input {
    width: 100%;
    color: #263747;
    font-size: 1rem;
    border: none;
    background-color: transparent;
    padding: 0;
    outline: none;
  }
`;

const Project = ({ setDetail, detail, data, getData, addToDo }) => {
  const clonedeep = require("lodash.clonedeep");

  const [nowStack, setNowStack] = useState();
  const [send, setSend] = useState({});
  const inputValue = useRef([]);

  console.log(data);
  useEffect(() => {
    data && setNowStack(data.stackList);
  }, [data]);

  console.log(detail);

  useEffect(() => {
    let copyDetail = clonedeep(detail);
    if (nowStack && copyDetail) {
      for (const [key, value] of Object.entries(nowStack)) {
        if (copyDetail[key]) {
          copyDetail[key].nowStack = value.data;
        }
      }
      setDetail(copyDetail);
    }

    console.log(nowStack);
  }, [nowStack]);

  // useEffect(() => {
  //   data.map((e, idx) => {
  //     deliVery.unshift({
  //       idx: e.idx,
  //       content: e.content,
  //       stack: e.stack,
  //       title: e.title,
  //       id: idx,
  //     });
  //   });

  //   setDetail(deliVery);

  //   return;
  // }, []);

  const onChange = (event) => {
    const { value, name, id } = event.target;
    let copyDetail = [...detail];
    if (name == "P_TITLE") {
      copyDetail[id].title = value;
    } else if (name == "P_DESCRIPTION") {
      copyDetail[id].content = value;
    }

    setDetail(copyDetail);
  };

  const StackBtnHandler = (event) => {
    const grandFather = event.target.parentElement.parentElement.id;
    const selected = event.target.dataset.select;
    const selectedId = event.target.id;
    const value = event.target.innerHTML;
    let copyDetail = [...clonedeep(detail)];

    if (selected != "true") {
      // copyDetail[grandFather].stack.push({
      // });
      copyDetail[grandFather].stack.push({
        idx: parseInt(selectedId),
        name: value,
        content: value,
      });
      setDetail(copyDetail);
    } else {
      copyDetail[grandFather].stack = copyDetail[grandFather].stack.filter(
        (e) => e.idx != selectedId
      );
      setDetail(copyDetail);
    }
    copyDetail.map((e) => {
      if (e.stack.length === 0) {
        e.stack.push({
          idx: 7,
          name: "etc",
          content: "etc",
        });
      }
      setDetail(copyDetail);
    });
  };
  const DeleteBtnHandler = (e) => {
    const DelId = e.target.parentElement.id;

    let copyDetail = [...clonedeep(detail)];
    copyDetail = copyDetail.filter((e, idx) => idx != DelId);

    setDetail(copyDetail);
  };

  const AddBtnHandler = (e) => {
    let copyDetail = clonedeep(detail);
    copyDetail.push({
      title: "",
      content: "",
      stack: [
        {
          idx: 7,
          name: "etc",
          content: "etc",
        },
      ],
      nowStack: [],
      id: copyDetail.length > 0 ? copyDetail.length : 0,
    });

    setDetail(copyDetail);
  };

  const searchStack = (idx, name) => {
    if (name.length === 0) {
      let copyNowStack = clonedeep(nowStack);
      // copyNowStack[idx] = {};
      if (copyNowStack[idx]) {
        copyNowStack[idx].data = [];
      }
      addToDo("data", "stackList", []);
      setNowStack(copyNowStack);
    } else {
      let copyDetail = clonedeep(detail);

      data && data.stackList
        ? getData.getStackList({ name, idx, nowStack, type: "project" })
        : getData.getStackList({ name, idx, type: "project" });
      if (nowStack && nowStack[idx]) {
        copyDetail[idx].nowStack = nowStack[idx].data;
        setDetail(copyDetail);
      }
      // setNowStack((prevState) => [...prevState, { [idx]: data.stackList }]);
    }
  };

  const addStack = (idx, stackIdx, name, inputValue) => {
    let overlap = false;

    for (let i = 0; i < detail[idx].stack.length; i++) {
      if (detail[idx].stack[i].idx == stackIdx) {
        overlap = true;
        break;
      }
    }
    let copyDetail = clonedeep(detail);

    if (!overlap) {
      copyDetail[idx].stack = [
        ...copyDetail[idx].stack,
        { idx: stackIdx, name: name, content: stackIdx },
      ];
    }
    copyDetail[idx].nowStack = [];
    addToDo("data", "stackList", []);

    inputValue.value = "";
    setDetail(copyDetail);
  };

  const delStack = (idx, stackIdx) => {
    let copyDetail = clonedeep(detail);
    console.log(stackIdx);
    copyDetail[idx].stack = copyDetail[idx].stack.filter(
      (e) => e.idx != stackIdx
    );
    console.log(copyDetail);
    setDetail(copyDetail);
  };

  const selectedStack = (idx) => {
    return (
      <>
        {detail[idx].stack.map((e) => (
          <li className="select-item" key={e.idx}>
            <Text
              weight={"500"}
              className="basic"
              color={"black"}
              size={"12px"}
            >
              {e.name}
            </Text>
            <Text
              weight={"500"}
              className="basic"
              color={"var(--color-text-ver3)"}
              size={"15px"}
              as={"button"}
              type="button"
              style={{ padding: "0 0 0 10px" }}
              onClick={() => delStack(idx, e.idx)}
            >
              X
            </Text>
          </li>
        ))}
      </>
    );
  };
  return (
    <>
      {detail &&
        detail.map((e, idx) => (
          <Container key={idx} id={idx}>
            <SubTitle className="basic">PROJECT {idx + 1}</SubTitle>
            <DeleteButton
              id={idx}
              onClick={DeleteBtnHandler}
              type="button"
              className="basic"
            >
              DEL
            </DeleteButton>
            <Text
              weight={"500"}
              className="basic"
              color={"var(--color-text-ver3)"}
              size={"14px"}
              style={{ letterSpacing: "1.5px", marginBottom: "15px" }}
            >
              TITLE
            </Text>
            <Input
              placeholder="Please enter Title of Project"
              value={e.title}
              type="text"
              name="P_TITLE"
              id={idx}
              onChange={onChange}
              className="basic"
            />
            <Text
              weight={"500"}
              className="basic"
              color={"var(--color-text-ver3)"}
              size={"14px"}
              style={{ letterSpacing: "1.5px", marginBottom: "15px" }}
            >
              DESCRIPTION
            </Text>
            <ContentInput
              placeholder="Please enter Description of Project"
              value={e.content}
              type="text"
              name="P_DESCRIPTION"
              id={idx}
              onChange={onChange}
              className="basic"
            ></ContentInput>
            <Text
              weight={"500"}
              className="basic"
              color={"var(--color-text-ver3)"}
              size={"14px"}
              style={{ letterSpacing: "1.5px", marginBottom: "15px" }}
            >
              STACK
            </Text>
            <Input
              name="P_DESCRIPTION"
              className="basic"
              as={"div"}
              style={{ position: "relative" }}
            >
              <FormControl>
                <ul className="select-list">
                  {selectedStack(idx)}
                  <li className="select-item input">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Enter Stack"
                      className="search-input"
                      onChange={(e) => searchStack(idx, e.target.value)}
                      ref={(elem) => (inputValue.current[idx] = elem)}
                    />
                  </li>
                </ul>
              </FormControl>
              {e.nowStack && e.nowStack.length ? (
                <div className="search-wrap">
                  <ul className="search-list">
                    {e.nowStack.map((e) => (
                      <li
                        className="search-item"
                        key={e.idx}
                        onClick={() => {
                          addStack(idx, e.idx, e.name, inputValue.current[idx]);
                          setNowStack(undefined);
                        }}
                      >
                        {e.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </Input>
            {/* <Stacks id={idx}>
              {
                ((someStack = []),
                e.stack.map((e) => {
                  someStack.push(e.name);
                }))
              }
              {stackData &&
                stackData.map((e) => (
                  <Makecenter key={e.idx}>
                    <Button
                      id={e.idx}
                      select={someStack.includes(`${e.name}`)}
                      type="button"
                      data-select={someStack.includes(`${e.name}`)}
                      onClick={StackBtnHandler}
                    >
                      {e.name}
                    </Button>
                  </Makecenter>
                ))}
            </Stacks> */}
          </Container>
        ))}
      <AddBtn type="button" onClick={AddBtnHandler} className="basic">
        ADD PROJECT
      </AddBtn>
    </>
  );
};
const getCurrentState = (state, ownProps) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (dataType, dataName, data) =>
      dispatch(actionCreators.addToDo(dataType, dataName, data)),
  };
};
export default connect(getCurrentState, mapDispatchToProps)(Project);
