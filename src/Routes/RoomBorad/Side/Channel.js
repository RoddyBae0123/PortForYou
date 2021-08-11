import { motion } from "framer-motion";
import styled from "styled-components";
import Section from "../../../Components/Section";
import Popup from "../../../Components/Popup";
import SockJsClient from "react-stomp";
import { useEffect, useState } from "react";
import axios from "axios";
import wifi from "../../../wifi";
import Auth from "../../../Auth";
import Message from "../../../Components/Message";
import { userApi } from "../../../Api";

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

  const componentDidMount = useEffect(async () => {
    getRoomId();
    const data = await userApi.getUserInfo();
    setUserData(data);
  }, []);

  const addMessage = (msg) => {
    let messageList_ = [...messageList];
    console.log(messageList_);
    messageList_.push(<Message msg={msg}></Message>);
    setMessageList(messageList_);
  };

  const sendMessage = (msg) => {
    console.log(clientRef);
    clientRef.sendMessage(`/pub/chat/message`, msg);
    console.log(msg);
  };

  const messageSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userData.data.uid);
    sendMessage(`
      {"room": {"rid":"${roomId}"},
      "user": {"uid":${userData.data.uid}},
      "message": "${inputMessage.value}",
      "type": "TALK"},
    `);
    setInputMessage({ value: "" });
  };

  const inputMessageHandler = (e) => {
    setInputMessage({ value: e.target.value });
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Container>
        <SockJsClient
          url="http://localhost:8080/pfy/stomp"
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
        ></SockJsClient>
        <Section
          title={"Channel"}
          message={"Have a chat with your team members."}
          nav={false}
        />
        <div className="channel-wrapper">
          {connected}
          <div
            className="table-wrapper"
            style={{ height: "400px", border: "1px solid black" }}
          >
            <table
              style={{
                width: "800px",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid black" }}>
                  <th>username</th>
                  <th>message</th>
                  <th>senddate</th>
                </tr>
              </thead>
              <tbody>{messageList}</tbody>
            </table>
          </div>

          <form style={{ marginTop: "10px" }} onSubmit={messageSubmitHandler}>
            <input
              type="text"
              style={{ width: "700px", marginRight: "20px" }}
              value={inputMessage.value}
              onChange={inputMessageHandler}
            ></input>
            <input value="전송" type="submit" style={{ width: "70px" }}></input>
          </form>
        </div>
      </Container>
    </motion.div>
  );
};

export default Channel;
