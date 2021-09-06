import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import MdataProcessing from "../../../Components/MdataProcessing";
import ListWrapper from "../../../Components/ListWrapper";
import RecruitOne from "../../../Components/RecruitOne";
import { useState, memo, useEffect } from "react";
import RecruitDetail from "../../../Components/RecruitDetail";
import { studyApi, portFolioApi } from "../../../Api";
import Popup from "../../../Components/Popup";
import Navigation from "../../../Components/Navigation";
import Section from "../../../Components/Section";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 50px 0 0 0;
`;
const Title = styled.h1`
  font-size: 35px;
  font-weight: 700;
  margin-right: 20px;
`;
const SubTitle = styled.h5`
  font-size: 21px;
  font-weight: 400;
`;
const Button = styled.button`
  font-size: 20px;
  color: #a2a2a2;
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

const SearchForm = styled.form`
  margin-right: 20px;
  display: grid;
  grid-template-columns: 230px 40px;
  height: 40px;
  border-radius: 4px;
`;
const Input = styled.input`
  border: 1px solid var(--color-border);
  outline: none;
  font-size: 20px;
  border-radius: 10px 0 0 10px;
  border-right: none;
  background-color: var(--color-background);
`;
const Submit = styled.input`
  border: 1px solid var(--color-border);
  border-radius: 0 10px 10px 0;
  background-color: var(--color-background);
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
  color: ${(props) => props.color};
  display: inline-flex;
`;

const Recruit = ({
  history,
  otherAnnList,
  getOtherAnnList,
  setAlcondition,
  alCondition,
}) => {
  const [popup, setPopup] = useState(undefined);
  const [recruitIdx, setRecruitIdx] = useState(undefined);
  const [ann, setAnn] = useState(undefined);
  const [port, setPort] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const [search, setSearch] = useState("fuck");

  useEffect(() => {
    otherAnnList && console.log(otherAnnList);
  }, []);

  const getAnn = async (idx) => {
    try {
      const { data } = await studyApi.getAnnouncement(idx);

      if (data) {
        var copyData = data;
        const checkedPosition = copyData.demandPosition.map((e) => ({
          idx: e.idx,
          position: e.position,
          studyAnnouncementIdx: e.studyAnnouncementIdx,
          demand: e.demand,
          applied: e.applied,
          checked: false,
        }));
        copyData.demandPosition = checkedPosition;
        setAnn(copyData);
      }
    } catch (e) {
      console.log(e);
    }
  };

  {
    ann && console.log(ann);
  }
  {
    port && console.log(port);
  }
  const getPortFolioList = async () => {
    const { data } = await portFolioApi.getPortFolioList();
    if (data) {
      var copyData = data;
      const checkedPort = copyData.map((e) => ({
        idx: e.idx,
        title: e.title,
        content: e.content,
        reg_date: e.reg_date,
        position: e.position,
        stack: e.tech,
        education: e.education,
        checked: false,
      }));
      setPort(checkedPort);
    }
  };

  const returnDetail = (popup) =>
    popup ? (
      <RecruitDetail
        popup={popup}
        setPopup={setPopup}
        ann={ann}
        setAnn={setAnn}
        port={port}
        getPortFolioList={getPortFolioList}
        setPort={setPort}
        setResult={setResult}
        type={"recruit"}
      ></RecruitDetail>
    ) : null;

  const returnPopup = (popup) => (
    <Popup
      status={!popup}
      component={returnDiv}
      second={3000}
      size={{ height: "200px", width: "350px" }}
    ></Popup>
  );

  const returnSearch = (type) =>
    type ? (
      <SearchForm onSubmit={searchSubmitBtn}>
        <Input type="text"></Input>
        <Submit type="submit" value="&#128269;"></Submit>
      </SearchForm>
    ) : null;

  // const SearchTyping = (e) => {
  //   setSearch(e.target.value);
  // };
  // useState(() => {
  //   console.log(search);
  // }, [search]);
  const searchSubmitBtn = (e) => {
    e.preventDefault();
    localStorage.setItem("search", e.target[0].value);
    setAlcondition({
      pno: 1,
      kind: "search",
      query: localStorage.getItem("search"),
    });
  };
  const body = document.querySelector("body");
  useEffect(() => {
    if (popup) {
      getAnn(recruitIdx);
      getPortFolioList();
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [popup]);
  const returnDiv = () => {
    return <div>{result == 201 ? "Success Aplication" : "failed bitch"}</div>;
  };
  const navbar = [
    {
      idx: 130,
      component: (state) =>
        state ? (
          <>
            {/* <NewCgry>
              <Title2 status={true}>Recommend</Title2>
            </NewCgry> */}
            <ListWrapper
              status={false}
              annList={otherAnnList.announcements}
              kind={"RecruitOne"}
              setRecruitIdx={setRecruitIdx}
              setPopup={setPopup}
              getAnn={getAnn}
              setResult={setResult}
              getAnnList={getOtherAnnList}
            />
          </>
        ) : null,
      name: "Recommend",
      page: otherAnnList && {
        pno: otherAnnList.pno,
        lastPno: otherAnnList.lastPno,
      },
    },
    {
      idx: 131,
      component: (state) =>
        state ? (
          <>
            {/* <NewCgry>
              <Title2 status={true}>New</Title2>
            </NewCgry> */}
            <ListWrapper
              status={false}
              annList={otherAnnList.announcements}
              kind={"RecruitOne"}
              setRecruitIdx={setRecruitIdx}
              setPopup={setPopup}
              getAnn={getAnn}
              setResult={setResult}
              getAnnList={getOtherAnnList}
            />
          </>
        ) : null,
      name: "New",
      page: otherAnnList && {
        pno: otherAnnList.pno,
        lastPno: otherAnnList.lastPno,
      },
    },
    {
      idx: 132,
      component: (state) =>
        state ? (
          <>
            {/* <NewCgry>
              <Title2 status={true}>Imminent</Title2>
            </NewCgry> */}
            <ListWrapper
              status={false}
              annList={otherAnnList.announcements}
              kind={"RecruitOne"}
              setRecruitIdx={setRecruitIdx}
              setPopup={setPopup}
              getAnn={getAnn}
              setResult={setResult}
              getAnnList={getOtherAnnList}
            />
          </>
        ) : null,
      name: "Imminent",
      page: otherAnnList && {
        pno: otherAnnList.pno,
        lastPno: otherAnnList.lastPno,
      },
    },
    {
      idx: 133,
      component: (state) =>
        state ? (
          <>
            {/* <NewCgry>
              <Title2 status={true}>Search</Title2>
            </NewCgry> */}
            <ListWrapper
              status={false}
              annList={otherAnnList.announcements}
              kind={"RecruitOne"}
              setRecruitIdx={setRecruitIdx}
              setPopup={setPopup}
              getAnn={getAnn}
              setResult={setResult}
              getAnnList={getOtherAnnList}
            />
          </>
        ) : null,
      name: "Search",
      page: otherAnnList && {
        pno: otherAnnList.pno,
        lastPno: otherAnnList.lastPno,
      },
      query: localStorage.getItem("search"),
    },
  ];

  return (
    <>
      <Container>
        <Flex
          style={{
            width: "80%",
            height: "100px",
          }}
          setting={{
            justify: "space-between",
            align: "center",
            dir: "row",
          }}
        >
          <Flex
            setting={{
              justify: "flex-start",
              align: "center",
              dir: "row",
            }}
          >
            <Text size={"35px"} weight={"300"} style={{ color: "black" }}>
              Recruit List
            </Text>
            <Text
              size={"15px"}
              weight={"600"}
              style={{ color: "var(--color-text-ver2)", marginLeft: "10px" }}
            >
              123 Total
            </Text>
          </Flex>

          {/* <AddBtn>
            <h5>+ ADD RESUME</h5>
          </AddBtn> */}
        </Flex>
        {otherAnnList && (
          <Navigation
            navbar={navbar}
            change={setAlcondition}
            data={alCondition}
            additup={returnSearch}
          />
        )}
      </Container>
      {returnDetail(popup)}
      {popup == false && result ? returnPopup(popup) : null}
    </>
  );
};

export default memo(Recruit);
