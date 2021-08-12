import Section from "../../../Components/Section";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { imageApi, userApi, AuthApi } from "../../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import Popup from "../../../Components/Popup";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const UserSetting = styled.div`
  width: 80%;
  margin-bottom: 30px;
`;
const UserTitle = styled.div`
  border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 16px;
  font-size: 40px;
  font-weight: 100;
`;

const FormSection = styled.div`
  margin: 15px 0;
  font-size: 20px;
  font-weight: 500;
`;

const Form = styled.form`
  display: grid;
  width: 600px;
  grid-template-columns: 0.7fr 0.3fr;
  height: 50px;
  column-gap: 15px;
`;

const InputBox = styled.div`
  height: 100%;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgb(219, 219, 219);
  border-radius: 14px;
  background-color: rgb(245, 245, 245);
  font-size: 20px;
  height: 100%;
  padding: 0 20px;
  outline: none;
  font-weight: 500;
  pointer-events: ${(props) => (props.pointer ? "none" : "auto")};
  opacity: ${(props) => (props.pointer ? 0.3 : 1)};
`;

const Wrap = styled.div`
  position: relative;
  width: 600px;
  height: 200px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
`;

const WrapTitle = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-50%);
  background-color: transparent;
  text-align: center;
`;

const Title = styled.span`
  background-color: white;
  padding: 0 15px;
  font-size: 20px;
  font-weight: 500;
`;

const Label = styled.label`
  width: 200px;
  height: 100px;
  box-shadow: 0 3px 6px lightgray;
  border-radius: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 30px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 8px 6px lightgray;
    transform: translateY(-2.5px);
  }
  transition: all 300ms ease;
`;

const DeleteBtn = styled.button`
  width: 100px;
  height: 50px;
  border: 2.5px solid red;
  border-radius: 15px;
  &:hover {
    color: white;
    background-color: red;
  }
  transition: all 300ms ease;
  color: red;
`;
const Status = styled.h3`
  color: ${(props) => props.color};
  font-size: 10px;
  margin-top: 10px;
`;

const DelContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const DelTitle = styled.div`
  text-align: center;
  font-size: 30px;
`;
const RealDelBtn = styled.button`
  width: 120px;
  height: 60px;
  border: 3px solid red;
  color: red;
  font-size: 20px;
  font-weight: 500;
  border-radius: 15px;
`;

const Setting = ({ getUserInfo, userData }) => {
  const clonedeep = require("lodash.clonedeep");
  const [delCondition, setDelCondition] = useState({
    status: false,
    password: "",
  });
  const [delPopup, setDelPopup] = useState();
  const [userInfo, setUserInfo] = useState(
    userData && {
      name: userData.data.name,
      password: userData.data.password,
      phone: userData.data.phone,
      site: userData.data.site,
    }
  );

  const formData = new FormData();
  const ref = useRef();
  userInfo && console.log(userInfo.name.length);
  const setProfileImage = async (e) => {
    try {
      formData.append("profile", e.target.files[0]);
      const res = await imageApi.setUserProfileImage(formData);
      res && getUserInfo();
    } catch (e) {
      console.log(e);
    } finally {
      formData.delete("profile");
    }
  };

  const changeValue = (e) => {
    const copy = clonedeep(userInfo);
    copy[e.target.dataset.type] = e.target.value;
    setUserInfo(copy);
  };
  const setValue = async (e) => {
    e.preventDefault();
    try {
      const { data } = await userApi.updateUserInfo({
        [e.target.dataset.type]: userInfo[e.target.dataset.type],
      });
      data && getUserInfo();
    } catch (e) {
      console.log(e);
    }
  };

  const statusReturn = () => {
    return <Status color="green">Change completed</Status>;
  };

  const popupReturn = () => {
    return (
      <Popup
        status={true}
        component={DeleteReturn}
        size={{ width: "500px", height: "500px" }}
        setPopup={setDelPopup}
        notover={true}
      ></Popup>
    );
  };

  const DeleteReturn = () => (
    <DelContainer>
      <DelTitle>
        <FontAwesomeIcon
          icon={faSkullCrossbones}
          style={{ fontSize: 100, marginBottom: 20 }}
        />
        <h3>User Withdrawal</h3>
      </DelTitle>
      {realDelBtnReturn(delCondition.status)}
    </DelContainer>
  );

  const realDelBtnReturn = (condition) =>
    condition ? (
      <RealDelBtn onClick={() => deleteUser(delCondition.password)}>
        Delete
      </RealDelBtn>
    ) : (
      <Input
        placeholder="Please enter password"
        style={{ width: 300, height: 50 }}
        type="password"
        onChange={(e) => login(e.target.value)}
      ></Input>
    );

  const login = async (pw) => {
    try {
      const { data } = await AuthApi.getLoginToken(userData.data.username, pw);
      {
        data &&
          setDelCondition({
            status: true,
            password: pw,
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (password) => {
    console.log(password);
    try {
      const res = await userApi.deleteUser({ password });
      res && console.log("i'm deleted");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <Container>
        <Section
          title={"Setting"}
          message={"Set the member information."}
          nav={true}
        />
        {userInfo && (
          <>
            <UserSetting style={{ marginTop: "50px" }}>
              <UserTitle>
                <h2 style={{ margin: "20px 0 " }}>User Information</h2>
              </UserTitle>
              <FormSection style={{ marginTop: "50px" }}>
                <h2 style={{ margin: "15px 0 " }}>name</h2>
                <Form onkeydown="return event.key != 'Enter';">
                  <InputBox>
                    <Input
                      type="text"
                      value={userInfo.name}
                      data-type="name"
                      onChange={changeValue}
                    />
                  </InputBox>
                  <InputBox>
                    <Input
                      type="submit"
                      value="RESET"
                      data-type="name"
                      onClick={setValue}
                      pointer={!(userInfo.name.length > 1)}
                    />
                  </InputBox>
                </Form>
                {/* {statusReturn()} */}
              </FormSection>
              <FormSection style={{ marginTop: "50px" }}>
                <h2 style={{ margin: "15px 0 " }}>Password</h2>
                <Form>
                  <InputBox>
                    <Input
                      type="password"
                      value={userInfo.password}
                      data-type="password"
                      onChange={changeValue}
                      placeholder="Please type new password"
                    />
                  </InputBox>
                  <InputBox>
                    <Input
                      type="submit"
                      value="RESET"
                      data-type="password"
                      onClick={setValue}
                    />
                  </InputBox>
                </Form>
              </FormSection>
              <FormSection style={{ marginTop: "50px" }}>
                <h2 style={{ margin: "15px 0 " }}>PhoneNumber</h2>
                <Form>
                  <InputBox>
                    <Input
                      type="text"
                      value={userInfo.phone}
                      data-type="phone"
                      onChange={changeValue}
                    />
                  </InputBox>
                  <InputBox>
                    <Input
                      type="submit"
                      value="RESET"
                      data-type="phone"
                      onClick={setValue}
                    />
                  </InputBox>
                </Form>
              </FormSection>
              <FormSection style={{ marginTop: "50px" }}>
                <h2 style={{ margin: "15px 0 " }}>Site</h2>
                <Form>
                  <InputBox>
                    <Input
                      type="text"
                      value={userInfo.site}
                      data-type="site"
                      onChange={changeValue}
                    />
                  </InputBox>
                  <InputBox>
                    <Input
                      type="submit"
                      value="RESET"
                      data-type="site"
                      onClick={setValue}
                    />
                  </InputBox>
                </Form>
              </FormSection>
            </UserSetting>
            <UserSetting style={{ marginTop: "50px" }}>
              <UserTitle>
                <h2 style={{ margin: "20px 0 " }}>User Image</h2>
              </UserTitle>
              <Wrap>
                <WrapTitle>
                  <Title>Please upload an image of a square image.</Title>
                </WrapTitle>
                <Label for="input-file">
                  <FontAwesomeIcon icon={faCloudUploadAlt}></FontAwesomeIcon>
                  <h2 style={{ fontSize: 20 }}>Upload</h2>
                </Label>
                <Input
                  style={{ display: "none" }}
                  type="file"
                  id="input-file"
                  ref={ref}
                  onChange={setProfileImage}
                ></Input>
              </Wrap>
            </UserSetting>
            <UserSetting style={{ marginTop: "50px" }}>
              <UserTitle>
                <h2 style={{ margin: "20px 0 " }}>User Withdrawal</h2>
              </UserTitle>
              <Wrap style={{ borderColor: "red" }}>
                <WrapTitle style={{ color: "red" }}>
                  <Title>Dangerous Zone</Title>
                </WrapTitle>
                <DeleteBtn onClick={() => setDelPopup(true)}>Delete</DeleteBtn>
              </Wrap>
            </UserSetting>
          </>
        )}
        {delPopup && popupReturn()}
      </Container>
    </motion.div>
  );
};

export default Setting;
