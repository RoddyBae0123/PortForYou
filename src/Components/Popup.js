import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const PopupBkg = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 301;
  opacity: ${(props) => (props.change ? 1 : 0)};
  transition: all 300ms ease-in-out;
  display: ${(props) => (props.status ? "flex" : "none")};
  background-color: rgba(0, 0, 0, 0.3);
`;
const PopupUser = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: white;

  box-shadow: 0 0.0625rem 0.1875rem rgb(20 20 94 / 12%),
    0 0.1875rem 0.4375rem rgb(20 20 94 / 10%);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: ${(props) => (props.notover ? "auto" : "scroll")};
  border-radius: ${(props) => (props.notover ? "20px" : "none")};
`;
const DelpopupBtn = styled.button`
  display: ${(props) => (props.second ? "none" : "block")};
  background-color: transparent;
  position: fixed;
  right: 15px;
  top: 15px;
  font-size: 20px;
  color: lightgray;
  &:hover {
    color: black;
  }
  transition: all 200ms ease-in-out;
`;

const Popup = ({ status, component, second, size, setPopup, notover }) => {
  const [sec, setSec] = useState(true);
  const [change, setChange] = useState(false);
  const timeout = () => {
    setChange(true);
    if (second) {
      setTimeout(() => {
        setChange(false);
      }, second - 1000);
      setTimeout(() => {
        setSec(false);
      }, second);
    }
  };
  useEffect(() => {
    timeout();
  }, []);

  return sec ? (
    <PopupBkg status={status} change={change}>
      <PopupUser width={size.width} height={size.height} notover={notover}>
        <DelpopupBtn second={second} onClick={() => setPopup(false)}>
          <FontAwesomeIcon style={{ fontSize: 35 }} icon={faTimes} />
        </DelpopupBtn>
        {component()}
      </PopupUser>
    </PopupBkg>
  ) : null;
};

export default Popup;
