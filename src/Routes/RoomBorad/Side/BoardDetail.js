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

const BoardDetail = ({ data, setData, match, getData, history }) => {
  const {
    params: { idx: boardIdx },
  } = match;

  const { goBack } = history;

  const [board, setBoard] = useState();
  useEffect(() => {
    getBoard(boardIdx);
  }, []);

  const getBoard = async (idx) => {
    try {
      const { data } = await boardApi.getBoard(idx);
      data && setBoard(data);
    } catch (e) {
      console.log(e);
    }
  };

  return board ? (
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
          I'm king of Newyork
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
            Roddy
          </Text>
          <Text
            size={"15px"}
            weight={"400"}
            style={{ marginBottom: 20, paddingLeft: 20, opacity: "0.3" }}
          >
            37 second ago
          </Text>
        </Flex>
        <Text
          size={"20px"}
          weight={"400"}
          style={{ marginBottom: 40, lineHeight: "27px" }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
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
          <Text
            size={"15px"}
            weight={"700"}
            style={{ opacity: 0.4, marginRight: 15, padding: 0 }}
            as={"button"}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Text>
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
      <Comment />
    </Container>
  ) : (
    <div>fuck</div>
  );
};

const getCurrentState = (state, ownProps) => {
  console.log(state, ownProps);

  return state;
};
export default connect(getCurrentState)(BoardDetail);
