import RoomBoardPresenter from "./RoomBoardPresenter";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { useEffect, useState } from "react";
import axios from "axios";
import wifi from "../../wifi";
import Auth from "../../Auth";
import { portFolioApi, studyApi } from "../../Api";

const RoomBoardContainer = (props) => {
  const [profileImgUri, setProfileImgUri] = useState(undefined); //change profile
  const [userData, setUserData] = useState(undefined); //user information
  const [position, setPosition] = useState([]);
  const { match, location, history } = props;

  const {
    state: { idx },
  } = location;
  const [rcSave, setRcSave] = useState();
  const [annList, setAnnList] = useState();
  const [ann, setAnn] = useState();
  const [applicant, setApplicant] = useState();
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
        setProfileImgUri(
          "api/img/default?name=" + res.data.uid + "_profile_img"
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const save = (e) => {
    setRcSave({
      studyIdx: idx,
      title: "",
      content: "",
    });
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

  const getPositionList = async () => {
    try {
      const { data } = await portFolioApi.getPosition();
      {
        data &&
          data.map((e) => {
            setPosition((position) => [
              ...position,
              {
                name: e.name,
                position: {
                  idx: e.idx,
                },
                demand: 1,
                checked: false,
              },
            ]);
          });
      }
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const saveRecruit = async (rcSave) => {
    try {
      const response = await studyApi.saveRecruit(rcSave);
      {
        response && console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getAnnouncementList = async (idx) => {
    try {
      const { data } = await studyApi.getAnnouncementList(idx);
      {
        data && console.log(data);
      }
      {
        data && getAnn(data[0].idx);
      }
      {
        data && setAnnList([...data]);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getAnn = async (idx) => {
    try {
      const data = await studyApi.getAnnouncement(idx);
      {
        data && setAnn(data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getApplication = async () => {
    try {
      const { data } = await studyApi.getApplicationByStudyIdx(idx);
      {
        data && setApplicant(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUserInfo();
    getAnnouncementList(idx);
    console.log(idx);
  }, []);

  return (
    <RoomBoardPresenter
      location={location}
      match={match}
      history={history}
      profileImgUri={profileImgUri}
      getPositionList={getPositionList}
      position={position}
      setPosition={setPosition}
      setRcSave={setRcSave}
      rcSave={rcSave}
      saveRecruit={saveRecruit}
      save={save}
      props={props}
      annList={annList}
      ann={ann}
      getApplication={getApplication}
      applicant={applicant}
    />
  );
};

export default RoomBoardContainer;
