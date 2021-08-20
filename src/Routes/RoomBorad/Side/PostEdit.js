import { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faPaperclip,
  faTrashAlt,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { EditorState, convertToRaw } from "draft-js";

import { imageApi } from "../../../Api";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";

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

const MyEdit = styled.div`
  width: 80%;
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
    margin-bottom: 4rem;
    margin-top: 20px;
    border: 1px solid lightgray;
  }
  .editor {
    height: 500px !important;
    /* border: 2px solid lightgray !important; */
    padding: 10px 20px !important;
    /* border-radius: 2px !important; */
    &::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(239, 239, 239);
    }
  }
  .toolbar {
    width: 100%;
    border: none;
    border-bottom: 1px solid lightgray;
    border-radius: 0;
    box-shadow: none;
    padding: 10px;
    margin: 0;
  }
`;
const PostEdit = ({ match, data }) => {
  const {
    params: { idx: postIdx },
  } = match;

  console.log(postIdx);
  data && console.log(data.post);

  const [edit, setEdit] = useState("");

  const onEditorStateChange = (editor) => {
    console.log(convertToRaw(editor.getCurrentContent()));
    setEdit(editor);
  };
  const uploadImageCallBack = (file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = new FormData();
        data.append("img", file);
        const res = await imageApi.setPostImage(data);
        res && console.log(res.data.message);
        resolve({ data: { link: res.data.message } });
      } catch (e) {
        console.log(e);
        reject();
      }
    });
  };
  return (
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
        <Text size={"25px"} weight={"500"} as={"button"}>
          <FontAwesomeIcon
            icon={faLongArrowAltLeft}
            style={{ marginRight: 20 }}
          />
          <Text size={"25px"} weight={"500"}>
            Back
          </Text>
        </Text>
      </Flex>
      <MyEdit>
        <Editor
          editorState={edit}
          toolbarClassName="toolbar"
          wrapperClassName="wrapper-class"
          editorClassName="editor"
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            image: {
              uploadCallback: uploadImageCallBack,
              previewImage: true,
              alt: { present: true, mandatory: false },
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            },
          }}
        />
      </MyEdit>
    </Container>
  );
};
const getCurrentState = (state, ownProps) => {
  return state;
};
export default connect(getCurrentState)(PostEdit);
