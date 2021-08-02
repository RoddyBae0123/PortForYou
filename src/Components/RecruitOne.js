import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.button`
  height: 280px;
  border-radius: 34px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: grid;
  grid-template-rows: ${(props) =>
    props.type !== "Member" ? "0.5fr 0.5fr" : "none"};
  grid-template-columns: ${(props) =>
    props.type !== "Member" ? "none" : "1fr 1fr"};
  transition: all 300ms ease-in-out;
  &:hover {
    color: black;
    transform: translateY(-5px);
    box-shadow: 0px 8px 11px rgba(0, 0, 0, 0.24);
  }

  margin: ${(props) => (props.type !== "Member" ? "10px" : "20px 0")};
  width: ${(props) => props.type === "Member" && "100%"};
  position: relative;
`;

const RecruitInfo = styled.div`
  display: grid;
  grid-template-columns: 0.35fr 0.65fr;
  width: 100%;
`;
const SomeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Position = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 25px;
  grid-gap: 5px;
  margin: 10px;
  width: ${(props) => (props.type === "Member" ? "85%" : "90%")};
`;
const PositinOne = styled.li`
  height: 100%;
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  font-size: 5px;
  border: 1px solid lightgray;
  border-radius: 15px;
`;
const Makecenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const PositionText = styled.h4`
  font-size: 7px;
  font-weight: 400;
`;
const RecruitPic = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 100%;
  border: 1.5px solid lightgray;
`;

const RecruitOne = ({
  newAnnList,
  type,
  setPopup,
  setRecruitIdx,
  setResult,
  ann,
}) => {
  const show = (idx) => {
    setPopup(true);
    setRecruitIdx(idx);
    setResult(undefined);
  };
  const returnData = () => {
    return type && newAnnList ? (
      newAnnList.map((e) => (
        <Container onClick={() => show(e.idx)} key={e.idx} type={type}>
          <Makecenter>
            <RecruitInfo>
              <SomeInfo>
                <RecruitPic
                  src={"https://avatars.githubusercontent.com/u/68287181?v=4"}
                  style={{ marginBottom: 10 }}
                />
                <h3>{e.study.user.name}</h3>
              </SomeInfo>
              <SomeInfo>
                <h1 style={{ fontSize: 28, fontWeight: 600, marginBottom: 15 }}>
                  {e.title}
                </h1>
                <h5 style={{ fontSize: 10, fontWeight: 500 }}>
                  {e.content.substring(0, 200)}...
                </h5>
              </SomeInfo>
            </RecruitInfo>
          </Makecenter>

          <Makecenter>
            <Position type={type}>
              {e.demandPosition.map((e) => (
                <PositinOne key={e.idx}>
                  <Makecenter>
                    <PositionText id={e.position.idx}>
                      {e.position.name.substring(0, 7)}..
                    </PositionText>
                  </Makecenter>
                  <Makecenter>
                    <PositionText>
                      {e.applied}/{e.demand}
                    </PositionText>
                  </Makecenter>
                </PositinOne>
              ))}
            </Position>
          </Makecenter>
        </Container>
      ))
    ) : (
      <div>sdasdasdasd</div>
    );
  };
  return newAnnList ? returnData() : null;
};

export default RecruitOne;
