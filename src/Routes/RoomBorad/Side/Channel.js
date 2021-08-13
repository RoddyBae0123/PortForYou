import { motion } from "framer-motion";
import styled from "styled-components";
import Section from "../../../Components/Section";
import SockJsClient from "react-stomp";
import { useEffect, useState } from "react";
import axios from "axios";
import wifi from "../../../wifi";
import Auth from "../../../Auth";
import Message from "../../../Components/Message";
import { userApi } from "../../../Api";
import jquery from "jquery";
import $ from "jquery";
import { Forum, LineWeight } from "@material-ui/icons";
import "./Channel.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Channel = (match) => {
  const [roomId, setRoomId] = useState(undefined);
  const [messageList, setMessageList] = useState([]);
  const [clientRef, setClientRef] = useState(undefined);
  const [inputMessage, setInputMessage] = useState({ value: "" });
  const [userData, setUserData] = useState(undefined);
  const [connected, setConnected] = useState("disconnected");

  const componentDidMount = useEffect(async () => {
    const data = await userApi.getUserInfo();
    setUserData(data);
    getRoomId();
    getMessages();
  }, []);

  const getPreviousMessage = async () => {
    if (messageList[0] != null) {
      await getMessages(messageList[0].key);
    }
  };

  const getRoomId = async () => {
    const api = axios.create({
      baseURL: `${wifi}`,
      headers: {
        Authorization: `Bearer ${Auth.getAccessToken()}`,
      },
    });
    const data = await api.get(`/study/${match.match.params.idx}/room`);
    setRoomId(data.data.rid);
  };

  const getMessages = async (idx) => {
    const api = axios.create({
      baseURL: `${wifi}`,
      headers: {
        Authorization: `Bearer ${Auth.getAccessToken()}`,
      },
    });
    api
      .get(`/study/${match.match.params.idx}/room/messages`, {
        params: { "last-idx": idx },
      })
      .then((res) => {
        let messageList_ = [...messageList];
        const prevSize = messageList.length;
        res.data.map((i) => {
          messageList_.unshift(<Message msg={i} key={i.idx}></Message>);
        });
        setMessageList(messageList_);
        if (idx == null) {
          $(".message-wrapper").scrollTop(
            $(".message-wrapper")[0].scrollHeight
          );
        } else {
          $(".message-wrapper").scrollTop(
            $(".message-wrapper")[0].scrollHeight *
              (1 - prevSize / messageList_.length)
          );
        }
      });
  };

  const addMessage = (msg) => {
    let messageList_ = [...messageList];
    messageList_.push(<Message msg={msg} key={msg.idx}></Message>);
    setMessageList(messageList_);
    $(".message-wrapper").scrollTop($(".message-wrapper")[0].scrollHeight);
  };

  const sendMessage = (msg) => {
    clientRef.sendMessage(`/pub/chat/message`, msg);
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();

    sendMessage(`
      {"room": {"rid":"${roomId}"},
      "user": {"uid":${userData.data.uid}},
      "message": "${inputMessage.value}",
      "type": "TALK"},
    `);
    setInputMessage({ value: "" });
  };

  const connectedHandler = async () => {
    setConnected("connected");
    // setTimeout(() => {
    //   if (userData) {
    //     sendMessage(`
    //   {"room": {"rid":"${roomId}"},
    //   "user": {"uid":${userData.data.uid}},
    //   "message": "",
    //   "type": "ENTER"},
    // `);
    //   } else {
    //     console.log("no userData");
    //   }
    // }, 800);
  };

  const disconnectedHandler = () => {
    setConnected("disconnected");
  };

  const inputMessageHandler = (e) => {
    setInputMessage({ value: e.target.value });
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ height: "100%" }}
    >
      <Container className="channel-container">
        <SockJsClient
          url={`${wifi}pfy/stomp`}
          topics={[`/sub/chat/room/${roomId}`]}
          onMessage={(msg) => {
            addMessage(msg);
          }}
          ref={(client) => {
            setClientRef(client);
          }}
          onConnect={() => {
            connectedHandler();
          }}
          onDisconnect={() => {
            disconnectedHandler();
          }}
        ></SockJsClient>
        <div className="channel-title">
          <Forum style={{ fontSize: "50px" }} className="channel-title-img" />
          <div className="channel-title-title">Channel</div>
          <div className="channel-title-connect">
            {connected == "connected" ? (
              <div className="channel-title-connect-circle"></div>
            ) : (
              <div className="channel-title-disconnect-circle"></div>
            )}

            <div className="channel-title-connect-description">{connected}</div>
          </div>
        </div>
        <div className="channel-wrapper">
          <div className="message-wrapper">
            <div className="prev-message" onClick={getPreviousMessage}>
              이전 메시지 불러오기
            </div>
            {messageList}
          </div>

          <form className="message-form" onSubmit={messageSubmitHandler}>
            <div className="message-form-nav">
              navigation
              <div className="add-image"></div>
              <div className="add-file"></div>
            </div>
            <input
              className="message-form-text"
              value={inputMessage.value}
              onChange={inputMessageHandler}
            ></input>
            <input
              className="message-form-submit"
              value="전송"
              type="submit"
            ></input>
          </form>
        </div>
      </Container>
    </motion.div>
  );
};

export default Channel;
