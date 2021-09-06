import React, { useEffect } from "react";
import styled from "styled-components";
import Loader from "react-loader-spinner";

const Container = styled.div`
  height: 400px;
  border-radius: 15px;
  background-color: white;
  display: grid;
  grid-template-rows: ${(props) =>
    props.type !== "Member" ? "0.3fr 0.5fr 0.2fr" : "none"};
  grid-template-columns: ${(props) =>
    props.type !== "Member" ? "none" : "1fr"};
  transition: all 300ms ease-in-out;

  margin: ${(props) => (props.type !== "Member" ? "0 0 20px 0" : "20px 0")};
  width: ${(props) => (props.type === "Member" ? "100%" : "100%")};
  position: relative;
  padding: 20px;
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

  .title {
    display: inline-block;
    font-family: "Roboto", sans-serif;
    background: transparent;
    font-size: 20px;
    font-weight: 700;
    text-align: center;
    background: -webkit-linear-gradient(
      rgba(119, 138, 255, 1),
      rgba(46, 91, 255, 1)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 5px 0px;
  }

  .content {
    font-size: 8px;
    opacity: 0.35;
  }
`;
const Position = styled.ul`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 25px;
  grid-gap: 5px;
  margin: 10px;
  width: ${(props) => (props.type === "Member" ? "85%" : "90%")}; */

  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: flex-start;

  flex-wrap: wrap;
  margin: 0 -0.25rem !important;
  &::-webkit-scrollbar {
    width: 12px;
    background-color: var(--color-background);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-text-ver3);
  }
  gap: 5px;

  .position-item {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    padding: 3px 8px;
    border: 0;
    border-radius: 0.55rem;
    color: #263747;
    overflow: hidden;
    background-color: var(--color-text-ver4);
    box-shadow: none;
    list-style: none;
    padding: 10px 10px;
  }
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
  width: 50px;
  height: 50px;
  border-radius: 15px;
`;

const RecruitBtn = styled.button`
  height: 50px;
  width: 120px;
  background-color: ${(props) =>
    props.dir ? "var( --color-button)" : "white"};
  border-radius: 10px;
  border: ${(props) => !props.dir && "1px solid var( --color-text-ver3)"};
  color: ${(props) => (props.dir ? "white" : "var( --color-button)")};
  font-size: 20px;
  font-weight: 500;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;
const RecruitOne = ({ annList, type, setPopup, setRecruitIdx, setResult }) => {
  annList && console.log(annList);
  const show = (idx) => {
    setPopup(true);
    setRecruitIdx(idx);
    setResult && setResult(undefined);
  };
  var pattern_kor = /[¤¡-¤¾|¤¿-¤Ó|°¡-ÆR]/;

  const returnData = () => {
    return type && annList && annList ? (
      annList.map((e) => (
        <Container key={e.idx} type={type}>
          <Makecenter>
            <RecruitInfo>
              <SomeInfo>
                <RecruitPic
                  src={e.study.user.img}
                  style={{ marginBottom: 10 }}
                />
                <h3 className="basic">{e.study.user.name}</h3>
              </SomeInfo>
              <SomeInfo>
                <h1
                  style={{ fontSize: 28, fontWeight: 600, marginBottom: 15 }}
                  className="basic title"
                >
                  {e.title.length < 10
                    ? pattern_kor.test(e.title)
                      ? e.title.substring(0, 5) + "..."
                      : e.title
                    : pattern_kor.test(e.title)
                    ? e.title.substring(0, 5)
                    : e.title.substring(0, 10) + "..."}
                </h1>
                <h5
                  style={{ fontSize: 10, fontWeight: 500 }}
                  className="basic content"
                >
                  "
                  {e.content.length < 25
                    ? e.content
                    : e.content.substring(0, 25) + "..."}
                  "
                </h5>
              </SomeInfo>
            </RecruitInfo>
          </Makecenter>

          <Makecenter>
            <Position type={type}>
              {e.demandPosition.map((e) => (
                <li key={e.idx} className="position-item">
                  <Makecenter style={{ marginRight: 20 }}>
                    <PositionText id={e.position.idx} className="basic">
                      {e.position.name}
                    </PositionText>
                  </Makecenter>
                  <Makecenter>
                    <PositionText className="basic">
                      {e.applied}/{e.demand}
                    </PositionText>
                  </Makecenter>
                </li>
              ))}
            </Position>
          </Makecenter>
          <Flex
            setting={{
              justify: "space-between",
              align: "flex-start",
              dir: "row",
            }}
          >
            <RecruitBtn
              dir={true}
              className="basic"
              onClick={() => show(e.idx)}
            >
              APPLY
            </RecruitBtn>
            <RecruitBtn dir={false} className="basic">
              SAVE
            </RecruitBtn>
          </Flex>
        </Container>
      ))
    ) : (
      <div>sdasdasdasd</div>
    );
  };
  return annList ? returnData() : null;
};

export default RecruitOne;
