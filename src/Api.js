import axios from "axios";
import wifi from "./wifi";
import Auth from "./Auth";

const api = axios.create({
  baseURL: `${wifi}`,
  headers: {
    Authorization: `Bearer ${Auth.getAccessToken()}`,
  },
});

export const portFolioApi = {
  getPosition: () => api.get("api/resource/positions"),
  getStackList: (name) => api.get(`api/resource/stacks?query=${name}`),
  getEducationList: () => api.get("api/resource/educations"),
  getPortFolioList: () => api.get("api/user/portfolios"),
  getPortFolio: (idx) => api.get(`api/user/portfolio/${idx}`),
  savePorFolio: (data) =>
    api.post("api/user/portfolio", {
      idx: data.idx,
      title: data.title,
      content: data.content,
      project: [...data.project],
      position: {
        idx: data.positionIdx,
      },
      tech: [...data.tech],
      education: {
        idx: data.educationIdx,
      },
    }),
  deletePortFolio: (idx) => api.delete(`api/user/portfolio/${idx}`),
};

export const studyApi = {
  getCategoryList: () => api.get("api/resource/categories"),
  getStudy: (idx) => api.get(`api/study/${idx}`),
  getStudyList: (applied) => api.get(`api/user/studies?applied=${applied}`),
  SaveAnnouncement: (data) =>
    api.post(`api/study/${data.study.idx}/announcement`, {
      title: data.title,
      content: data.content,
      demandPosition: [...data.demandPosition],
    }),
  getAnnouncementList: (idx) => api.get(`api/study/${idx}/announcements`),
  getAnnouncement: (idx) => api.get(`api/announcement/${idx}`),
  saveStudy: (data) =>
    api.post("api/study", {
      title: data.title,
      content: data.content,
      studyCategory: data.studyCategory,
    }),
  getOtherAnnouncementList: (data) =>
    api.get(
      `api/announcements?pno=${data.pno}&kind=${data.kind}&query=${data.query}`
    ),
  setApplication: (data) =>
    api.post(`api/announcement/${data.announcement.idx}/application`, {
      portfolio: {
        idx: data.portfolio.idx,
      },
      position: {
        idx: data.position.idx,
      },
    }),
  getApplicationByStudyIdx: (idx) => api.get(`api/study/${idx}/applications`),
  getMembersByStudyIdx: (idx) => api.get(`api/study/${idx}/members`),
  deleteAnnouncement: (idx) => api.delete(`api/announcement/${idx}`),
  declineApplication: (idx) => api.get(`api/application/${idx}/decline`),
  acceptApplication: (idx) => api.get(`api/application/${idx}/accept`),
  getChatId: (idx) => api.get(`/study/${idx}/room`),
  getMessages: (idx, mIdx) =>
    api.get(`/study/${idx}/room/messages`, {
      params: { "last-idx": mIdx },
    }),
};

export const AuthApi = {
  getLoginToken: (user, pw) =>
    api.post("api/login", {
      username: user,
      password: pw,
    }),
};

export const userApi = {
  getUserInfo: () => api.get("api/userInfo"),
  updateUserInfo: (data) => api.post("api/userInfo", data),
  deleteUser: (password) =>
    api.delete("api/userInfo", {
      data: { password: password },
    }),
};

export const imageApi = {
  setPortfolio: (idx, formData) =>
    api.post(
      `api/img/portfolio?portfolio-idx=${idx}
  `,
      formData
    ),
  setUserProfileImage: (data) => {
    const headers = {
      "Content-type": "multipart/form-data",
    };
    return api.post("api/img/user", data, { headers });
  },
};

export const boardApi = {
  getBoardList: (idx) => api.get(`api/study/${idx}/boards`),
  setBoard: ({ studyIdx, name, content, idx }) =>
    api.post(`api/study/${studyIdx}/board`, {
      name,
      content,
      idx,
    }),
};
