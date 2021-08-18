import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faCircle,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
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
  width: 100%;
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

const Comment = ({ data }) => {
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
          <Text size={"25px"} weight={"500"} style={{ marginLeft: 20 }}>
            Comments
          </Text>
        </Text>
      </Flex>
      <Ul>
        <Li>
          <CommentEntire>
            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "rows",
              }}
            >
              <CommentImg
                size={"50px"}
                url={
                  "https://pbs.twimg.com/profile_images/1401366945354588160/nXCZ621D.jpg"
                }
              />
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
                  weight={"400"}
                  style={{ marginLeft: 20, opacity: 1 }}
                >
                  Yuri Cho
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
                  5 min ago
                </Text>
              </Flex>
              <Text
                size={"20px"}
                weight={"400"}
                style={{ opacity: 0.8, marginLeft: 20 }}
              >
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock,
              </Text>
            </CommentSub>
          </CommentEntire>
        </Li>
        <Li>
          <CommentEntire>
            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "rows",
              }}
            >
              <CommentImg
                size={"50px"}
                url={
                  "https://pbs.twimg.com/profile_images/1401366945354588160/nXCZ621D.jpg"
                }
              />
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
                  weight={"400"}
                  style={{ marginLeft: 20, opacity: 1 }}
                >
                  Yuri Cho
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
                  5 min ago
                </Text>
              </Flex>
              <Text
                size={"20px"}
                weight={"400"}
                style={{ opacity: 0.8, marginLeft: 20 }}
              >
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </Text>
            </CommentSub>
          </CommentEntire>
        </Li>
      </Ul>
      <CommentEntire style={{ marginBottom: 40 }}>
        <Flex
          setting={{
            justify: "flex-start",
            align: "center",
            dir: "rows",
          }}
        >
          <CommentImg
            size={"50px"}
            url={
              "https://pbs.twimg.com/profile_images/1401366945354588160/nXCZ621D.jpg"
            }
          />
        </Flex>
        <InputEntire>
          <Input type="text" placeholder="Comment on anything you want..." />
          <SubmitBtn>
            <FontAwesomeIcon icon={faPaperPlane} />
          </SubmitBtn>
        </InputEntire>
      </CommentEntire>
    </Container>
  );
};

export default Comment;
