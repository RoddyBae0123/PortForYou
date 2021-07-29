import React from "react";
import styled from "styled-components";

const Container = styled.ul`
  display: grid;
  grid-auto-rows: 100px;
  row-gap: 10px;
  width: 100%;
`;

const Li = styled.li`
  height: 100%;
  display: grid;
  grid-template-columns: 0.2fr 0.2fr 0.2fr 0.2fr 0.2fr;
  position: relative;
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
`;
const StackList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;
const Position = styled.div`
  width: 50px;
  height: 30px;
  border: 1px solid lightgray;
  border-radius: 10px;
`;

const Status = styled.button`
  color: ${(props) => props.color};
  font-size: 25px;
  font-weight: 500;
`;

const List = () => {
  const returnData = () => {
    return <Container />;
  };
};

export default List;
