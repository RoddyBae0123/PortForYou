import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faJava,
  faPython,
  faKorvue,
  faCuttlefish,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faBell,
  faEnvelopeOpenText,
  faFileAlt,
  faPenNib,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Route, Switch, Link } from "react-router-dom";
import { useState } from "react";

const ResumeOne = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 17px;
`;
const Document = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const DataList = styled.div`
  /* border-top:0.2px solid rgba(0, 0, 0, 0.35);
    border-bottom:0.2px solid rgba(0, 0, 0, 0.05); */
  /* border: 0.2px solid rgba(0, 0, 0, 0.35); */
  height: 100px;
  display: grid;
  grid-template-columns: 0.35fr 0.35fr 0.2fr 0.1fr;
  column-gap: 10px;
  width: 100%;
  padding: 20px 0;
  transition: all 300ms ease-in-out;
  /* &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 3px 6px var(--color-text-ver2);
  } */
  background-color: white;
`;
const IntroduceCon = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const Makecenter = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const DelEdit = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  font-size: 15px;
  color: RGB(74, 86, 94);
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 300ms ease-in-out;
  &:hover {
    color: red;
    transform: rotate(15deg);
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const TR = styled.tr`
  transition: all 300ms ease-in;

  width: 100%;
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
  color: rgb(74, 86, 94);
  display: inline-flex;
`;

const Img = styled.div`
  width: ${(props) => props.size.width};
  height: ${(props) => props.size.height};
  background-image: url("${(props) => props.src}");
  background-size: 100% auto;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 100%;
  border: 1.5px solid var(--color-border);
`;

const PositionGrid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(8, 25px);
`;

const SexyLink = styled(Link)``;
const Tr = ({ data, DelResumeBtn }) => {
  console.log(data);
  return data ? (
    <>
      <DataList
        style={{
          backgroundColor: "transparent",
          height: "100%",
          width: "100%",
        }}
      >
        <Flex
          setting={{
            justify: "flex-start",
            align: "center",
            dir: "row",
          }}
          style={{ marginLeft: "25px" }}
        >
          <Text
            weight={"500"}
            size={"15px"}
            style={{ color: "var(--color-text-ver3)", letterSpacing: "1.5px" }}
          >
            IMG AND TITLE/CONTENTS
          </Text>
        </Flex>
        <Flex
          setting={{
            justify: "flex-start",
            align: "center",
            dir: "row",
          }}
        >
          <Text
            weight={"500"}
            size={"15px"}
            style={{ color: "var(--color-text-ver3)", letterSpacing: "1.5px" }}
          >
            STACK/POSITION
          </Text>
        </Flex>
        <Flex
          setting={{
            justify: "center",
            align: "center",
            dir: "row",
          }}
        >
          <Text
            weight={"500"}
            size={"15px"}
            style={{ color: "var(--color-text-ver3)", letterSpacing: "1.5px" }}
          >
            DATE
          </Text>
        </Flex>
        <Flex
          setting={{
            justify: "center",
            align: "center",
            dir: "row",
          }}
        >
          <Text
            weight={"500"}
            size={"15px"}
            style={{ color: "var(--color-text-ver3)", letterSpacing: "1.5px" }}
          >
            DELETE
          </Text>
        </Flex>
      </DataList>
      {data.map((e) => (
        <TR key={`${e.idx}`}>
          <ResumeOne key={`${e.idx}`} style={{ padding: 0 }}>
            <DataList>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "row",
                }}
              >
                <Img
                  src={
                    "https://dimg.donga.com/wps/SPORTS/IMAGE/2021/08/30/108821990.1.jpg"
                  }
                  size={{ width: "45px", height: "45px" }}
                  style={{ margin: "0 25px" }}
                />
                <IntroduceCon>
                  <Makecenter>
                    <SexyLink to={`resume/${e.idx}`}>
                      <Title>{e.title}</Title>
                    </SexyLink>
                  </Makecenter>
                  <Makecenter>
                    <h5>{e.content.substring(0, 150)}...</h5>
                  </Makecenter>
                </IntroduceCon>
              </Flex>

              <IntroduceCon>
                <PositionGrid>
                  {e.tech.map((e) => (
                    <Img
                      src={`http://3.37.208.251:8080/api/img/default/stack_image_${e.stackIdx}`}
                      size={{ width: "25px", height: "25px" }}
                    />
                  ))}
                </PositionGrid>
                <Makecenter>
                  <h5 style={{ fontWeight: "500", letterSpacing: "50%" }}>
                    {e.position.name}
                  </h5>
                </Makecenter>
              </IntroduceCon>

              <Flex
                setting={{
                  justify: "center",
                  align: "center",
                  dir: "row",
                }}
              >
                <Text
                  weight={"700"}
                  size={"15px"}
                  style={{
                    color: "blue",
                    letterSpacing: "1.5px",
                  }}
                >
                  {e.regDate.substring(0, 10)}
                </Text>
              </Flex>

              <Makecenter
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <DelEdit id={e.idx} onClick={DelResumeBtn}>
                  <FontAwesomeIcon id={e.idx} icon={faTrash} size="2x" />
                </DelEdit>
              </Makecenter>
            </DataList>
          </ResumeOne>
        </TR>
      ))}
    </>
  ) : (
    <div>none</div>
  );
};

export default Tr;
