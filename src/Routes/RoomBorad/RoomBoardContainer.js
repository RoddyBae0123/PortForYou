import RoomBoardPresenter from "./RoomBoardPresenter";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { useEffect, useState } from "react";
import axios from "axios";
import wifi from "../../wifi";
import Auth from "../../Auth";
import { portFolioApi, studyApi, boardApi, userApi } from "../../Api";
import { connect } from "react-redux";
import { actionCreators } from "../../store";

const RoomBoardContainer = (props) => {
  const [profileImgUri, setProfileImgUri] = useState(undefined); //change profile
  const [userData, setUserData] = useState(undefined); //user information
  const [position, setPosition] = useState([]);
  const { match, location, history, addToDo, ...rest } = props;

  const {
    state: { idx },
  } = location;
  const [rcSave, setRcSave] = useState();
  const [annList, setAnnList] = useState();
  const [ann, setAnn] = useState();
  const [applicant, setApplicant] = useState();
  const [status, setStatus] = useState();
  const [memberList, setMemberList] = useState();
  const getUserInfo = async () => {
    try {
      const res = await userApi.getUserInfo();
      res && setUserData(res);
      res && setProfileImgUri(res.data.img);
      addToDo("data", "myInfo", res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const save = (e) => {
    setRcSave({
      studyIdx: idx,
      title: "",
      content: "",
      Position: [],
    });
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
      const { status } = await studyApi.SaveAnnouncement(rcSave);
      {
        status === 200 && getAnnouncementList(rcSave.study.idx);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getAnnouncementList = async (idx) => {
    try {
      const { data } = await studyApi.getAnnouncementList(idx);
      data && console.log(data);
      {
        data.length ? getAnn(data[0].idx) : setAnn(undefined);
      }

      {
        data.length && setAnnList([...data]);
      }
    } catch (e) {
      e.response.status === 401 && setAnn("fuck");
    }
  };
  const clonedeep = require("lodash.clonedeep");

  const getAnn = async (idx) => {
    try {
      const { data } = await studyApi.getAnnouncement(idx);
      {
      }
      if (data) {
        var copyData = clonedeep(data);
        const checkedPosition = copyData.demandPosition.map((e) => ({
          idx: e.idx,
          position: e.position,
          studyAnnouncementIdx: e.studyAnnouncementIdx,
          demand: e.demand,
          applied: e.applied,
          checked: false,
        }));
        copyData.demandPosition = checkedPosition;
        setAnn(copyData);
      }
    } catch (e) {
      console.log(e);
      setStatus(e.response.status);
      {
        status && console.log(status);
      }
    }
  };

  const getApplication = async () => {
    try {
      const { data } = await studyApi.getApplicationByStudyIdx(idx);
      {
        data && setApplicant(data);
      }
      {
        data && console.log(data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const getMemberList = async () => {
    const { data } = await studyApi.getMembersByStudyIdx(idx);
    data && setMemberList(data);
  };
  const getBoardList = async () => {
    try {
      const { data } = await boardApi.getBoardList(idx);
      addToDo("data", "boardList", data);
    } catch (e) {
      console.log(e);
    }
  };

  const getBoard = async (idx) => {
    try {
      const { data } = await boardApi.getBoard(idx);
      addToDo("data", "board", data);
    } catch (e) {
      console.log(e);
    }
  };

  const setBoardList = async ({ studyIdx, idx, name, content }) => {
    try {
      const { data } = await boardApi.setBoard({
        studyIdx,
        name,
        content,
        idx,
      });
      data && getBoardList();
    } catch (e) {
      console.log(e);
    }
  };

  const getPosts = async (boardIdx) => {
    try {
      const { data } = await boardApi.getPosts(boardIdx);
      data && addToDo("data", "posts", data);
    } catch (e) {
      console.log(e);
    }
  };

  const setPost = async ({ boardIdx, idx, title, content }) => {
    try {
      const { data } = await boardApi.savePost({
        boardIdx,
        idx,
        title,
        content,
      });
      data && getPosts(boardIdx);
    } catch (e) {
      console.log(e);
    }
  };

  const getCalendars = async () => {
    try {
      const { data } = await boardApi.getCalendars(idx);
      data && addToDo("data", "calendars", data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserInfo();
    getAnnouncementList(idx);
    getBoardList();
    getCalendars();
    addToDo("setData", "setBoardList", setBoardList);
    addToDo("getData", "getBoard", getBoard);
    addToDo("getData", "getBoardList", getBoardList);
    addToDo("data", "studyIdx", idx);
    addToDo("setData", "setPost", setPost);
    addToDo("getData", "getPosts", getPosts);
    addToDo("getData", "getCalendars", getCalendars);
  }, []);

  return (
    <RoomBoardPresenter
      userData={userData}
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
      setAnn={setAnn}
      getApplication={getApplication}
      applicant={applicant}
      getAnnouncementList={getAnnouncementList}
      getAnn={getAnn}
      setApplicant={setApplicant}
      roomIdx={idx}
      memberListData={{
        data: memberList,
        setData: setMemberList,
        getData: getMemberList,
      }}
    />
  );
};
const getCurrentState = (state, ownProps) => {

  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (dataType, dataName, data) =>
      dispatch(actionCreators.addToDo(dataType, dataName, data)),
  };
};
export default connect(getCurrentState, mapDispatchToProps)(RoomBoardContainer);
