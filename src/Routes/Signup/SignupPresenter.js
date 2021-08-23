import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import GoogleFontLoader from "react-google-font-loader";
import wifi from "../../wifi";
import "./style.css";
const Back = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  width: 100%;
  height: 100vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 25% 75%;
  width: 100%;
  height: 100%;
`;

const Signup = styled.div`
  background-color: white;
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Signin = styled.div`
  background-color: white;
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
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
`;
const Inputdef = styled.input`
  width: 100%;
  height: 56px;
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
const Isiterror = styled.h3`
  opacity: ${(props) => (props.status ? 1 : 0)};
  color: #ff3030;
  margin: 5px 0;
`;

const Bkg = styled.div`
  background-image: ${(props) => `url("${props.img}")`};
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  /* src="http://3.37.208.251:8080/api/img/default/537f38b1-4802-4d43-93d3-7d250196ca68" */
`;

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

const SignupPresenter = ({ push }) => {
  const image = [
    "http://3.37.208.251:8080/api/img/default/537f38b1-4802-4d43-93d3-7d250196ca68",
    "http://3.37.208.251:8080/api/img/default/05f01946-68ae-4f9b-8a77-e6f24b44cab7",
    "http://3.37.208.251:8080/api/img/default/49b22ec5-cdfd-4223-80a7-2f1e00a5ce7d",
    "http://3.37.208.251:8080/api/img/default/8292c625-4570-4ad6-98a5-bc71824e9e4e",
    "https://mblogthumb-phinf.pstatic.net/MjAxOTA2MjdfNjQg/MDAxNTYxNTcwMzQ3MDc0.xOVxrWK4WChc7XFGLKaKTo6u7MyW4lWanGZXcOWeFvAg.QPO7uSTfULJn3gaflZgd7KKFXURydUU-WuLK-wc4QQIg.JPEG.izonestrm/joyuri-20190627-023130-000-resize.jpg?type=w800",
  ];

  const [Errorid, setErrorid] = useState(false);
  const [Errorpw, setErrorpw] = useState(false);
  const [Errorusername, setErrorusername] = useState(false);
  const [id, setid] = useState("");
  const [pw, setpw] = useState("");
  const [username, setusername] = useState("");

  var errormessage = "";
  var pattern_num = /[0-9]/;
  var pattern_eng = /[a-zA-Z]/;
  var pattern_spc = /[~!@#$%^&*()_+|<>?:{}]/;
  const email_check = (email) => {
    var regex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return email != "" && email != "undefined" && regex.test(email);
  };
  const password_check = (pw) => {
    return (
      pattern_num.test(pw) &&
      pattern_eng.test(pw) &&
      pattern_spc.test(pw) &&
      pw.length >= 8 &&
      pw.length <= 16
    );
  };
  const name_check = (name) => {
    return name.length > 1;
  };
  const Signup__submit = async (username, password, name) => {
    const api = await axios.create({
      baseURL: `${wifi}`,
    });
    api
      .post("/api/user", {
        username,
        password,
        name,
      })
      .then((res) => {
        push("/dashboard");
        res && console.log(res);
      })
      .catch(async (e) => {
        errormessage = await e.response.status;
        errorCatch(errormessage);
      });
  };
  const errorCatch = (e) => {
    if (e === 403) {
      setErrorid("dup");
      pwnumcheck();
    }
  };

  const setvalue = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "id") {
      setid(value);
    } else if (name === "pw") {
      setpw(value);
    } else if (name === "username") {
      setusername(value);
    }
  };
  const pwnumcheck = () => {
    !password_check(pw) ? setErrorpw(true) : setErrorpw(false);
    !name_check(username) ? setErrorusername(true) : setErrorusername(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email_check(id) && password_check(pw) && name_check(username)) {
      Signup__submit(id, pw, username);
    } else {
      if (!email_check(id)) {
        setErrorid("normal");
      } else {
        setErrorid(false);
      }
      pwnumcheck();
    }
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
          {/* <Signup>
            <Linkto to="/">
              <Logo src={`${wifi}api/img/default/logo`}></Logo>
            </Linkto>
            <Lefttitle>Welcome Developer!</Lefttitle>
            <LeftAdd>
              To keep connected with us ,<br />
              please login with your personal info{" "}
            </LeftAdd>
            <Linkto to="/signin">
              <Button>SIGN IN</Button>
            </Linkto>
          </Signup> */}
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
              <Righttitle>Get started for free</Righttitle>
              <RightAdd>Free forever. No credit card needed.</RightAdd>
            </Flex>
            <Form onSubmit={handleSubmit}>
              <Inputdef
                placeholder="Email"
                type="text"
                name="id"
                onChange={setvalue}
              ></Inputdef>
              <Isiterror status={Errorid} data-type="id">
                {`${Errorid}` === "normal"
                  ? "Please enter email correctly."
                  : "Id is duplicated!"}
              </Isiterror>
              <Inputdef
                placeholder="Password"
                type="password"
                name="pw"
                onChange={setvalue}
              ></Inputdef>
              <Isiterror
                status={Errorpw}
                data-type="password"
                className="error"
              >
                Please enter password correctly.
              </Isiterror>
              <Inputdef
                placeholder="name"
                type="text"
                name="username"
                onChange={setvalue}
              ></Inputdef>
              <Isiterror
                status={Errorusername}
                data-type="name"
                className="error"
              >
                Please enter username correctly.
              </Isiterror>
              <Submitdef type="submit" value="SIGN UP"></Submitdef>
            </Form>
          </Signin>
        </Container>
        <Bkg img={image[Math.floor(Math.random() * image.length)]}></Bkg>
      </Back>
    </>
  );
};

export default SignupPresenter;
