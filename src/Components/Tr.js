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
  grid-template-columns: 0.1fr 0.7fr 0.3fr 0.1fr;
  column-gap: 10px;
  width: 90%;
  padding: 20px 0;
  border-radius: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transition: all 300ms ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 11px rgba(0, 0, 0, 0.24);
  }
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
const SexyLink = styled(Link)``;
const Tr = ({ data, DelResumeBtn }) => {
  return data.map((e) => (
    <TR key={`${e.idx}`}>
      <ResumeOne key={`${e.idx}`} style={{ padding: 0 }}>
        <DataList>
          <Document>
            {" "}
            <FontAwesomeIcon
              icon={faFileAlt}
              size="2x"
              style={{ color: "RGB(74, 86, 94)" }}
            />
          </Document>
          <IntroduceCon>
            <Makecenter>
              <SexyLink to={`resume/${e.idx}`}>
                <Title>{e.title}</Title>
              </SexyLink>
            </Makecenter>
            <Makecenter>
              <h5>{e.content}</h5>
            </Makecenter>
          </IntroduceCon>
          <IntroduceCon>
            <Makecenter style={{ fontSize: "10px" }}>
              {e.stack.map((e) => {
                switch (e.name) {
                  case "Kotlin":
                    return <FontAwesomeIcon icon={faKorvue} size="2x" />;
                    break;
                  case "Java":
                    return <FontAwesomeIcon icon={faJava} size="2x" />;
                    break;
                  case "C":
                    return <FontAwesomeIcon icon={faCuttlefish} size="2x" />;
                    break;
                  default:
                    break;
                }
              })}
            </Makecenter>
            <Makecenter>
              <h5>{e.position.map((e) => `${e.name}/`)}</h5>
            </Makecenter>
          </IntroduceCon>
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
  ));
};

export default Tr;
