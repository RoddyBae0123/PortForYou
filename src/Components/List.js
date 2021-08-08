import React, { useEffect } from "react";
import styled from "styled-components";

const Container = styled.ul`
  display: grid;
  grid-auto-rows: 100px;
  row-gap: 10px;
  width: 100%;
  border-top: 1px solid lightgray;
  padding: 50px 0;
  margin: 50px 0;
  position: relative;
`;

const Li = styled.li`
  height: 100%;

  padding: 1px 6px;
  border-radius: 30px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  transition: all 300ms ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 11px rgba(0, 0, 0, 0.24);
  }

  transition: all 300ms ease-in-out;
`;

const Button = styled.button`
  display: grid;
  grid-template-columns: 0.2fr 0.2fr 0.25fr 0.15fr 0.2fr;
  position: relative;
  height: 100%;
  width: 100%;
`;
const MakeCenter = styled.div`
  display: flex;
  justify-content: ${(props) => (props.align ? "center" : "flex-start")};
  align-items: center;
  height: 100%;
`;
const StackPosition = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  height: 70%;
`;
const StackList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;
const Position = styled.div`
  width: 50px;
  height: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
  font-size: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Status = styled.button`
  color: ${(props) => (props.color == -1 ? "green" : "red")};
  font-size: 25px;
  font-weight: 500;
`;

const CreateDate = styled.span`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 10px;
`;

const Text = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

const Img = styled.img`
  width: 50%;
`;
const NewCgry = styled.div`
  border-top: 1px solid lightgray;
  width: 85%;
  margin-top: 45px;
  position: relative;
`;
const Title2 = styled.h2`
  padding: 0 20px;
  height: 20px;
  background-color: white;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -10px;
  left: 90px;
  text-align: center;
  font-weight: 700;
`;
const List = ({ applicant, setPopup }) => {
  const LiBtnHandler = (state, num) => {
    setPopup({ state, num });
  };

  const returnData = () => {
    return (
      <Container>
        <Title2>APPLICANT</Title2>
        {applicant &&
          applicant.map((e, idx) => (
            <Li key={e.idx} onClick={() => LiBtnHandler(true, idx)}>
              <Button>
                <MakeCenter align={true}>
                  <Text>{idx + 1}</Text>
                </MakeCenter>
                <MakeCenter align={false}>
                  <Text>{e.portfolio.user.name}</Text>
                </MakeCenter>
                <MakeCenter align={false}>
                  <Text>{e.portfolio.title.substring(0, 10)}...</Text>
                </MakeCenter>
                <MakeCenter align={false}>
                  <StackPosition>
                    <MakeCenter align={true}>
                      <StackList>
                        {e.portfolio.tech.map((e) => (
                          <Img
                            key={e.stackIdx}
                            src={`http://3.37.208.251:8080/api/img/default?name=${e.stackName}`}
                          />
                        ))}
                      </StackList>
                    </MakeCenter>
                    <MakeCenter>
                      <Position key={e.position.idx}>
                        {e.position.name}
                      </Position>
                    </MakeCenter>
                  </StackPosition>
                </MakeCenter>
                <MakeCenter align={true}>
                  <Status color={e.declined}>
                    {e.declined == -1 && "Accepted"}
                    {e.declined == 1 && "Rejected"}
                    {e.declined == 0 && "Wating"}
                  </Status>
                </MakeCenter>
                <CreateDate>{e.regDate.substring(0, 10)}</CreateDate>
              </Button>
            </Li>
          ))}
      </Container>
    );
  };

  return returnData();
};

export default List;
