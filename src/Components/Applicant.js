import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 60px 0;
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  border: 1px solid lightgray;
  margin-right: 50px;
`;

const Name = styled.h2`
  font-weight: 500;
  font-size: 40px;
  color: black;
`;

const Small = styled.span`
  font-size: 25px;
  opacity: 0.3;
`;

const Portfolio = styled.main`
  width: 85%;
  height: 1200px;
  border: 1px solid lightgray;
  border-radius: 50px;
  position: relative;
  padding: 20px;
`;

const PortTitle = styled.div`
  height: 20px;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -10px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  display: ${(props) => (props.status ? "flex" : "none")};
  justify-content: center;
`;

const Applicant = () => {
  return (
    <Container>
      <Title>
        <Img src="https://dimg.donga.com/carriage/NEWS/content/IDOLPICK/Profile/2019/02/01/20190201165707.jpg"></Img>
        <Name>
          Roddyisthebest / <Small>Back-end</Small>{" "}
        </Name>
      </Title>
      <Portfolio>
        <PortTitle status={true}>
          <span style={{ backgroundColor: "white", padding: "0 20px" }}>
            Portfolio
          </span>
        </PortTitle>
      </Portfolio>
    </Container>
  );
};

export default Applicant;
