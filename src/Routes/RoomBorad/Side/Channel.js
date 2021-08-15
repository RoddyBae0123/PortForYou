import { motion } from "framer-motion";
import styled from "styled-components";
import Section from "../../../Components/Section";
import SockJsClient from "react-stomp";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import wifi from "../../../wifi";
import Auth from "../../../Auth";
import Message from "../../../Components/Message";
import { studyApi, userApi } from "../../../Api";
import jquery from "jquery";
import $ from "jquery";
import { Forum, LineWeight } from "@material-ui/icons";
import "./Channel.css";
import Chat from "../../../Components/Chat";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Channel = (match) => {
  const [roomId, setRoomId] = useState(undefined);
  const [messageList, setMessageList] = useState([]);
  const [clientRef, setClientRef] = useState(undefined);
  const [inputMessage, setInputMessage] = useState({ value: "" });
  const [userData, setUserData] = useState(undefined);
  const [connected, setConnected] = useState("disconnected");
  const [roomData, setRoomData] = useState();
  const typeInput = useRef();
  const chatBoard = useRef();
  useEffect(async () => {
    try {
      setMessageList([]);
      const data = await userApi.getUserInfo();
      setUserData(data);
      getRoomId(); //complete
      getMessages();
      getStudy();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getPreviousMessage = async () => {
    if (messageList[0] != null) {
      const data = await getMessages(messageList[0].key);
    }
  };

  const getRoomId = async () => {
    const api = axios.create({
      baseURL: `${wifi}`,
      headers: {
        Authorization: `Bearer ${Auth.getAccessToken()}`,
      },
    });
    const { data } = await api.get(`/study/${match.match.params.idx}/room`);
    setRoomId(data.rid);
  }; //complete

  const getStudy = async () => {
    try {
      const { data } = await studyApi.getStudy(match.match.params.idx);
      data && setRoomData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getHeight = () => {
    var height = 0;
    for (let i = 1; i < 31; i++) {
      height += chatBoard.current.childNodes[i].scrollHeight;
    }
    console.log(height);
    return height;
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
        setMessageList([]);
        console.log(res);
        let messageList_ = [...messageList];
        const prevSize = messageList.length;
        res.data.map((i) => {
          messageList_.unshift(<Message msg={i} key={i.idx}></Message>);
        });
        setMessageList(messageList_);

        if (idx == null) {
          chatBoard.current.scrollTop = chatBoard.current.scrollHeight;
        } else {
          console.log(chatBoard);
          chatBoard.current.scrollTop = getHeight();
        }
      });
  };

  const addMessage = (msg) => {
    console.log(msg);
    setMessageList([
      ...messageList,
      <Message msg={msg} key={msg.idx}></Message>,
    ]);
    chatBoard.current.scrollTop = chatBoard.current.scrollHeight;
  };

  const sendMessage = (msg) => {
    clientRef.sendMessage(`/pub/chat/message`, msg);
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();

    if (inputMessage.value.length) {
      sendMessage(`
      {"room": {"rid":"${roomId}"},
      "user": {"uid":${userData.data.uid}},
      "message": "${inputMessage.value}",
      "type": "TALK"},
    `);
      setInputMessage({ value: "" });
      typeInput.current.value = "";
    }
  };

  const connectedHandler = async () => {
    setConnected("connected");
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
      <Container>
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
        />
        <Chat
          data={{
            messageList,
            userData,
            inputMessageHandler,
            messageSubmitHandler,
            typeInput,
            chatBoard,
            getPreviousMessage,
            roomData,
          }}
        />
      </Container>
    </motion.div>
  );
};

export default Channel;
