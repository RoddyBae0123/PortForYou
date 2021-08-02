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
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 85%;
  margin-top: 45px;
  position: relative;
`;
const Title2 = styled.div`
  width: 70px;
  height: 20px;
  background-color: white;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -10px;
  left: 90px;
  text-align: center;
  font-weight: 700;
  display: ${(props) => (props.status ? "block" : "none")};
`;

const Recruit = ({ history, newAnnList }) => {
  const [popup, setPopup] = useState(undefined);
  const [recruitIdx, setRecruitIdx] = useState(undefined);
  const [ann, setAnn] = useState(undefined);
  const [port, setPort] = useState(undefined);
  const [result, setResult] = useState(undefined);

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
        stack: e.stack,
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

  useEffect(() => {
    if (popup) {
      getAnn(recruitIdx);
      getPortFolioList();
    }
  }, [popup]);
  const returnDiv = () => {
    return <div>{result == 201 ? "Success Aplication" : "failed bitch"}</div>;
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <Container>
        <MdataProcessing
          title={"Recruit"}
          message={"Let's team up and make your dreams come true."}
          nav={true}
          connect={"Recruit"}
        ></MdataProcessing>
        <ListWrapper
          status={true}
          newAnnList={newAnnList}
          kind={"RecruitOne"}
          setRecruitIdx={setRecruitIdx}
          setPopup={setPopup}
          getAnn={getAnn}
          setResult={setResult}
        />
        <NewCgry>
          <Title2 status={true}>New</Title2>
        </NewCgry>
        <ListWrapper
          status={false}
          newAnnList={newAnnList}
          kind={"RecruitOne"}
          setRecruitIdx={setRecruitIdx}
          setPopup={setPopup}
          getAnn={getAnn}
          setResult={setResult}
        />
      </Container>
      {returnDetail(popup)}
      {popup == false && result ? returnPopup(popup) : null}
    </motion.div>
  );
};

export default memo(Recruit);
