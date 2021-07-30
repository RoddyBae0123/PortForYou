import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faFileInvoice,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Table } from "reactstrap";

import Auth from "../../../Auth";

import { useEffect } from "react";
import Tr from "../../../Components/Tr";
import Loader from "react-loader-spinner";
import MdataProcessing from "../../../Components/MdataProcessing";
import wifi from "../../../wifi";
import axios from "axios";
// const SubTitle = styled.h5`
//     font-size:17px;
//     font-weight:400;
//     transform: translateY(50%);
//     margin-left:20px;
// `
// const Navbar = styled.div`
//     height:60px;
//     background-color:#F1E2E2;
//     position: fixed;
//     width: calc( 100% - 220px );
//     border-bottom:1.5px solid lightgray;
//     display:grid;
//     grid-template-columns: 50% 50%;

// `
// const NabvarCenter = styled.div`
//     display:flex;
//     flex-direction: rows;
//     justify-content: ${(props)=> props.position ? "flex-start" : "flex-end"};;
//     align-items: center;
// `
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

// const SearchForm = styled.form`
//     margin-left : 20px;
//     display:grid;
//     grid-template-columns: 1fr 0.4fr;
//     height:40px;
//     border-radius: 4px;
// `
// const Input = styled.input`

//     outline:none;
//     border:none;
//     background-color: rgba(232, 191, 191, 0.74);
//     font-size:20px;
// `
// const Submit = styled.input`
//     border:none;
//     border-left:2px solid white;
//     background-color: rgba(232, 191, 191, 0.74);
// `
// const TopInfo = styled.div`
//     display:flex;
//     flex-direction: rows;
//     justify-content: space-between;
//     align-items: center;
//     height: 70px;
//     width:90%;
//     margin:30px 0 ;
//     /* background-color:#F3F3F3; */
// `
// const Title = styled.h1`
//     font-size:30px;
//     font-weight:700;

// `

// const Button = styled.button`
//     background-color: transparent;
//     cursor: pointer;
//     border:none;
//     font-size:20px;
//     color:RGB(162, 162, 162);

// `
const Makecenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
const AddBtn = styled.button`
  width: 70px;
  height: 30px;
  border: 2px solid RGB(74, 86, 94);
  border-radius: 10px;
  color: RGB(74, 86, 94);
  font-weight: 500;
  font-size: 12px;
  margin-bottom: 20px;
  &:hover {
    color: white;
    background: RGB(74, 86, 94);
  }
  transition: all 300ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Resume = ({ data, method, setData, DelResumeBtn }) => {
  useEffect(() => {
    method(Auth.getAccessToken());
  }, []);

  const AddBtnHandler = async (token) => {
    const api = await axios.create({
      baseURL: `${wifi}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    api
      .post("/api/user/portfolio", {
        title: "New shit",
        content: "New content",
        project: [],
        positions: [
          {
            idx: 7,
          },
        ],
        tech: [],
        education: {
          idx: 5,
        },
      })
      .then((res) => {
        console.log(res);
        method(Auth.getAccessToken());
      })
      .catch((e) => console.log(e));
  };

  return data ? (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <Container>
        <MdataProcessing
          title={"Resume"}
          message={"I like it when money makes a difference"}
          nav={false}
        />
        <div
          style={{ width: "90%", display: "flex", justifyContent: "flex-end" }}
        >
          <AddBtn onClick={() => AddBtnHandler(Auth.getAccessToken())}>
            <h5>ADD</h5>
          </AddBtn>
        </div>
        <Table style={{ minWidth: 700 }}>
          <tbody>
            <Tr data={data && data.data} DelResumeBtn={DelResumeBtn} />
          </tbody>
        </Table>
      </Container>
    </motion.div>
  ) : (
    <Makecenter>
      <Loader
        type="ThreeDots"
        color="var(--color-theme)"
        height={300}
        width={300}
        timeout={10000}
      />
    </Makecenter>
  );
};

export default Resume;
