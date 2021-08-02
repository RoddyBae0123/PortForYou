import React, { useEffect, useState } from "react";
import SigninPresenter from "./SigninPresenter";
import axios from "axios";
import wifi from "../../wifi";
import { AnimatePresence, motion } from "framer-motion";
import auth from "../../Auth";
import { AuthApi } from "../../Api";
const SigninContainer = (props) => {
  const [error, setError] = useState(undefined);
  const [result, setResult] = useState(undefined);

  const {
    history: { push },
  } = props;
  const Iserror = () => {
    if (error === 401) {
      push("/signup");
    }
    setError(undefined);
  };
  useEffect(Iserror, [error]);
  const Isresult = () => {
    console.log(result);

    if (result && result.status === 200) {
      auth.setAccessTokenToCookie(result.data.message);

      push("/dashboard/resume");
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

export default SigninContainer;
