import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTrashAlt,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import wifi from "../wifi";
import { connect } from "react-redux";
import { actionCreators } from "../store";

const Container = styled.div`
  width: 100%;
  border: 2px solid var(--color-border);
  display: grid;
  grid-template-columns: 0.125fr 0.675fr 0.2fr;
  border-radius: 6.5px;
  position: relative;
  padding: 10px;
  height: 150px;
  margin-bottom: 15px;
  column-gap: 10px;
  background-color: white;
`;
const Makecenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoStructure = styled.div`
  display: grid;
  grid-template-rows: 0.7fr 0.3fr;
`;
const SubTitle = styled.h1`
  background-color: white;
  position: absolute;
  top: -0.5rem;
  left: 3.5rem;
  padding: 0 7px;
  font-weight: 500;
`;

const Logo = styled.div`
  width: 60px;
  height: 60px;
  font-size: 40px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-focus);
  border: 2px solid var(--color-border);
`;

const LogoName = styled.h3`
  font-size: 25px;
  font-weight: 600;
  color: var(--color-text-ver1);
`;

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: white;
  font-weight: 300;
  border: 2px solid var(--color-border);
  background-color: var(--color-background);
  padding: 10px;
  resize: none;
`;

const AddSearch = styled.div`
  width: 80%;
  background-color: white;
  border-radius: 15px;
  border: 3.5px solid #d4d4d4;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: auto;
  position: relative;
  display: ${(props) => (props.status ? "flex" : "none")};
  margin-bottom: 20px;
`;

const Addli = styled.li`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  border: 3.5px solid RGB(255, 140, 148);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CreateStack = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--color-button);
  font-size: 12px;
  color: white;
`;

const AddBtn = styled.button`
  width: 230px;
  height: 60px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 20px;
  background-color: white;
  border: 3.5px solid RGB(255, 140, 148);
  display: ${(props) => (props.status ? "none" : "block")};
  &:hover {
    background-color: RGB(255, 140, 148);
  }
  transition: all 300ms ease;
  margin: 30px 0 150px 0;
`;

const InputSearch = styled.input`
  font-size: 30px;
  font-weight: 500;
  width: 100%;
  border: none;
  outline: none;
  margin: 20px;
`;

const SearchWrap = styled.div`
  width: 80%;
  box-shadow: 0 0.5rem 0.75rem rgb(20 20 94 / 6%),
    0 1.25rem 1.25rem -0.125rem rgb(20 20 94 / 12%),
    0 1.5rem 2.125rem -0.125rem rgb(20 20 94 / 6%),
    0 2rem 2.5rem -2rem rgb(20 20 94 / 5%);
  border-radius: 15px 15px 0 0;
`;

const SearchUl = styled.ul`
  display: grid;
  grid-auto-rows: 100px;
  width: 100%;
`;

const Searchli = styled.li`
  height: 100%;

  opacity: 0.5;
  transition: all 300ms ease-in;
  &:hover {
    opacity: 1;
  }
`;

const SearchButton = styled.button`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 0.15fr 0.85fr;
`;
const MakeCenter = styled.div`
  display: flex;
  height: 100%;
  justify-content: ${(props) => props.dirc};
  align-items: center;
`;

const InputNew = styled.input`
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

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  display: inline-flex;
`;
const Stack = ({
  tech,
  stackData,
  detail,
  setDetail,
  getStackList,
  setStack,
  data,
  addToDo,
}) => {
  const clonedeep = require("lodash.clonedeep");
  const copyData = [];
  const [currentStack, setCurrentStack] = useState();
  const [searchValue, setSearchValue] = useState("");

  const [hideAdd, setHideAdd] = useState(false);
  const [first, setFirst] = useState(false);

  const [stack, setNowStack] = useState();
  const inputValue = useRef();

  // useEffect(() => {
  //   let copyDetail, copyCurrent;

  //   if (detail && stackData) {
  //     copyDetail = clonedeep(detail);
  //     copyCurrent = clonedeep(currentStack);
  //     copyCurrent.map((e) => {
  //       copyDetail = copyDetail.filter((t) => t.idx != e.stackIdx);
  //     });
  //     setCurrentStack(copyStackData);
  //   }
  // }, [detail]);

  useEffect(() => {
    const current = [];
    tech && setDetail([...tech]);
    tech &&
      tech.map((e) => {
        current.unshift({
          idx: e.stackIdx,
          name: e.stackName,
        });
      });
    // var copyStackData = stackData && [...clonedeep(stackData)];
    // stackData &&
    //   current.map(
    //     (t) => (copyStackData = copyStackData.filter((e) => e.idx != t.idx))
    //   );
    setCurrentStack(current);

    return;
  }, []);

  useEffect(() => {
    data && data.stackListReal && setNowStack(data.stackListReal);
  }, [data]);

  const inputHandler = (e) => {
    const { value, id } = e.target;
    let copyDetail = [...detail];

    copyDetail[id].content = value;
    setDetail(copyDetail);
  };

  const delBtnHandler = (e) => {
    const DelId = e.target.parentElement.id;
    let copyDetail = clonedeep(detail);
    copyDetail = copyDetail.filter((e) => e.stackIdx != DelId);
    setDetail(copyDetail);
    let copyStackData = clonedeep(stackData);
    copyDetail.map((e) => {
      copyStackData = copyStackData.filter((t) => t.idx != e.stackIdx);
    });
    setCurrentStack(copyStackData);
  };

  const AddBtnHandler = (e) => {
    e.target.value.length == 0
      ? addToDo("data", "stackListReal", [])
      : getStackList({ name: e.target.value, type: "stack" });

    {
      stackData && setFirst(true);
    }
  };

  const ChoiceStackBtnHandler = (idx, name) => {
    // console.log(e.target.id, e.target.dataset.name);
    let pass = true;

    for (let i = 0; i < currentStack.length; i++) {
      if (currentStack[i].idx == idx) {
        pass = false;
        break;
      } else {
        continue;
      }
    }

    {
      pass &&
        setDetail([
          ...detail,
          {
            content: "",
            stackIdx: parseInt(idx),
            ability: 0,
            stackName: name,
          },
        ]);
    }
    {
      pass &&
        setCurrentStack([
          ...currentStack,
          {
            idx: parseInt(idx),
          },
        ]);
    }
    inputValue.current.value = "";
    addToDo("data", "stackListReal", []);
    setStack([]);
  };

  const changeRating = (newRating, name) => {
    const copyDetail = [...detail];
    copyDetail[name].ability = newRating;
    setDetail(copyDetail);
  };

  const returnSearch = () => {
    return (
      // <SearchWrap>
      //   <SearchUl>
      //     {stack ? (
      //       <>
      //         {stack.map((e) => (
      //           <Searchli key={e.idx} id={e.idx} data-name={e.name}>
      //             <SearchButton
      //               type="button"
      //               onClick={ChoiceStackBtnHandler}
      //               id={e.idx}
      //               data-name={e.name}
      //             >
      //               <MakeCenter dirc="center" id={e.idx} data-name={e.name}>
      //                 <img
      //                   id={e.idx}
      //                   data-name={e.name}
      //                   src={`${wifi}api/img/default/stack_image_${e.idx}`}
      //                   style={{ width: "35%" }}
      //                 />
      //               </MakeCenter>
      //               <MakeCenter id={e.idx} data-name={e.name}>
      //                 <span
      //                   id={e.idx}
      //                   data-name={e.name}
      //                   style={{ fontWeight: 500, fontSize: 30 }}
      //                 >
      //                   {e.name}
      //                 </span>
      //               </MakeCenter>
      //             </SearchButton>
      //           </Searchli>
      //         ))}
      //       </>
      //     ) : null}
      //   </SearchUl>
      // </SearchWrap>
      <div>fuck</div>
    );
  };

  return (
    <>
      {/* <AddSearch status={true}>
        <SubTitle>Stack Name</SubTitle>
        <InputSearch
          value={searchValue}
          placeholder="Search"
          onChange={AddBtnHandler}
        ></InputSearch>

     
      </AddSearch> */}

      <InputNew
        name="P_DESCRIPTION"
        className="basic"
        as={"div"}
        style={{ position: "relative" }}
      >
        <FormControl>
          <input
            type="text"
            autoFocus
            placeholder="Enter Stack"
            className="search-input"
            onChange={(e) => AddBtnHandler(e)}
            ref={inputValue}
          />
        </FormControl>
        {stack && stack.length ? (
          <div className="search-wrap">
            <ul className="search-list">
              {stack.map((e) => (
                <li
                  className="search-item"
                  key={e.idx}
                  onClick={() => {
                    ChoiceStackBtnHandler(e.idx, e.name);
                    // addStack(idx, e.idx, e.name, inputValue.current[idx]);
                    // setNowStack(undefined);
                  }}
                >
                  {e.name}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </InputNew>
      {/* {stack && stack.length != 0 && returnSearch()} */}
      {currentStack &&
        detail &&
        detail.map((e, idx) => (
          <Container key={e.idx} id={e.stackIdx}>
            <DeleteButton
              type="button"
              onClick={delBtnHandler}
              className="basic"
            >
              DEL
            </DeleteButton>
            <LogoStructure>
              <Makecenter>
                <Logo>
                  <img
                    src={`${wifi}api/img/default/stack_image_${e.stackIdx}`}
                    style={{ width: "70%" }}
                  ></img>
                </Logo>
              </Makecenter>
              <LogoName style={{ textAlign: "center" }} className="basic">
                {e.stackName}
              </LogoName>
            </LogoStructure>
            <Input
              type="text"
              value={e.content}
              onChange={inputHandler}
              id={idx}
              placeholder="please type your skill "
              className="basic"
            ></Input>
            <Makecenter>
              <StarRatings
                rating={e.ability}
                starRatedColor="var(--color-button)"
                numberOfStars={5}
                starSpacing="5px"
                starDimension="24px"
                changeRating={changeRating}
                name={`${idx}`}
                starHoverColor="var(--color-button)"
              />
            </Makecenter>
          </Container>
        ))}

      {/* <AddBtn status={hideAdd} type="button" onClick={AddBtnHandler}>
        Add Stack
      </AddBtn> */}
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
export default connect(getCurrentState, mapDispatchToProps)(Stack);
