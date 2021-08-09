import { useEffect, useState, memo } from "react";
import Auth from "../../Auth";
import DashboardPresenter from "./DashboardPresenter";
import axios from "axios";
import wifi from "../../wifi";
import { Link } from "react-router-dom";
import { useAsync } from "react-async";
import { studyApi, portFolioApi, userApi } from "../../Api";
const DashboardContainer = ({ match, history }) => {
  const [data, setData] = useState(undefined); //resume data
  const [profileImgUri, setProfileImgUri] = useState(undefined); //change profile
  const [userData, setUserData] = useState(undefined); //user information
  const [study, setStudy] = useState(undefined);
  const [otherAnnList, setOtherAnnList] = useState(undefined);
  const [alCondition, setAlcondition] = useState({
    pno: 1,
    kind: "recommend",
    query: undefined,
  });
  const [roomCondition, setRoomCondition] = useState({
    kind: "managed",
  });

  const getUserInfo = async () => {
    try {
      const result = await userApi.getUserInfo();
      result && setUserData(result);
      result && setProfileImgUri(result.data.img);
    } catch (e) {
      console.log(e);
    }
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
  const getOtherAnnList = async ({ pno, kind, query }) => {
    try {
      setOtherAnnList(undefined);
      const { data } = await studyApi.getOtherAnnouncementList({
        pno,
        kind,
        query,
      });
      {
        data && setOtherAnnList(data);
      }
      console.log(pno, kind, query);
      {
        data && console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOtherAnnList({
      pno: alCondition.pno,
      kind: alCondition.kind,
      query: alCondition.query,
    });
  }, [alCondition]);

  useEffect(() => {
    roomCondition.kind === "managed" ? getStudyList(false) : getStudyList(true);
  }, [roomCondition]);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <DashboardPresenter
        match={match}
        data={data}
        method={getResumeList}
        profileImgUri={profileImgUri}
        getUserInfo={getUserInfo}
        imageHandler={setProfileImage}
        setData={setData}
        DelResumeBtn={DelResumeBtn}
        getStudyList={getStudyList}
        history={history}
        setStudy={setStudy}
        study={study}
        otherAnnList={otherAnnList}
        getOtherAnnList={getOtherAnnList}
        setAlcondition={setAlcondition}
        alCondition={alCondition}
        roomCondition={roomCondition}
        setRoomCondition={setRoomCondition}
      ></DashboardPresenter>
    </>
  );
};

export default memo(DashboardContainer);
