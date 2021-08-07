import styled from "styled-components";
import Auth from "../../../Auth";
import axios from "axios";
import wifi from "../../../wifi";
import { useEffect, useState, memo } from "react";
import Loader from "react-loader-spinner";
import Select from "../../../Components/Select";
import Project from "../../../Components/Project";
import Stack from "../../../Components/Stack";
import Education from "../../../Components/Education";
import { motion } from "framer-motion";
import $ from "jquery";
import { studyApi, portFolioApi, imageApi } from "../../../Api";

const Makecenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const Container = styled.form`
  margin-top: 60px;
  width: 100%;
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
  height: 150px;
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3.5px solid lightgray;
  border-radius: 15px;
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
  border: 3.5px solid white;
  width: 400px;
  height: 60px;
  border-radius: 10px;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  transition: border 300ms ease-out;
  &:focus {
    border-color: lightgreen;
  }
  text-align: center;
`;
const ContentInput = styled.input`
  outline: none;
  border: 3.5px solid white;
  width: 300px;
  height: 60px;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  transition: border 300ms ease-out;
  &:focus {
    border-color: lightgreen;
  }
  text-align: center;
`;

const SubTitle = styled.h1`
  background-color: white;
  position: absolute;
  top: -0.5rem;
  left: 3.5rem;
  padding: 0 7px;
  font-weight: 500;
`;

function ResumeDetail({ match, history }) {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPortFolio(Idx);
      getPositionList();
      getEducationList();
      data && setImage(data.img);
      getFullStack();
    }

    return () => (mounted = false);
  }, []);

  const [main, setMain] = useState();
  const Idx = match.params.idx;
  const accessToken = Auth.getAccessToken();
  const [data, setData] = useState(false); //Entire Data
  const [project, setProject] = useState(); //Entire Data.project Data
  const [fullStack, setFullStack] = useState();
  const [image, setImage] = useState();
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
    } catch (e) {
      console.log(e);
    }
  };
  const [stackData, setStack] = useState([]); //project Data=>stack data of project
  const getStackList = async (name) => {
    try {
      const { data } = await portFolioApi.getStackList(name);

      {
        data && console.log(data);
      }

      {
        data && setStack(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getFullStack = async () => {
    try {
      const { data } = await portFolioApi.getStackList("");

      {
        data && console.log(data);
      }

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
      result && getPortFolio(Idx);
      result && console.log(result);
    } catch (e) {
      console.log(e);
    }
    // const api = await axios.create({
    //   baseURL: `${wifi}`,
    // });
    // console.log(Idx);
    // api
    //   .post("/api/img/portfolio", formData, {
    //     headers: {
    //       Authorization: `Bearer ${Auth.getAccessToken()}`,
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   // .then((res) => {
    //   //   setRender(res);
    //   // })
    //   // .catch((t) => console.log(t));
  };

  const setResumeList = async () => {
    try {
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

  return data && main ? (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <div style={{ marginTop: "60px" }}>
        <Container>
          <SubmitBtnHandler type="button" onClick={show}>
            Submit
          </SubmitBtnHandler>
          <UserInfo>
            <UserSection data={1}>
              <UserTitle>
                <TitleInput
                  placeholder="Plz Enter Title (2-15)"
                  name="title"
                  value={main.title}
                  onChange={mainHandler}
                />
                <ContentInput
                  placeholder="Plz Enter Content (2-10)"
                  style={{ fontWeight: "400" }}
                  name="content"
                  value={`${main.content}`}
                  onChange={mainHandler}
                />
              </UserTitle>
            </UserSection>
            <UserSection>
              <UserFace
                onClick={() => {
                  $("#portfolio_img_input").click();
                }}
              >
                <SubTitle>Choose your Image</SubTitle>
                <img
                  src={`${wifi}api/img/default/${Idx}_portfolio_img?date=${new Date().toString()}`}
                  style={{
                    height: "70%",
                    borderRadius: "15px",
                    boxShadow: "0 10px 15px lightgray",
                  }}
                ></img>
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
            </UserSection>
          </UserInfo>
          <SectionTitle>
            <h1 style={{ margin: "30px 0" }}>Position</h1>
          </SectionTitle>
          <Select
            data={data.position}
            positionData={positionData}
            detail={position}
            setDetail={setPosition}
          />
          <SectionTitle>
            <h1 style={{ margin: "30px 0" }}>Education</h1>
          </SectionTitle>
          <Education
            data={data.education}
            educationData={educationData}
            detail={education}
            setDetail={setEducation}
          />
          <SectionTitle>
            <h1 style={{ margin: "30px 0" }}>Project</h1>
          </SectionTitle>
          <Project
            data={data.project}
            setDetail={setProject}
            detail={project}
            stackData={fullStack}
          />
          <SectionTitle>
            <h1 style={{ margin: "30px 0" }}>Stack</h1>
          </SectionTitle>
          <Stack
            data={data.tech}
            stackData={stackData}
            detail={stackNew}
            setDetail={setStackNew}
            getStackList={getStackList}
            setStack={setStack}
          />
        </Container>
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

export default memo(ResumeDetail);
