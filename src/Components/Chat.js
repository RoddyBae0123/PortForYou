import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faVideo,
  faEllipsisV,
  faCheck,
  faMicrophone,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 80%;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

const ChatTitle = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 0.15fr 0.58fr 0.27fr;
  width: 100%;
  height: 150px;
  border-radius: 25px;
  box-shadow: 0 3px 6px lightgray;
  z-index: 200;
  background-color: white;
`;

const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;

const ChatTitleBtn = styled.button`
  width: 50px;
  height: 50px;
  background-color: rgb(239, 239, 239);
  color: rgb(112, 112, 112);
  font-size: 20px;
  border-radius: 100%;
`;

const ChatImg = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100%;
  box-shadow: 0 3px 6px lightgray;
  background-image: url("https://v-phinf.pstatic.net/20210710_169/16259188718664AwOe_GIF/image.GIF?type=w1000");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% auto;
`;

const MessageZone = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
`;

const MessageList = styled.main`
  height: 650px;
  width: 100%;
  padding: 0 10px;
  overflow-y: scroll;
  overflow-x: hidden;

  background-color: transparent;
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(239, 239, 239);
    border-radius: 5px;
  }
`;

const Message = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.enemy ? "1fr" : "0.15fr 0.85fr;")};
  max-width: 400px;
  margin-bottom: 20px;
  column-gap: 20px;
`;

const MsgContents = styled.div`
  width: 100%;
  font-size: 15px;
  background-color: rgb(241, 241, 241);
  border-radius: 50px 50px 50px 5px;
  padding: 10px;
`;

const TypeMsg = styled.div`
  display: grid;
  width: 100%;
  height: 70px;
  grid-template-columns: 95% 5%;
`;
const TypeValue = styled.div`
  width: 98%;
  height: 65%;
  border: 1px solid rgb(216, 216, 216);
  border-radius: 20px;
  color: rgb(216, 216, 216);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  font-size: 20px;
`;

const TypeBtn = styled.button`
  font-size: 25px;
  width: 60%;
  height: 100%;
  color: rgb(216, 216, 216);
`;

const TypeSubmit = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: rgb(216, 216, 216);
  color: rgb(112, 112, 112);
  border: none;
`;

const Chat = () => (
  <Container>
    <ChatTitle>
      <Flex setting={{ justify: "center", align: "center", dir: "column" }}>
        <ChatImg size={"90px"} />
      </Flex>
      <Flex
        setting={{
          justify: "center",
          align: "flex-start",
          dir: "column",
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: 35, marginBottom: 15 }}>
          Roddy gonna be rich guy
        </h2>
        <span style={{ opacity: `0.5` }}>Web</span>
      </Flex>
      <Flex setting={{ justify: "space-evenly", align: "center", dir: "rows" }}>
        <ChatTitleBtn>
          <FontAwesomeIcon icon={faPhoneAlt} />
        </ChatTitleBtn>
        <ChatTitleBtn>
          <FontAwesomeIcon icon={faVideo} />
        </ChatTitleBtn>
        <ChatTitleBtn>
          <FontAwesomeIcon icon={faEllipsisV} />
        </ChatTitleBtn>
      </Flex>
    </ChatTitle>
    <MessageZone>
      <MessageList>
        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-start", align: "center", dir: "rows" }}>
          <Message>
            <Flex
              setting={{ justify: "flex-end", align: "center", dir: "column" }}
            >
              <ChatImg size={"30px"}></ChatImg>
            </Flex>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>
        <Flex setting={{ justify: "flex-start", align: "center", dir: "rows" }}>
          <Message>
            <Flex
              setting={{ justify: "flex-end", align: "center", dir: "column" }}
            >
              <ChatImg size={"30px"}></ChatImg>
            </Flex>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>

        <Flex setting={{ justify: "flex-end", align: "center", dir: "rows" }}>
          <Message enemy={true}>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
            >
              <Flex
                setting={{
                  justify: "center",
                  align: "flex-end",
                  dir: "column",
                }}
              >
                <MsgContents>
                  <span>seong-yeonsoasdasdasdasfasdasfgasdgasdfgd </span>
                </MsgContents>
              </Flex>

              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "rows",
                }}
                style={{ fontSize: 20, marginTop: 10 }}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "lightgreen", marginRight: 15 }}
                ></FontAwesomeIcon>
                <span style={{ opacity: 0.7, fontSize: 15 }}>3:54 AM</span>
              </Flex>
            </Flex>
          </Message>
        </Flex>
      </MessageList>
      <TypeMsg>
        <Flex
          setting={{
            justify: "flex-start",
            align: "center",
            dir: "rows",
          }}
        >
          <TypeValue>
            <TypeBtn>
              <FontAwesomeIcon icon={faMicrophone} />
            </TypeBtn>
            <input
              style={{
                width: "17000px",
                height: "100%",
                border: "none",
                outline: "none",
              }}
              type="text"
              placeholder="Type your fuck..."
            />
            <TypeBtn>
              <FontAwesomeIcon icon={faPaperclip} />
            </TypeBtn>
          </TypeValue>
        </Flex>
        <Flex
          setting={{
            justify: "center",
            align: "center",
            dir: "rows",
          }}
        >
          <TypeSubmit>
            <FontAwesomeIcon icon={faPaperPlane} />
          </TypeSubmit>
        </Flex>
      </TypeMsg>
    </MessageZone>
  </Container>
);

export default Chat;
