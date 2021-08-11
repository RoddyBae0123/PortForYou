import { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Message = ({ msg }) => {
  return (
    <tr style={{ height: "15px" }}>
      <td style={{ width: "100px", height: "15px" }}>{msg.user.username}</td>
      <td style={{ width: "250px", height: "15px" }}>{msg.message}</td>
      <td style={{ width: "150px", height: "15px" }}>{msg.sendDate}</td>
    </tr>
  );
};

export default Message;
