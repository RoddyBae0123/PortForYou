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
import { portFolioApi } from "../../../Api";
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
  padding: 50px 150px 0 150px;
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
  width: 120px;
  height: 35px;
  border-radius: 5px;
  color: white;
  background-color: blue;
  font-weight: 500;
  font-size: 12px;
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
  color: rgb(74, 86, 94);
  display: inline-flex;
`;

const Resume = ({ data, method, setData, DelResumeBtn }) => {
  useEffect(() => {
    console.log(Auth.getAccessToken());
    method();
  }, []);

  const AddBtnHandler = async () => {
    try {
      const res = await portFolioApi.savePorFolio({
        title: "New Portfolio",
        content: "New content",
        project: [],
        positionIdx: 7,
        tech: [],
        educationIdx: 5,
      });
      {
        res && method();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return data ? (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      style={{ width: "100%" }}
    >
      <Container>
        <Flex
          style={{
            width: "100%",
            height: "100px",
          }}
          setting={{
            justify: "space-between",
            align: "center",
            dir: "row",
          }}
        >
          <Flex
            setting={{
              justify: "flex-start",
              align: "center",
              dir: "row",
            }}
          >
            <Text size={"35px"} weight={"300"} style={{ color: "black" }}>
              My Resume List
            </Text>
            <Text
              size={"15px"}
              weight={"600"}
              style={{ color: "var(--color-text-ver2)", marginLeft: "10px" }}
            >
              {data.data.length} Total
            </Text>
          </Flex>

          <AddBtn onClick={AddBtnHandler}>
            <h5>+ ADD RESUME</h5>
          </AddBtn>
        </Flex>
        <table style={{ minWidth: 700, width: "100%" }}>
          <tbody>
            <Tr data={data && data.data} DelResumeBtn={DelResumeBtn} />
          </tbody>
        </table>
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
