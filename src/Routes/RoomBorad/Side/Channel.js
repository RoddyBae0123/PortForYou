import { motion } from "framer-motion";
import styled from "styled-components";
import Section from "../../../Components/Section";
import Popup from "../../../Components/Popup";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Channel = () => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
    >
      <Container>
        <Section
          title={"Channel"}
          message={"Have a chat with your team members."}
          nav={false}
        />
      </Container>
    </motion.div>
  );
};

export default Channel;
