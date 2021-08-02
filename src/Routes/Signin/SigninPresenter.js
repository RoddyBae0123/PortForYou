import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleFontLoader from "react-google-font-loader";
import wifi from "../../wifi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Back = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 1150px;
  height: 600px;
  border-radius: 20px;
  box-shadow: 3px 3px 0vw black;
`;

const Signup = styled.div`
  background-color: RGB(255, 211, 181);
  border-radius: 20px 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Signin = styled.div`
  background-color: white;
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Warning = styled.p`
  font-size: 20px;
  color: red;
  display: ${(props) => (props.status ? "block" : "none")};
`;

const Linkto = styled(Link)`
  display: flex;
  justify-content: center;
`;
const Logo = styled.img`
  width: 22%;
  padding-bottom: 10px;
  border-bottom: 5px solid RGB(255, 140, 148);
`;
const Lefttitle = styled.h1`
  text-align: center;
  font-size: 40px;
  margin: 20px 0 20px 0;
`;

const LeftAdd = styled.h3`
  text-align: center;
  font-size: 14px;
  margin-bottom: 45px;
`;
const Button = styled.button`
  background-color: RGB(255, 140, 148);
  width: 300px;
  height: 56px;
  border-radius: 20px;
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  transition: all 300ms ease-in-out;
`;

const Righttitle = styled.h1`
  text-align: center;
  font-size: 50px;
  margin: 0px 0 20px 0;
  font-weight: 600;
  color: RGB(255, 140, 148);
`;

const RightAdd = styled.h3`
  text-align: center;
  font-size: 20px;
  color: RGB(59, 72, 81);
  font-weight: 600;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Inputdef = styled.input`
  width: 300px;
  height: 56px;
  margin: 10px 0;
  outline: none;
  background-color: RGB(238, 238, 238);
  border: none;
  &:focus {
    background-color: #f4f8f7;
  }
  transition: all 300ms ease-in-out;
  font-size: 20px;
  padding: 20px;
`;
const Submitdef = styled.input`
  width: 300px;
  height: 56px;
  margin: 30px 0 10px 0;
  outline: none;
  background-color: white;

  border: 5px solid RGB(255, 140, 148);
  transition: all 300ms ease-in-out;
  &:hover {
    background-color: RGB(255, 140, 148);
  }
  border-radius: 20px;
  cursor: pointer;
`;
const A = styled.a``;
const SigninPresenter = ({ login, error }) => {
  var id = undefined;
  var pw = undefined;

  const handleSubmit = (event) => {
    event.preventDefault();

    id = event.target[0].value;
    pw = event.target[1].value;
    login(id, pw);
  };

  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, 600],
          },
          {
            font: "Roboto Mono",
            weights: [400, 700],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <Back>
        <Container>
          <Signup>
            <Linkto to="/">
              <Logo src={`${wifi}api/img/default/logo`}></Logo>
            </Linkto>
            <Lefttitle>Welcome Developer!</Lefttitle>
            <LeftAdd>
              If you don't have an account you registered for,
              <br />
              try creating a new cool and sexy account!{" "}
            </LeftAdd>
            <Linkto to="/signup">
              <Button>SIGN UP</Button>
            </Linkto>
          </Signup>
          <Signin>
            <Righttitle>Login</Righttitle>
            <RightAdd>Please type the infomation</RightAdd>
            <Form onSubmit={handleSubmit}>
              <Inputdef placeholder="Id" type="text" name="id"></Inputdef>
              <Inputdef
                placeholder="Password"
                type="password"
                name="pw"
              ></Inputdef>
              <Submitdef type="submit" value="SIGN IN"></Submitdef>
            </Form>
            <Form>
              <A href="#">
                <Button style={{ width: 300, backgroundColor: "#E5E5E5" }}>
                  <FontAwesomeIcon icon={faGoogle} size="3x" />{" "}
                </Button>
              </A>
            </Form>
          </Signin>
        </Container>
      </Back>
    </>
  );
};

export default SigninPresenter;
