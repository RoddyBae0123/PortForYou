import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faTimes,
  faFileInvoice,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faJava,
  faPython,
  faJs,
  faCuttlefish,
} from "@fortawesome/free-brands-svg-icons";
const PopupBkg = styled.div`
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.1);
  display: ${(props) => (props.status ? "flex" : "none")};
`;
const PopupUser = styled.form`
  width: 1000px;
  height: 650px;
  background-color: white;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;

  align-items: center;
  position: relative;
  overflow-y: scroll;
`;
const DelpopupBtn = styled.button`
  background-color: transparent;
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 30px;
  color: lightgray;
  &:hover {
    color: black;
  }
  transition: all 200ms ease-in-out;
`;
const RoomInfo = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.3fr 0.4fr;
  justify-content: space-evenly;
  align-items: center;
  height: 150px;
  width: 100%;
  margin-top: 30px;
`;
const RoomData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => (props.direction ? "60%" : "35%")};
`;
const MakeCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:100%;
`;

const RecruitPic = styled.img`
  width: 95px;
  height: 95px;
  border-radius: 100%;
  border: 1.5px solid lightgray;
`;
const NewCgry = styled.div`
  border-top: 1px solid lightgray;
  width: 85%;
  margin: 45px 0;
  position: relative;
`;
const Title = styled.div`
  height: 20px;
  font-size: 20px;
  color: #4a565e;
  position: absolute;
  top: -10px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  display: ${(props) => (props.status ? "flex" : "none")};
  justify-content: center;
`;

const RecruitContent = styled.div`
  font-size: 50px;
  margin: 20px 0;
  text-align: left;
  font-weight: 600;
  width: 85%;
`;

const RecruitSet = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, 33.3%);
  background-color: white;
  border-radius: 25px;
  width: 100%;
  border: ${(props) => (props.status ? "1px solid lightgray" : "none")};
  position: relative;
  padding: 25px 10px;
  margin-bottom: 40px;
`;

const Position = styled.button`
  height: 50px;
  display: grid;
  grid-template-columns: 0.6fr 0.4fr;
  margin: 8px 15px;
  border: 1px solid lightgray;
  border-radius: 20px;
`;
const PositionTitle = styled.span`
  font-size: 25px;
  font-weight: 500;
`;
const PositionPeople = styled.div`
  font-size: 20px;
  margin-left: 10px;
`;

const PortFolio = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  height: 230px;
  margin: 8px 15px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 30px;
  padding: 15px;
`;
const PfTitle = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 24%;
  width: 100%;
  font-size: 35px;
  text-align: center;
`;
const PfPosition = styled.div`
  height: 15%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid lightgray;
  padding: 10px 20px;
  font-weight: 500;
`;
const StackList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20%);
  width: 80%;
  font-size:25px;
`;

const Submit = styled.button`
    width:200px;
    height:50px;
    border: 1px solid lightgray;
    border-radius:15px;
    font-weight:600;

`

const RecruitDetail = ({ popup }) => {
  return popup ? (
    <PopupBkg status={popup}>
      <PopupUser>
        <DelpopupBtn>
          <FontAwesomeIcon icon={faTimes} />
        </DelpopupBtn>
        <RoomInfo>
          <RoomData direction={true}>
            <h1 style={{ fontSize: 40, fontWeight: 500, textAlign: "center" }}>
              RoomName
            </h1>
            <h4
              style={{
                fontSize: 10,
                fontWeight: 400,
                opacity: "0.4",
                textAlign: "center",
              }}
            >
              Web
            </h4>
            <h2
              style={{
                fontSize: 15,
                fontWeight: 500,
                opacity: "0.7",
                textAlign: "center",
              }}
            >
              ...my Name is GDRAGON
            </h2>
          </RoomData>
          <MakeCenter>
            <RecruitPic
              src={"https://avatars.githubusercontent.com/u/68287181?v=4"}
            />
          </MakeCenter>

          <RoomData direction={false}>
            <div style={{ fontSize: 20, textAlign: "center" }}>
              <strong style={{ fontColor: "black", fontWeight: "600" }}>
                Boss:
              </strong>
              Roddyisthebest
            </div>
            <div style={{ fontSize: 20, textAlign: "center" }}>
              <strong style={{ fontColor: "black", fontWeight: "600" }}>
                Site:
              </strong>
              www.naver.com
            </div>
          </RoomData>
        </RoomInfo>
        <NewCgry>
          <Title status={true}>
            <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
              Recruitment
            </h3>
          </Title>
        </NewCgry>
        <RecruitContent>
          <h2 style={{ marginBottom: "40px", textAlign: "center" }}>
            Super Ai Project
          </h2>
          <h5 style={{ fontSize: "17px", fontWeight: "100" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </h5>
        </RecruitContent>
        <NewCgry>
          <Title status={true}>
            <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
              Choose your position and portfolio to apply for the room
            </h3>
          </Title>
        </NewCgry>
        <form style={{ width: "85%", margin: "30px 0" ,display:"flex",alignItems:"center", flexDirection:"column" }}>
          <RecruitSet status={true}>
            <Title status={true}>
              <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
                Position List
              </h3>
            </Title>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
            <Position>
              <MakeCenter>
                <PositionTitle>Front-end</PositionTitle>
              </MakeCenter>
              <MakeCenter style={{ flexDirection: "row" }}>
                <FontAwesomeIcon icon={faUserAlt} />
                <PositionPeople>5</PositionPeople>
              </MakeCenter>
            </Position>
          </RecruitSet>
          <RecruitSet status={true}>
            <Title status={true}>
              <h3 style={{ backgroundColor: "white", padding: " 0 15px" }}>
                Portfolio List
              </h3>
            </Title>
            <PortFolio>
              <PfTitle>
                <FontAwesomeIcon icon={faFileInvoice} />
                <h1 style={{ fontWeight: 500 }}>Portfolio</h1>
              </PfTitle>
              <h2>
                Lorem Ipsum is simply dummy text of the printing and type...
              </h2>
              <PfPosition>Back-end</PfPosition>
              <StackList>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faPython} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJs} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
              </StackList>
            </PortFolio>
            <PortFolio>
              <PfTitle>
                <FontAwesomeIcon icon={faFileInvoice} />
                <h1 style={{ fontWeight: 500 }}>Portfolio</h1>
              </PfTitle>
              <h2>
                Lorem Ipsum is simply dummy text of the printing and type...
              </h2>
              <PfPosition>Back-end</PfPosition>
              <StackList>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faPython} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJs} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
              </StackList>
            </PortFolio>  
            <PortFolio>
              <PfTitle>
                <FontAwesomeIcon icon={faFileInvoice} />
                <h1 style={{ fontWeight: 500 }}>Portfolio</h1>
              </PfTitle>
              <h2>
                Lorem Ipsum is simply dummy text of the printing and type...
              </h2>
              <PfPosition>Back-end</PfPosition>
              <StackList>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faPython} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJs} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
              </StackList>
            </PortFolio>
            <PortFolio>
              <PfTitle>
                <FontAwesomeIcon icon={faFileInvoice} />
                <h1 style={{ fontWeight: 500 }}>Portfolio</h1>
              </PfTitle>
              <h2>
                Lorem Ipsum is simply dummy text of the printing and type...
              </h2>
              <PfPosition>Back-end</PfPosition>
              <StackList>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faPython} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJs} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
              </StackList>
            </PortFolio>
            <PortFolio>
              <PfTitle>
                <FontAwesomeIcon icon={faFileInvoice} />
                <h1 style={{ fontWeight: 500 }}>Portfolio</h1>
              </PfTitle>
              <h2>
                Lorem Ipsum is simply dummy text of the printing and type...
              </h2>
              <PfPosition>Back-end</PfPosition>
              <StackList>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faPython} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJs} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
              </StackList>
            </PortFolio>
            <PortFolio>
              <PfTitle>
                <FontAwesomeIcon icon={faFileInvoice} />
                <h1 style={{ fontWeight: 500 }}>Portfolio</h1>
              </PfTitle>
              <h2>
                Lorem Ipsum is simply dummy text of the printing and type...
              </h2>
              <PfPosition>Back-end</PfPosition>
              <StackList>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faPython} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJs} />
                </MakeCenter>
                <MakeCenter>
                  <FontAwesomeIcon icon={faJava} />
                </MakeCenter>
              </StackList>
            </PortFolio>
          </RecruitSet>
        <Submit>APPLY</Submit>
        </form>
      </PopupUser>
    </PopupBkg>
  ) : (
    <div>fuck</div>
  );
};

export default RecruitDetail;
