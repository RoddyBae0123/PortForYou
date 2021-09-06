import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { GroupAddSharp, Translate } from "@material-ui/icons";
import RecruitOne from "./RecruitOne";
import RoomOne from "./RoomOne";
import { faLastfmSquare } from "@fortawesome/free-brands-svg-icons";
import Loader from "react-loader-spinner";

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 0.25fr 0.25fr 0.25fr;
  grid-gap: 20px;
  border-radius: 50px;
  width: 100%;
  border: ${(props) => (props.status ? "1px solid lightgray" : "none")};
  position: relative;
  margin: 45px 0;
`;

const Title = styled.div`
  width: 50px;
  height: 20px;
  background-color: white;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -10px;
  left: 100px;
  text-align: center;
  font-weight: 700;
  display: ${(props) => (props.status ? "block" : "none")};
`;

const Makecenter = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ListWrapper = ({
  status,
  kind,
  study,
  annList,
  setRecruitIdx,
  setPopup,
  setResult,
  getAnnList,
  type,
}) => {
  const srcList = [
    "https://blog.kakaocdn.net/dn/DxPyJ/btqQwmsj2wr/a4k4hul2q1rnQ3HLbxTdek/img.gif",
    "https://thumbs.gfycat.com/CraftyDelectableHoneyeater-size_restricted.gif",
    "",
  ];

  study && console.log(study);
  const oneReturn = (kind) => {
    switch (kind) {
      case "RecruitOne":
        return (
          <>
            <RecruitOne
              annList={annList}
              type={"recruit"}
              setRecruitIdx={setRecruitIdx}
              setPopup={setPopup}
              setResult={setResult}
            />
          </>
        );
        break;

      case "RoomOne":
        return (
          <>
            <RoomOne study={study} />
          </>
        );
        break;
    }
  };

  return annList || study ? (
    <Container status={status} kind={kind}>
      <Title status={status}>AD</Title>
      {oneReturn(kind)}
    </Container>
  ) : (
    <Makecenter>
      <Loader
        type="Ball-Triangle	"
        color="var(--color-theme)"
        height={100}
        width={100}
        timeout={10000}
      />
    </Makecenter>
  );
};

export default ListWrapper;
