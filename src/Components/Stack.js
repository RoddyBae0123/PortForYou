import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faTrashAlt,
  faTrashRestore,
} from "@fortawesome/free-solid-svg-icons";
import wifi from "../wifi";
const Container = styled.div`
  width: 80%;
  border: 3.5px solid #d4d4d4;
  display: grid;
  grid-template-columns: 0.2fr 0.6fr 0.2fr;
  border-radius: 20px;
  position: relative;
  padding: 10px;
  height: 150px;
  margin-bottom: 15px;
  column-gap: 10px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
  border-right: 3.5px solid RGB(212, 212, 212);
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
  width: 70px;
  height: 70px;
  font-size: 40px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 3.5px solid RGB(212, 212, 212);
  box-shadow: 0 3px 6px rgba(149, 157, 165, 0.15);
`;

const LogoName = styled.h3`
  font-size: 25px;
  font-weight: 600;
`;

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  outline: none;
  background-color: white;
  border-radius: 15px;
  font-weight: 500;
  border: 3.5px solid #d4d4d4;
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
  right: 13px;
  top: 10px;
  width: 50px;
  height: 20px;
  border-radius: 10px;
  background-color: white;
  font-size: 15px;
  &:hover {
    background-color: RGB(255, 140, 148);
  }
  transition: all 300ms ease;
  border: 1px solid RGB(255, 140, 148);
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

const Stack = ({
  data,
  stackData,
  detail,
  setDetail,
  getStackList,
  setStack,
}) => {
  const clonedeep = require("lodash.clonedeep");

  const copyData = [];
  const [currentStack, setCurrentStack] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [hideAdd, setHideAdd] = useState(false);
  const [first, setFirst] = useState(false);

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
    data && setDetail([...data]);
    data.map((e) => {
      current.unshift({
        idx: e.stackIdx,
        name: e.stackName,
      });
    });
    data && console.log(data);
    detail && console.log(detail);
    // var copyStackData = stackData && [...clonedeep(stackData)];
    // stackData &&
    //   current.map(
    //     (t) => (copyStackData = copyStackData.filter((e) => e.idx != t.idx))
    //   );
    setCurrentStack(current);

    return;
  }, []);
  currentStack && console.log(currentStack);
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
    e.target.value.length == 0 ? setStack([]) : getStackList(e.target.value);
    setSearchValue(e.target.value);

    {
      stackData && setFirst(true);
    }
  };

  const ChoiceStackBtnHandler = (e) => {
    console.log(e.target.id, e.target.dataset.name);
    let pass = true;

    for (let i = 0; i < currentStack.length; i++) {
      if (currentStack[i].idx == e.target.id) {
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
            stackIdx: parseInt(e.target.id),
            ability: 0,
            stackName: e.target.dataset.name,
          },
        ]);
    }
    {
      pass &&
        setCurrentStack([
          ...currentStack,
          {
            idx: parseInt(e.target.id),
          },
        ]);
    }
    setSearchValue("");
    setStack([]);
  };

  const changeRating = (newRating, name) => {
    const copyDetail = [...detail];
    copyDetail[name].ability = newRating;
    setDetail(copyDetail);
  };

  const returnSearch = () => {
    return (
      <SearchWrap>
        <SearchUl>
          {stackData ? (
            <>
              {stackData.map((e) => (
                <Searchli key={e.idx} id={e.idx} data-name={e.name}>
                  <SearchButton
                    type="button"
                    onClick={ChoiceStackBtnHandler}
                    id={e.idx}
                    data-name={e.name}
                  >
                    <MakeCenter dirc="center" id={e.idx} data-name={e.name}>
                      <img
                        id={e.idx}
                        data-name={e.name}
                        src={`${wifi}api/img/default/${e.name}`}
                        style={{ width: "35%" }}
                      />
                    </MakeCenter>
                    <MakeCenter id={e.idx} data-name={e.name}>
                      <span
                        id={e.idx}
                        data-name={e.name}
                        style={{ fontWeight: 500, fontSize: 30 }}
                      >
                        {e.name}
                      </span>
                    </MakeCenter>
                  </SearchButton>
                </Searchli>
              ))}
            </>
          ) : (
            <div>NoData</div>
          )}
        </SearchUl>
      </SearchWrap>
    );
  };

  return (
    <>
      <AddSearch status={true}>
        <SubTitle>Stack Name</SubTitle>
        <InputSearch
          value={searchValue}
          placeholder="Search"
          onChange={AddBtnHandler}
        ></InputSearch>

        {/* {stackData &&
          currentStack &&
          currentStack.map((e) => (
            <Addli key={e.idx}>
              <CreateStack
                type="button"
                onClick={ChoiceStackBtnHandler}
                id={e.idx}
              >
                {e.name}
              </CreateStack>
            </Addli>
          ))} */}
      </AddSearch>
      {stackData.length != 0 && returnSearch()}
      {currentStack &&
        detail &&
        detail.map((e, idx) => (
          <Container key={e.idx} id={e.stackIdx}>
            <DeleteButton type="button" onClick={delBtnHandler}>
              <FontAwesomeIcon id={e.stackIdx} icon={faTrash}></FontAwesomeIcon>
            </DeleteButton>
            <LogoStructure>
              <Makecenter>
                <Logo>
                  <img
                    src={`${wifi}api/img/default/${e.stackName}`}
                    style={{ width: "70%" }}
                  ></img>
                </Logo>
              </Makecenter>
              <LogoName style={{ textAlign: "center" }}>{e.stackName}</LogoName>
            </LogoStructure>
            <Input
              type="text"
              value={e.content}
              onChange={inputHandler}
              id={idx}
            ></Input>
            <Makecenter
              style={{ borderLeft: "3.5px solid RGB(212, 212, 212)" }}
            >
              <StarRatings
                rating={e.ability}
                starRatedColor="RGB(255, 140, 148)"
                numberOfStars={5}
                starSpacing="5px"
                starDimension="20px"
                changeRating={changeRating}
                name={`${idx}`}
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

export default Stack;
