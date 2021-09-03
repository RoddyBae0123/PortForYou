import styled from "styled-components";
import Auth from "../../../Auth";
import axios from "axios";
import wifi from "../../../wifi";
import { useEffect, useState, memo, useMemo, useRef } from "react";
import Loader from "react-loader-spinner";
import Select from "../../../Components/Select";
import Project from "../../../Components/Project";
import Stack from "../../../Components/Stack";
import Education from "../../../Components/Education";
import { motion } from "framer-motion";
import $ from "jquery";
import { studyApi, portFolioApi, imageApi } from "../../../Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { actionCreators } from "../../../store";
const Makecenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.form`
  margin-top: 60px;
  width: 80%;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 70px 0;
  width: 100%;
  height: 150px;
`;
const UserSection = styled.div`
  display: flex;
  justify-content: ${(props) => (props.data ? `flex-end` : `flex-start`)};
  align-items: center;
  border-right: ${(props) =>
    props.data ? `3.5px solid RGB(212, 212, 212)` : `none`};
  padding: ${(props) => (props.data ? `0 95px 0 0` : `0 0 0 95px`)};
`;
const UserTitle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;
const UserFace = styled.div`
  position: relative;
`;
const SectionTitle = styled.div`
  display: flex;
  font-size: 40px;
  font-weight: 600;
  align-items: center;
  width: 80%;
  margin: 0 0 30px 0;
`;

const SubmitBtnHandler = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 30px;
  background-color: white;
  border: 1.8px solid #d4d4d4;
  border-radius: 5px;
  font-size: 5px;
  box-shadow: 0 3px 6px rgba(149, 157, 165, 0.15);
`;
const TitleInput = styled.input`
  outline: none;
  border: 1px solid var(--color-border);
  width: 100%;
  height: 60px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 400;
  margin-bottom: 20px;
  background-color: var(--color-background);
  transition: border 300ms ease-out;
  padding: 0 20px;
`;
const ContentInput = styled.textarea`
  outline: none;
  border: 1px solid var(--color-border);
  width: 100%;
  height: 120px;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 400;
  margin-bottom: 20px;
  background-color: var(--color-background);
  transition: border 300ms ease-out;
  padding: 20px;
  resize: none;
`;

const SubTitle = styled.h1`
  background-color: white;
  position: absolute;
  top: -0.5rem;
  left: 3.5rem;
  padding: 0 7px;
  font-weight: 500;
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
  color: ${(props) => props.color};
  display: inline-flex;
`;

const EditBtn = styled.button`
  width: 170px;
  height: 50px;
  border-radius: 10px;
  background-color: blue;
  color: white;
  font-size: 12px;
  font-weight: 500;
`;

const UserImg = styled.div`
  width: 220px;
  height: 220px;
  background-image: url("${(props) => `${props.src}`}");
  background-size: 100% auto;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
`;

const UserImgSet = styled.div`
  height: 30%;
  border-top: 1px solid var(--color-border);
  width: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 18px;
  color: #2e5bff;
  cursor: pointer;
  transition: all 300ms ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.87);
  }
`;
function ResumeDetail({ match, history, addToDo }) {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPortFolio(Idx);
      getPositionList();
      getEducationList();
      data && setImage(data.img);
      getFullStack();
      addToDo("getData", "getStackList", getStackList);
    }

    return () => (mounted = false);
  }, []);

  const Fuck = useRef();

  const [main, setMain] = useState();
  const Idx = match.params.idx;
  const [render, setRender] = useState(
    `${wifi}api/img/default/${Idx}_portfolio_img`
  );
  const accessToken = Auth.getAccessToken();
  const [data, setData] = useState(false); //Entire Data
  const [project, setProject] = useState(); //Entire Data.project Data
  const [fullStack, setFullStack] = useState();
  const [image, setImage] = useState();
  console.log(project);
  const getPortFolio = async (idx) => {
    try {
      const { data: port } = await portFolioApi.getPortFolio(idx);
      {
        port && console.log(port);
      }
      {
        port &&
          setMain({
            title: port.title,
            content: port.content,
          });
      }
      {
        port && setData(port);
      }
      {
        port && setProject(port.project);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [stackData, setStack] = useState([]); //project Data=>stack data of project
  const getStackList = async ({ name, idx, stackList, type }) => {
    try {
      const { data } = await portFolioApi.getStackList(name);

      {
        type === "project"
          ? data
            ? addToDo("data", "stackList", { ...stackList, [idx]: { data } })
            : addToDo("data", "stackList", {
                [idx]: { data },
              })
          : data && addToDo("data", "stackListReal", data);
      }

      // {
      //   data && setStack(data);
      // }
    } catch (e) {
      console.log(e);
    }
  };
  const getFullStack = async () => {
    try {
      const { data } = await portFolioApi.getStackList("");

      {
        data && setFullStack(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [positionData, setPositionData] = useState(undefined); //position Data=>position List
  const getPositionList = async () => {
    try {
      const { data } = await portFolioApi.getPosition();
      {
        data && setPositionData(data);
      }
      {
        data && console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [position, setPosition] = useState(undefined);

  const [educationData, setEducationData] = useState(undefined);
  const getEducationList = async () => {
    try {
      const { data } = await portFolioApi.getEducationList();
      {
        data && setEducationData(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [education, setEducation] = useState(undefined);

  const [stackList, setStackList] = useState([]);

  const [stackNew, setStackNew] = useState(undefined);
  const show = () => {
    setResumeList();
  };

  const changePortfolioImage = async (event) => {
    const formData = new FormData();
    formData.append("img", event.target.files[0]);
    // formData.append("portfolio_idx", Idx);
    try {
      const result = await imageApi.setPortfolio(Idx, formData);

      result &&
        setRender(
          `${wifi}api/img/default/${Idx}_portfolio_img?date=${new Date().toString()}`
        );

      result && setRender(`${wifi}api/img/default/${Idx}_portfolio_img`);

      // result &&
      //   Fuck.current.setAttribute(
      //     "src",
      //     `${wifi}api/img/default/${Idx}_portfolio_img`
      //   );
      result && console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  const setResumeList = async () => {
    try {
      console.log([...project]);
      const result = await portFolioApi.savePorFolio({
        idx: Idx,
        title: main.title,
        content: main.content,
        project: [...project],
        positionIdx: position.idx,
        tech: [...stackNew],
        educationIdx: education.idx,
      });
      {
        result && result.status === 201 && history.goBack();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const mainHandler = (e) => {
    const {
      target,
      target: { value, name },
    } = e;
    {
      name === "title"
        ? setMain({
            title: value,
            content: main.content,
          })
        : setMain({
            title: main.title,
            content: value,
          });
    }
  };

  // const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  return data && main ? (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <div style={{ marginTop: "50px" }}>
        <Flex setting={{ justify: "center", align: "flex-start", dir: "row" }}>
          <Container>
            <Flex
              setting={{
                justify: "space-between",
                align: "center",
                dir: "row",
              }}
              style={{ margin: "30px 0" }}
            >
              <Text
                weight={"300"}
                className="basic"
                color={"var(--color-text-ver1)"}
                size={"28px"}
              >
                PORTFOLIO EDIT
              </Text>
              <EditBtn type="button" className="basic" onClick={show}>
                SAVE CHANGES
              </EditBtn>
            </Flex>
            {/* <SubmitBtnHandler type="button" onClick={show}>
              Submit
            </SubmitBtnHandler> */}

            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "column",
              }}
              style={{ backgroundColor: "white", padding: 35 }}
            >
              <Text
                weight={"400"}
                className="basic"
                color={"var(--color-text-ver2)"}
                size={"18px"}
                style={{ letterSpacing: "2.5px", marginBottom: "30px" }}
              >
                HEADER INFOMATION
              </Text>
              <Text
                weight={"400"}
                className="basic"
                color={"black"}
                size={"15px"}
                style={{ marginBottom: "30px" }}
              >
                Please set the title, content and photo of the portfolio.
              </Text>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
                style={{ marginBottom: "30px" }}
              >
                <Text
                  weight={"500"}
                  className="basic"
                  color={"var(--color-text-ver3)"}
                  size={"14px"}
                  style={{ letterSpacing: "1.5px", marginBottom: "30px" }}
                >
                  IMAGE
                </Text>
                <UserFace>
                  <UserImg src={render} ref={Fuck} className="fuck">
                    <UserImgSet
                      onClick={() => {
                        $("#portfolio_img_input").click();
                      }}
                    >
                      <FontAwesomeIcon icon={faUpload} />
                      <Text
                        weight={"500"}
                        className="basic"
                        size={"20px"}
                        style={{ letterSpacing: "1.5px" }}
                      >
                        UPLOAD
                      </Text>
                    </UserImgSet>
                  </UserImg>

                  <form
                    style={{ display: "none" }}
                    onChange={changePortfolioImage}
                  >
                    <input
                      type="file"
                      name="img"
                      id="portfolio_img_input"
                    ></input>
                  </form>
                </UserFace>
              </Flex>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
                style={{ marginBottom: "30px" }}
              >
                <Text
                  weight={"500"}
                  className="basic"
                  color={"var(--color-text-ver3)"}
                  size={"14px"}
                  style={{ letterSpacing: "1.5px", marginBottom: "30px" }}
                >
                  TITLE
                </Text>
                <TitleInput
                  placeholder="Plz Enter Title (2-15)"
                  name="title"
                  value={main.title}
                  onChange={mainHandler}
                  className="basic"
                />
              </Flex>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
              >
                <Text
                  weight={"500"}
                  className="basic"
                  color={"var(--color-text-ver3)"}
                  size={"14px"}
                  style={{ letterSpacing: "1.5px", marginBottom: "30px" }}
                >
                  CONTENTS
                </Text>
                <ContentInput
                  placeholder="Plz Enter Content (2-10)"
                  style={{ fontWeight: "400" }}
                  name="content"
                  value={`${main.content}`}
                  onChange={mainHandler}
                  className="basic"
                />
              </Flex>
            </Flex>

            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "column",
              }}
              style={{
                backgroundColor: "white",
                padding: 35,
                marginTop: "35px",
              }}
            >
              <Text
                weight={"400"}
                className="basic"
                color={"var(--color-text-ver2)"}
                size={"18px"}
                style={{ letterSpacing: "2.5px", marginBottom: "30px" }}
              >
                POSITION
              </Text>
              <Text
                weight={"400"}
                className="basic"
                color={"black"}
                size={"15px"}
                style={{ marginBottom: "30px" }}
              >
                Please set your own position
              </Text>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
                style={{ marginBottom: "30px" }}
              >
                <Select
                  data={data.position}
                  positionData={positionData}
                  detail={position}
                  setDetail={setPosition}
                />
              </Flex>
            </Flex>
            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "column",
              }}
              style={{
                backgroundColor: "white",
                padding: 35,
                marginTop: "35px",
              }}
            >
              <Text
                weight={"400"}
                className="basic"
                color={"var(--color-text-ver2)"}
                size={"18px"}
                style={{ letterSpacing: "2.5px", marginBottom: "30px" }}
              >
                EDUCATION
              </Text>
              <Text
                weight={"400"}
                className="basic"
                color={"black"}
                size={"15px"}
                style={{ marginBottom: "30px" }}
              >
                Please set your own education
              </Text>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
                style={{ marginBottom: "30px" }}
              >
                <Education
                  data={data.education}
                  educationData={educationData}
                  detail={education}
                  setDetail={setEducation}
                />
              </Flex>
            </Flex>
            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "column",
              }}
              style={{
                backgroundColor: "white",
                padding: 35,
                marginTop: "35px",
              }}
            >
              <Text
                weight={"400"}
                className="basic"
                color={"var(--color-text-ver2)"}
                size={"18px"}
                style={{ letterSpacing: "2.5px", marginBottom: "30px" }}
              >
                PROJECT
              </Text>
              <Text
                weight={"400"}
                className="basic"
                color={"black"}
                size={"15px"}
                style={{ marginBottom: "30px" }}
              >
                Please enter your own project's infomation.
              </Text>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "center",
                  dir: "column",
                }}
              >
                <Project setDetail={setProject} detail={project} />
              </Flex>
            </Flex>
            <Flex
              setting={{
                justify: "flex-start",
                align: "flex-start",
                dir: "column",
              }}
              style={{
                backgroundColor: "white",
                padding: 35,
                margin: "35px 0",
              }}
            >
              <Text
                weight={"400"}
                className="basic"
                color={"var(--color-text-ver2)"}
                size={"18px"}
                style={{ letterSpacing: "2.5px", marginBottom: "30px" }}
              >
                STACK
              </Text>
              <Text
                weight={"400"}
                className="basic"
                color={"black"}
                size={"15px"}
                style={{ marginBottom: "30px" }}
              >
                Please enter your own stack's information.
              </Text>
              <Text
                weight={"500"}
                className="basic"
                color={"var(--color-text-ver3)"}
                size={"14px"}
                style={{ letterSpacing: "1.5px", marginBottom: "15px" }}
              >
                Search
              </Text>
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
              >
                <Stack
                  tech={data.tech}
                  stackData={stackData}
                  detail={stackNew}
                  setDetail={setStackNew}
                  getStackList={getStackList}
                  setStack={setStack}
                />
              </Flex>
            </Flex>
          </Container>
        </Flex>
      </div>
    </motion.div>
  ) : (
    <Makecenter>
      <Loader
        type="Rings"
        color="#FF8C94"
        height={300}
        width={300}
        timeout={10000}
      />
    </Makecenter>
  );
}
const getCurrentState = (state, ownProps) => {
  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (dataType, dataName, data) =>
      dispatch(actionCreators.addToDo(dataType, dataName, data)),
  };
};
export default connect(getCurrentState, mapDispatchToProps)(memo(ResumeDetail));
