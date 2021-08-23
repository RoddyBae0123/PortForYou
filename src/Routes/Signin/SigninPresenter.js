import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleFontLoader from "react-google-font-loader";
import wifi from "../../wifi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import "../../style/localStyle.css";

const Back = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 25% 50% 25%;
  width: 100%;
  height: 100%;
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
  align-items: center;
`;

const Warning = styled.p`
  font-size: 20px;
  color: red;
  display: ${(props) => (props.status ? "block" : "none")};
`;

const Linkto = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
`;
const Logo = styled.img`
  width: 50px;
  height: 50px;
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
  color: blue;
  padding: 0;

  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
  transition: all 300ms ease-in-out;
`;

const Righttitle = styled.h1`
  font-size: 35px;
  margin: 0px 0 10px 0;
  font-weight: 300;
  color: var(--color-text-ver1);
`;

const RightAdd = styled.h3`
  font-size: 15px;
  color: var(--color-text-ver2);
  font-weight: 600;
  margin-bottom: 40px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Inputdef = styled.input`
  width: 100%;
  height: 56px;
  margin: 10px 0;
  outline: none;
  background-color: var(--color-background);
  border: 1.5px solid var(--color-border);
  border-radius: 10px;
  &:focus {
    background-color: var(--color-background-focus);
  }
  transition: all 300ms ease-in-out;
  font-size: 20px;
  padding: 20px;
`;
const Submitdef = styled.input`
  width: 100%;
  height: 56px;
  margin: 30px 0 10px 0;
  outline: none;
  background-color: var(--color-button);
  border: none;
  border-radius: 10px;
  transition: all 300ms ease-in-out;
  &:hover {
    background-color: RGB(255, 140, 148);
  }
  cursor: pointer;
  color: white;
  font-weight: 500;
`;
const A = styled.a``;
const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: ${(props) => props.setting.justify};
  align-items: ${(props) => props.setting.align};
  flex-direction: ${(props) => props.setting.dir};
`;

const Text = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: rgb(74, 86, 94);
  display: inline-flex;
`;

const Bkg = styled.div`
  background-image: ${(props) => `url("${props.img}")`};
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  /* src="http://3.37.208.251:8080/api/img/default/537f38b1-4802-4d43-93d3-7d250196ca68" */
`;
const SigninPresenter = ({ login, error }) => {
  var id = undefined;
  var pw = undefined;

  const handleSubmit = (event) => {
    event.preventDefault();

    id = event.target[0].value;
    pw = event.target[1].value;
    login(id, pw);
  };

  const image = [
    "http://3.37.208.251:8080/api/img/default/537f38b1-4802-4d43-93d3-7d250196ca68",
    "http://3.37.208.251:8080/api/img/default/05f01946-68ae-4f9b-8a77-e6f24b44cab7",
    "http://3.37.208.251:8080/api/img/default/49b22ec5-cdfd-4223-80a7-2f1e00a5ce7d",
    "http://3.37.208.251:8080/api/img/default/8292c625-4570-4ad6-98a5-bc71824e9e4e",
    "https://mblogthumb-phinf.pstatic.net/MjAxOTA2MjdfNjQg/MDAxNTYxNTcwMzQ3MDc0.xOVxrWK4WChc7XFGLKaKTo6u7MyW4lWanGZXcOWeFvAg.QPO7uSTfULJn3gaflZgd7KKFXURydUU-WuLK-wc4QQIg.JPEG.izonestrm/joyuri-20190627-023130-000-resize.jpg?type=w800",
  ];

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
        subsets={(["cyrillic-ext", "greek"], ["cyrillic-ext", "greek"])}
      />

      <Back>
        <Container>
          <Flex
            setting={{
              justify: "flex-start",
              align: "center",
              dir: "column",
            }}
            style={{ width: "100%", marginTop: 30 }}
          >
            <Linkto to="/" style={{ width: 300 }}>
              <Logo src={`${wifi}api/img/default/logo_transparent`} />
              <Text
                size={"25px"}
                weight={"700"}
                style={{
                  marginLeft: 20,
                  color: `var(--color-text-ver1) `,
                  fontFamily: "Josefin Sans', cursive",
                }}
                className="set"
              >
                StudyMall
              </Text>
            </Linkto>
          </Flex>
          <Signin>
            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "column",
              }}
              style={{ width: "300px" }}
            >
              <Righttitle>Sign in to StudyMall</Righttitle>
              <RightAdd>Please enter your credentials to proceed.</RightAdd>
            </Flex>
            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "column",
              }}
              style={{ width: "300px" }}
            >
              <Form onSubmit={handleSubmit}>
                <Inputdef
                  placeholder="Email address"
                  type="text"
                  name="id"
                ></Inputdef>
                <Inputdef
                  placeholder="Password"
                  type="password"
                  name="pw"
                ></Inputdef>
                <Submitdef type="submit" value="Sign in"></Submitdef>
              </Form>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
              >
                <Text
                  size={"15px"}
                  weight={"400"}
                  style={{
                    color: `var(--color-text-ver3)`,
                  }}
                >
                  Don't have an account?
                  <Text
                    as={Link}
                    to="/signup"
                    size={"15px"}
                    weight={"400"}
                    style={{
                      marginLeft: 20,
                      color: "blue",
                    }}
                  >
                    <Button>SIGN UP</Button>
                  </Text>
                </Text>
              </Flex>
            </Flex>

            {/* <Form>
              <A href="#">
                <Button style={{ width: "100%", backgroundColor: "#E5E5E5" }}>
                  <FontAwesomeIcon icon={faGoogle} size="3x" />{" "}
                </Button>
              </A>
            </Form> */}
          </Signin>
          <div></div>
        </Container>
        <Bkg img={image[Math.floor(Math.random() * image.length)]}></Bkg>
      </Back>
    </>
  );
};

export default SigninPresenter;
