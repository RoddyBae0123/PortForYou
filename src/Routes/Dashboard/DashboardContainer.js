import { useEffect, useState } from "react";
import Auth from "../../Auth";
import DashboardPresenter from "./DashboardPresenter";
import axios from "axios";
import wifi from "../../wifi";
import { Link } from "react-router-dom";
import { useAsync } from "react-async";
import { studyApi, portFolioApi } from "../../Api";
const DashboardContainer = ({ match, history }) => {
  const [data, setData] = useState(undefined); //resume data
  const [profileImgUri, setProfileImgUri] = useState(undefined); //change profile
  const [userData, setUserData] = useState(undefined); //user information
  const [study, setStudy] = useState(undefined);
  const [newAnnList, setNewAnnList] = useState(undefined);
  const getUserInfo = async () => {
    const api = await axios.create({
      baseURL: `${wifi}`,
    });

    api
      .get("/api/userInfo", {
        headers: {
          Authorization: `Bearer ${Auth.getAccessToken()}`,
        },
      })
      .then((res) => {
        setUserData(res);
        setProfileImgUri(res.data.img);
        console.log(Auth.getAccessToken());
      })
      .catch((e) => {
        if (e) {
          console.log(e);
          console.log(Auth.getAccessToken());
        }
      });
  };

  const getResumeList = async () => {
    try {
      const res = await portFolioApi.getPortFolioList();
      {
        res && setData(res);
      }
    } catch (e) {
      console.log(e);
      // if (e.response.status === 401) {
      //   history.push("/error401");
      // }
    }
  };

  const setProfileImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", e.target.files[0]);
    const api = await axios.create({
      baseURL: `${wifi}`,
    });
    api
      .post("/api/img/user", formData, {
        data: FormData,
        headers: {
          Authorization: `Bearer ${Auth.getAccessToken()}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (profileImgUri.slice(-1) != "&")
          setProfileImgUri(
            "api/img/default?name=" + userData.data.uid + "_profile_img&"
          );
        if (profileImgUri.slice(-1) == "&")
          setProfileImgUri(
            "api/img/default?name=" + userData.data.uid + "_profile_img"
          );
      })
      .catch((t) => console.log(t));
  };

  const DelResumeBtn = async (e) => {
    try {
      const result = await portFolioApi.deletePortFolio(
        e.target.parentElement.id
      );
      {
        result && getResumeList(Auth.getAccessToken());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getStudyList = async (apply) => {
    try {
      const { data } = await studyApi.getStudyList(apply);
      {
        data && setStudy(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getNewAnnList = async () => {
    try {
      const { data } = await studyApi.getNewAnnouncementList();
      {
        data && setNewAnnList(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo();
    getNewAnnList();
  }, []);

  return (
    <>
      <DashboardPresenter
        match={match}
        data={data}
        method={getResumeList}
        profileImgUri={profileImgUri}
        imageHandler={setProfileImage}
        setData={setData}
        DelResumeBtn={DelResumeBtn}
        getStudyList={getStudyList}
        history={history}
        setStudy={setStudy}
        study={study}
        newAnnList={newAnnList}
      ></DashboardPresenter>
    </>
  );
};

export default DashboardContainer;
