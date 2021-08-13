import { motion } from "framer-motion";
import styled from "styled-components";
import Section from "../../../Components/Section";
import SockJsClient from "react-stomp";
import { useEffect, useState } from "react";
import { userApi, studyApi } from "../../../Api";
import { Forum, LineWeight } from "@material-ui/icons";
import Message from "../../../Components/Message";
import wifi from "../../../wifi";



const Channel2 = ({ match }) => {
  const {
    params: { idx },
  } = match;
  const [roomId, setRoomId] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [connected, setConnected] = useState("disconnected");
  const [clientRef, setClientRef] = useState(undefined);
  const [inputMessage, setInputMessage] = useState({ value: "" });
  const [messageList, setMessageList] = useState([]);
  useEffect(async () => {
    const { data } = await userApi.getUserInfo();
    data && setUserData(data);
    getRoomId();
    getMessages();
  }, []);

  const getRoomId = async () => {
    try {
      const { data } = await studyApi.getChatId(idx);
      data && setRoomId(data.rid);
    } catch (e) {
      console.log(e);
    }
  };

  const getMessages = async (mIdx) => {
    try {
      const data = await studyApi.getMessages(idx, mIdx);
      data && console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addMessage = (msg) => {
    // let messageList_ = [...messageList];
    // messageList_.push(<Message msg={msg} key={msg.idx}></Message>);
    setMessageList([
      ...messageList,
      <Message msg={msg} key={msg.idx}></Message>,
    ]);
  }; //Add message list
  const messageSubmitHandler = (e) => {
    e.preventDefault();

    clientRef.sendMessage(
      `/pub/chat/message`,
      `
      {"room": {"rid":"${roomId}"},
      "user": {"uid":${userData.uid}},
      "message": "${inputMessage.value}",
      "type": "TALK"},
    `
    );
    setInputMessage({ value: "" });
  };

  clientRef && console.log(clientRef);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ height: "100%" }}
    >
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
          setConnected("connected");
        }}
        onDisconnect={() => {
          setConnected("disconnected");
        }}
      />
    </motion.div>
  );
};

export default Channel2;
