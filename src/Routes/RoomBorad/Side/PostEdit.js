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
import Loader from "react-loader-spinner";
import { imageApi } from "../../../Api";

import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css";
import "react-summernote/lang/summernote-ko-KR";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "bootstrap/js/dist/tab";



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
  margin-top: 20px;
  b {
    font-weight: 600;
  }
  ul {
    list-style-type: circle;
    padding: 0 20px;
  }
  ol {
    list-style-type: decimal;
    padding: 0 20px;
  }
  h1 {
    font-size: 30px;
    font-weight: 600;
    padding: 0 15px;
  }

  .dropdown-menu {
    list-style: none;
  }
  .wrapper-class {
    width: 100%;
    margin: 0 auto;
    margin-top: 20px;
    border: 1px solid lightgray;
  }
  .editor {
    height: 350px !important;
    /* border: 2px solid lightgray !important; */
    padding: 15px 20px !important;
    /* border-radius: 2px !important; */
    &::-webkit-scrollbar {
      width: 10px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgb(239, 239, 239);
    }
  }
  .note-editable {
    padding: 20px;
    width: 100%;
    max-height: 500px;
    min-height: 300px;
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
  .table-bordered {
    border: 1px solid #ddd;
  }
  th,
  td {
    border: 1px solid #ddd;
  }
`;
const PostEdit = ({ match, data, location, setData, history }) => {
  const {
    params: { studyIdx, boardIdx, postIdx },
  } = match;

  useEffect(() => {
    postIdx == "create" ? setTitle("New Post") : getPost();
  }, []);

  const getPost = async () => {
    try {
      const { data } = await boardApi.getPost(postIdx);
      // const blocksFromHtml = htmlToDraft(data.content);
      // if (blocksFromHtml) {
      //   // const { contentBlocks, entityMap } = blocksFromHtml;
      //   // // https://draftjs.org/docs/api-reference-content-state/#createfromblockarray
      //   // const contentState = ContentState.createFromBlockArray(
      //   //   contentBlocks,
      //   //   entityMap
      //   // );
      //   // // ContentState를 EditorState기반으로 새 개체를 반환.
      //   // // https://draftjs.org/docs/api-reference-editor-state/#createwithcontent
      //   // const editorState = EditorState.createWithContent(contentState);
      //   // setEdit(editorState);
      //   setSend({
      //     title: data.title,
      //     content: data.content,
      //   });
      // }

      setTitle(data.title);
      setContent(data.content);
      // setSend({ title: data.title, content: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const [title, setTitle] = useState();
  const [content, setContent] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      if (postIdx !== "create") {
        console.log(boardIdx);
        setData.setPost({
          idx: postIdx,
          boardIdx,
          title,
          content,
        });
      } else {
        setData.setPost({
          boardIdx,
          title,
          content,
        });
      }
      setTimeout(() => {
        history.goBack();
      }, 500);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeHandler = (content) => {
    console.log(content);
    setContent(content);

  };
  const uploadImageCallBack = async (file) => {
    try {
      const data = new FormData();
      data.append("img", file[file.length - 1]);
      const res = await imageApi.setPostImage(data);
      return res.data.message;
    } catch (e) {
      console.log(e);
    }
  };
  const onImageUpload = async (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };
      const data = await uploadImageCallBack(images);
      insertImage(data);
    }

    // for (let i = 0; i < images.length; i++) {
    //   const reader = new FileReader();

    //   reader.onloadend = () => {
    //     insertImage(reader.result);
    //   };

    //   reader.readAsDataURL(images[i]);
    // }
  };
  return title ? (
    <Container>
      <Flex
        setting={{
          justify: "space-between",
          align: "flex-end",
          dir: "rows",
        }}
        style={{
          width: "80%",
          padding: "25px 0",
          borderBottom: "2px solid lightgray",
          marginTop: "20px",
        }}
      >
        <Text
          size={"25px"}
          weight={"500"}
          as={"button"}
          onClick={() => history.goBack()}
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
      <Flex
        setting={{
          justify: "space-between",
          align: "flex-end",
          dir: "rows",
        }}
        style={{
          width: "80%",
          padding: "20px 15px",
          border: "1px solid lightgray",
          marginTop: "20px",
        }}
      >
        <Text
          size={"25px"}
          weight={"800"}
          as={"input"}
          type="text"
          placeholder="Please type A Title."
          style={{ border: "none", outline: "none", width: "100%" }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Flex>

      {/* <Editor
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
        /> */}
      <MyEdit>
        <ReactSummernote
          value={content}
          options={{
            lang: "ru-RU",
            height: 350,
            dialogsInBody: true,
            fontNamesIgnoreCheck: ["Roboto"],
            fontNames: [
              "Roboto",
              "Arial",
              "Arial Black",
              "Comic Sans MS",
              "Courier New",
              "Helvetica Neue",
              "Helvetica",
              "Impact",
              "Lucida Grande",
              "Tahoma",
              "Times New Roman",
              "Verdana",
            ],

            toolbar: [
              ["style", ["style"]],
              ["font", ["bold", "underline", "clear"]],
              ["fontsize", ["fontsize"]],
              ["fontname", ["fontname"]],
              ["color", ["color"]],
              ["para", ["ul", "ol", "paragraph"]],
              ["table", ["table"]],
              ["insert", ["link", "picture", "video"]],
              ["view", ["fullscreen", "codeview"]],
            ],
          }}
          onChange={onChangeHandler}
          // onChange={this.onChange}
          onImageUpload={onImageUpload}
        />
      </MyEdit>

      <Flex
        setting={{
          justify: "center",
          align: "center",
          dir: "rows",
        }}
        style={{
          width: "80%",
          padding: "20px 10px",
          marginTop: "10px",
        }}
      >
        <Text
          size={"15px"}
          weight={"500"}
          as={"button"}
          style={{
            border: "1px solid lightgray",
            padding: "10px 30px",
            borderRadius: "20px",
          }}
          onClick={submitHandler}
        >
          {postIdx === "create" ? "CREATE" : "EDIT"}
        </Text>
      </Flex>
    </Container>
  ) : (
    <Container style={{ justifyContent: "center" }}>
      <Loader
        type="ThreeDots"
        color="lightgray"
        height={300}
        width={300}
        timeout={10000}
      />
    </Container>
  );
};
const getCurrentState = (state, ownProps) => {
  return state;
};
export default connect(getCurrentState)(PostEdit);
