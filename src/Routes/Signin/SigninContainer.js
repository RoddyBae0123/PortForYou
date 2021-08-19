import React, { useEffect, useState } from "react";
import SigninPresenter from "./SigninPresenter";
import axios from "axios";
import wifi from "../../wifi";
import { AnimatePresence, motion } from "framer-motion";
import auth from "../../Auth";
import { connect } from "react-redux";
import { actionCreators } from "../../store";
import { AuthApi, userApi } from "../../Api";
const SigninContainer = ({ history, addToDo }) => {
  const [error, setError] = useState(undefined);
  const [result, setResult] = useState(undefined);

  const { push } = history;
  const Iserror = () => {
    if (error === 401) {
      push("/signup");
    }
    setError(undefined);
  };
  useEffect(Iserror, [error]);
  const Isresult = () => {
    result && console.log(result.data.message);

    if (result && result.status === 200) {
      localStorage.clear();
      auth.setTokenToLocalstorage(result.data.message);
      setMyInfo();
      window.location.replace("/dashboard/resume");

    }
  };
  useEffect(Isresult, [result]);

  const login = async (id, pw) => {
    try {
      const res = await AuthApi.getLoginToken(id, pw);
      {
        res && setResult(res);
      }
    } catch (e) {
      setError(e.response.status);
    }
  };

  const setMyInfo = async () => {
    try {
      const { data } = await userApi.getUserInfo();
      data && console.log(data);
      data && addToDo("data", "MyInfo", data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <SigninPresenter login={login} error={error}></SigninPresenter>
    </motion.div>
  );
};
const getCurrentState = (state, ownProps) => {
  console.log(state, ownProps);

  return state;
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (dataType, dataName, data) =>
      dispatch(actionCreators.addToDo(dataType, dataName, data)),
  };
};
export default connect(getCurrentState, mapDispatchToProps)(SigninContainer);
