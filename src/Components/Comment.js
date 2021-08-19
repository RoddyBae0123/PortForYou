import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faCircle,
  faPaperPlane,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import { boardApi } from "../Api";
const Container = styled.div`
  width: 80%;
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

const Ul = styled.ul`
  width: 100%;
  height: 100%;
`;

const Li = styled.li`
  margin-bottom: 35px;
  width: 100%;
`;

const CommentEntire = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 0.05fr 0.95fr;
`;

const CommentSub = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 0.2fr 0.8fr;
  row-gap: 15px;
`;

const CommentImg = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100%;
  box-shadow: 0 3px 6px lightgray;
  background-image: ${(props) => `url(${props.url})`};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
`;

const InputEntire = styled.div`
  background-color: rgba(216, 216, 216, 0.2);
  height: 55px;
  margin-left: 20px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 95%;
  height: 85%;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 20px;
  font-weight: 400;
`;

const SubmitBtn = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 100%;
  background-color: rgba(216, 216, 216, 0.8);
`;

const Comment = ({ magic, data }) => {
  const { saveComment, comment, getComment } = magic;
  const InputData = useRef();

  let date = new Date();
  const submitHandler = (e) => {
    if (InputData.current.value.length) {
      saveComment({ content: InputData.current.value });
      InputData.current.value = "";
    }
  };

  const delComment = async (e) => {
    try {
      const data = await boardApi.deleteComment(e);
      data && getComment();
    } catch (e) {
      console.log(e);
    }
  };

  const getAgo = (data) => {
    let res;
    const createDate = [
      [parseInt(data.substring(0, 4)), "year"],
      [parseInt(data.substring(5, 7)), "month"],
      [parseInt(data.substring(8, 10)), "date"],
      [parseInt(data.substring(11, 13)), "hour"],
      [parseInt(data.substring(14, 16)), "min"],
    ];

    const nowDate = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
    ];

    for (let i = 0; i < 5; i++) {
      var now = nowDate[i] - createDate[i][0];
      if (now !== 0) {
        res = `${now} ${createDate[i][1]}`;
        break;
      } else {
        now = 0;
      }
    }
    return res;
  };

  return (
    <Container>
      <Flex
        setting={{
          justify: "flex-start",
          align: "center",
          dir: "rows",
        }}
        style={{
          padding: "30px 0",
          borderBottom: "2px solid lightgray",
          marginBottom: "30px",
        }}
      >
        <Text size={"25px"} weight={"500"}>
          <FontAwesomeIcon icon={faComments} />
          <Text size={"25px"} weight={"700"} style={{ marginLeft: 20 }}>
            Comments
          </Text>
        </Text>
      </Flex>
      {comment && comment.length ? (
        <Ul>
          {comment.map((e) => (
            <Li key={e.idx}>
              <CommentEntire>
                <Flex
                  setting={{
                    justify: "flex-start",
                    align: "flex-start",
                    dir: "rows",
                  }}
                >
                  <CommentImg size={"50px"} url={e.user.img} />
                </Flex>
                <CommentSub>
                  <Flex
                    setting={{
                      justify: "flex-start",
                      align: "center",
                      dir: "rows",
                    }}
                  >
                    <Text
                      size={"25px"}
                      weight={"500"}
                      style={{ marginLeft: 20, opacity: 1 }}
                    >
                      {e.user.name}
                    </Text>
                    <Text
                      size={"8px"}
                      weight={"400"}
                      style={{ marginLeft: 20, opacity: 0.5 }}
                    >
                      <FontAwesomeIcon icon={faCircle} />
                    </Text>
                    <Text
                      size={"12px"}
                      weight={"400"}
                      style={{ marginLeft: 20, opacity: 0.5 }}
                    >
                      {getAgo(e.regDate)
                        ? getAgo(e.regDate) + "\nago"
                        : "just now"}
                    </Text>
                    {data.myInfo && e.user.uid === data.myInfo.uid ? (
                      <Text
                        size={"12px"}
                        weight={"400"}
                        style={{ marginLeft: 20, opacity: 0.5, padding: 0 }}
                        as={"button"}
                        onClick={() => delComment(e.idx)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </Text>
                    ) : null}
                  </Flex>
                  <Text
                    size={"20px"}
                    weight={"400"}
                    style={{ opacity: 0.8, marginLeft: 20, lineHeight: "130%" }}
                  >
                    {e.content}
                  </Text>
                </CommentSub>
              </CommentEntire>
            </Li>
          ))}
        </Ul>
      ) : null}
      <CommentEntire style={{ marginBottom: 40 }}>
        <Flex
          setting={{
            justify: "flex-start",
            align: "center",
            dir: "rows",
          }}
        >
          <CommentImg size={"50px"} url={data.myInfo && data.myInfo.img} />
        </Flex>
        <InputEntire>
          <Input
            type="text"
            placeholder="Comment on anything you want..."
            ref={InputData}
          />
          <SubmitBtn onClick={submitHandler}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </SubmitBtn>
        </InputEntire>
      </CommentEntire>
    </Container>
  );
};
const getCurrentState = (state, ownProps) => {
  return state;
};

export default connect(getCurrentState)(Comment);
