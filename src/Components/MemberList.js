import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCrown,
  faEllipsisV,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  margin-top: 20px;
`;
const Ul = styled.ul`
  display: grid;
  grid-template-columns: 0.333fr 0.333fr 0.333fr;
  grid-auto-rows: 420px;
`;
const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
  height: 90%;
  position: relative;
  box-shadow: 0 3px 6px lightgray;
  border-radius: 25px;
  color: rgb(74, 86, 94);
  font-weight: 700;
`;

const UserBtn = styled.button`
  position: absolute;
  left: ${(props) => props.left && props.left};
  right: ${(props) => props.right && props.right};
  top: 15px;
  font-size: 30px;
  color: rgb(74, 86, 94);
`;

const UserImg = styled.img`
  border-radius: 100%;
  width: 130px;
  height: 130px;
  box-shadow: 0 3px 6px lightgray;
`;

const Position = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 30px;
  font-size: 10px;
  font-weight: 100;
  border-radius: 10px;
  border: 1px solid rgb(216, 216, 216);
`;

const MemberList = ({ data }) => {
  data.data && console.log(data.data);

  useEffect(() => {
    data.getData();
  }, []);
  return (
    <Container>
      <Ul>
        {data.data &&
          data.data.map((e, idx) => (
            <Li key={idx}>
              <Card>
                <UserBtn left={"10px"}>
                  {e.position.name == `ROOM MANAGER` ? (
                    <FontAwesomeIcon icon={faCrown}></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
                  )}
                </UserBtn>
                <UserBtn right={"10px"}>
                  <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                </UserBtn>
                <UserImg src="http://i30.tcafe2a.com/2001/20200101230849_99c85d1bada6e91c3c07a371af1d6c1b_wdu2.jpg"></UserImg>
                <span style={{ fontSize: 45 }}>{e.user.username}</span>
                <Position>
                  <span>{e.position.name}</span>
                </Position>
              </Card>
            </Li>
          ))}
      </Ul>
    </Container>
  );
};

export default MemberList;
