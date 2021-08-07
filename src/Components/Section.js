import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GroupAddSharp, TrainRounded } from "@material-ui/icons";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  border-bottom: ${(props) => (props.nav ? "1px solid lightgray" : "none")};
  width: 100%;
`;

const Title = styled.div`
  width: 500px;
  justify-content: space-around;
  height: 150px;
  align-items: center;
  display: flex;
  font-size: 100px;
`;
const TitleHead = styled.h1`
  font-size: 70px;
  font-weight: 600;
  display: inline;
`;
const Add = styled.h4`
  font-size: 22px;
  font-weight: 400;
  opacity: 0.5;
  margin-bottom: 50px;
`;

const Section = ({ title, message, nav }) => {
  const changeTitle = () => {
    switch (title) {
      case "Member":
        return <HowToRegIcon style={{ fontSize: 100 }}></HowToRegIcon>;
      case "Recruit":
        return <GroupAddSharp style={{ fontSize: 100 }} />;
      case "Room":
        return <FontAwesomeIcon icon={faCodepen} style={{ fontSize: 100 }} />;
      default:
        break;
    }
  };
  return (
    <Container nav={nav}>
      <Title>
        {changeTitle()}
        <TitleHead>{title}</TitleHead>
      </Title>
      <Add>{message}</Add>
    </Container>
  );
};

export default Section;
