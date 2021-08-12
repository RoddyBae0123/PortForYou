import { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../src/Routes/RoomBorad/Side/Channel.css";

const Message = ({ msg }) => {
  const sendDate = msg.sendDate.split("T");
  const hourMinuteSecond = sendDate[1].split(":");
  const rendingDate = hourMinuteSecond[0] + ":" + hourMinuteSecond[1];
  return (
    <div className="message-box">
      <div className="message-box-top">
        <div
          className="message-box-top-img"
          style={{ backgroundImage: "url(" + msg.user.img + ")" }}
        ></div>
        <div className="message-box-top-name">{msg.user.username}</div>
        <div className="message-box-top-date">{rendingDate}</div>
      </div>
      <div className="message-box-bottom">{msg.message}</div>
    </div>
  );
};

export default Message;
