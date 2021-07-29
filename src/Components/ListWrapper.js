import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { GroupAddSharp, Translate } from "@material-ui/icons";
import RecruitOne from "./RecruitOne";
import RoomOne from "./RoomOne";
import { faLastfmSquare } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 33.3%);
  background-color: white;
  border-radius: 50px;
  width: 85%;
  border: ${(props) => (props.status ? "1px solid lightgray" : "none")};
  position: relative;
  padding: 10px 10px;
  margin-top: 45px;
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

const ListWrapper = ({
  status,
  kind,
  study,
  newAnnList,
  setRecruitIdx,
  setPopup,
  setResult,
}) => {
  const srcList = [
    "https://blog.kakaocdn.net/dn/DxPyJ/btqQwmsj2wr/a4k4hul2q1rnQ3HLbxTdek/img.gif",
    "https://thumbs.gfycat.com/CraftyDelectableHoneyeater-size_restricted.gif",
  ];

  const oneReturn = (kind) => {
    switch (kind) {
      case "RecruitOne":
        return (
          <>
            {" "}
            <RecruitOne
              newAnnList={newAnnList}
              type={"recruit"}
              setRecruitIdx={setRecruitIdx}
              setPopup={setPopup}
              setResult={setResult}
            />{" "}
            <RecruitOne /> <RecruitOne />
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

  return (
    <Container status={status}>
      <Title status={status}>AD</Title>
      {oneReturn(kind)}
    </Container>
  );
};

export default ListWrapper;
