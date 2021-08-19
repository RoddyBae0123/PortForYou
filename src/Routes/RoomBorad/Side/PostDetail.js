import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { boardApi } from "../../../Api";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faPaperclip,
  faTrashAlt,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../../../Components/Popup";

import Comment from "../../../Components/Comment";
const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  align-items: center;
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

const Board = styled.main`
  margin: 30px 0;
  padding: 40px;
  width: 80%;
  background-color: rgba(216, 216, 216, 0.2);
`;

const PostDetail = ({ data, setData, match, getData, history }) => {
  const {
    params: { idx: postIdx },
  } = match;

  const { goBack } = history;

  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [delBtnPopup, setDelBtnPopup] = useState(false);
  useEffect(() => {
    getComment();
    getPost(postIdx);
  }, []);

  const getComment = async () => {
    try {
      const { data } = await boardApi.getComments(postIdx);
      setComment(data);
    } catch (e) {
      console.log(e);
    }
  };
  const saveComment = async ({ idx, content }) => {
    try {
      console.log(content);
      const { data } = await boardApi.saveComment({
        postIdx,
        idx,
        content,
      });
      data && getComment(postIdx);
    } catch (e) {
      console.log(e);
    }
  };

  const getPost = async (idx) => {
    try {
      const { data } = await boardApi.getPost(idx);
      data && setPost(data);
    } catch (e) {
      console.log(e);
    }
  };

  const deletePost = async () => {
    try {
      const data = await boardApi.deletePost(postIdx);
      data && history.goBack();
      data && console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const returnDelPopup = (what) =>
    what ? (
      <Popup
        status={true}
        component={delPopupContent}
        size={{ width: "500px", height: "400px" }}
        setPopup={setDelBtnPopup}
        notover={true}
      />
    ) : null;
  const delPopupContent = () => (
    <Flex
      setting={{
        justify: "space-evenly",
        align: "center",
        dir: "column",
      }}
      style={{ height: "100%" }}
    >
      <Text size={"20px"} weight={"700"}>
        Do you really want to delete this post?
      </Text>
      <Flex
        setting={{
          justify: "space-evenly",
          align: "center",
          dir: "rows",
        }}
      >
        <Text
          size={"20px"}
          weight={"500"}
          as={"button"}
          style={{
            border: "1px solid lightgray",
            padding: "10px 20px 10px 20px",
            borderRadius: 10,
          }}
          onClick={deletePost}
        >
          Yes
        </Text>
        <Text
          size={"20px"}
          weight={"500"}
          as={"button"}
          style={{
            border: "1px solid lightgray",
            padding: "10px 20px 10px 20px",
            borderRadius: 10,
          }}
          onClick={() => setDelBtnPopup(false)}
        >
          No
        </Text>
      </Flex>
    </Flex>
  );
  return post ? (
    <>
      <Container>
        <Flex
          setting={{
            justify: "space-between",
            align: "flex-end",
            dir: "rows",
          }}
          style={{
            width: "80%",
            padding: "30px 0",
            borderBottom: "2px solid lightgray",
          }}
        >
          <Text
            size={"25px"}
            weight={"500"}
            as={"button"}
            onClick={() => goBack()}
          >
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
              style={{ marginRight: 20 }}
            />
            <Text size={"25px"} weight={"500"}>
              Back
            </Text>
          </Text>
        </Flex>
        <Board>
          <Text size={"35px"} weight={"700"} style={{ marginBottom: 20 }}>
            {post.title}
          </Text>
          <Flex
            setting={{
              justify: "flex-start",
              align: "flex-start",
              dir: "rows",
            }}
          >
            <Text
              size={"15px"}
              weight={"400"}
              style={{
                marginBottom: 20,
                paddingRight: 20,
                borderRight: "1px solid black",
              }}
            >
              {post.user.name}
            </Text>
            <Text
              size={"15px"}
              weight={"400"}
              style={{ marginBottom: 20, paddingLeft: 20, opacity: "0.3" }}
            >
              {post.regDate.substring(0, 10)}
            </Text>
          </Flex>
          <Text
            size={"20px"}
            weight={"400"}
            style={{ marginBottom: 40, lineHeight: "27px" }}
          >
            {post.content}
          </Text>
          <Flex
            setting={{
              justify: "flex-start",
              align: "center",
              dir: "rows",
            }}
            style={{
              height: 50,
              paddingBottom: 20,
              borderBottom: "1px solid black",
            }}
          >
            <Text
              size={"15px"}
              weight={"700"}
              style={{ opacity: 0.4 }}
              as={"button"}
            >
              <FontAwesomeIcon icon={faPaperclip} />
              <Text size={"15px"} weight={"400"} style={{ marginLeft: 10 }}>
                0
              </Text>
            </Text>
          </Flex>
          <Flex
            setting={{
              justify: "flex-end",
              align: "center",
              dir: "rows",
            }}
            style={{
              height: 50,
              paddingTop: 20,
            }}
          >
            {data.myInfo && data.myInfo.uid === post.user.uid ? (
              <Text
                size={"15px"}
                weight={"700"}
                style={{ opacity: 0.4, marginRight: 15, padding: 0 }}
                as={"button"}
                onClick={() => setDelBtnPopup(true)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </Text>
            ) : null}

            <Text
              size={"15px"}
              weight={"700"}
              style={{ opacity: 0.4, padding: 0 }}
              as={"button"}
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </Text>
          </Flex>
        </Board>
        <Comment magic={{ saveComment, comment, getComment }} />
      </Container>
      {returnDelPopup(delBtnPopup)}
    </>
  ) : (
    <div>fuck</div>
  );
};

const getCurrentState = (state, ownProps) => {
  console.log(state, ownProps);

  return state;
};
export default connect(getCurrentState)(PostDetail);
