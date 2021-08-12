import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faLink } from "@fortawesome/free-solid-svg-icons";
import wifi from "../wifi";
import StarRatings from "react-star-ratings";
import { portFolioApi, studyApi } from "../Api";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 60px 0;
`;
const Img = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 100%;
  border: 1px solid lightgray;
  margin-right: 50px;
`;

const Name = styled.h2`
  font-weight: 500;
  font-size: 40px;
  color: black;
`;

const Small = styled.span`
  font-size: 25px;
  opacity: 0.3;
`;

const Section = styled.main`
  width: 80%;
  border: 1px solid lightgray;
  border-radius: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
`;

const SectionName = styled.div`
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

const PortSection = styled.div`
  width: 90%;
  border-bottom: 1px solid lightgray;
  padding: 20px 0;
  margin: 20px 0;
`;

const PortTitle = styled.span`
  font-size: 30px;
  font-weight: 500;
`;
const PortContents = styled.div`
  font-size: 23px;
  margin: 30px 0;
  opacity: 0.7;
`;

const EduAndPos = styled.div`
  display: flex;
  align-items: center;
  height: 250px;
  justify-content: space-evenly;
`;

const EduPosOne = styled.div`
  display: ${(props) => props.display};
  padding: ${(props) => props.display == "grid" && "20px"};
  grid-template-columns: 0.4fr 0.6fr;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: 130px;
  box-shadow: 0 3px 6px lightgray;
  color: black;
  font-weight: 500;
  border-radius: 25px;
  font-size: 40px;
`;

const MakeCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ProjectUl = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 550px;
  grid-gap: 20px;
`;

const ProjectLi = styled.li`
  padding: 10px 15px;
  box-shadow: 0 3px 6px lightgray;
  border-radius: 25px;
`;

const Project = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.4fr 0.2fr 0.2fr;
  height: 100%;
  width: 100%;
`;
const Stacklist = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 5px;
  height: 100%;
  padding: 10px 0;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

const GoLink = styled.a`
  display: flex;
  justify-content: center;
  font-size: 30px;
  width: 100%;
  font-weight: 500;
  cursor: pointer;
`;

const StackUl = styled.ul`
  display: grid;
  grid-auto-rows: 150px;
  width: 100%;
  row-gap: 20px;
`;

const StackLi = styled.li`
  box-shadow: 0 3px 6px lightgray;
  border-radius: 25px;
`;

const Stack = styled.div`
  display: grid;
  grid-template-columns: 0.15fr 0.6fr 0.25fr;
  height: 100%;
`;

const StackLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StackContents = styled.div`
  height: 75%;
  width: 100%;
  box-shadow: 0 3px 6px lightgray;
  overflow-y: scroll;
`;

const BtnBkg = styled.div`
  display: flex;
  height: 200px;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const ControlBtn = styled.button`
  width: 120px;
  height: 60px;
  border-radius: 20px;
  border: 2.5px solid ${(props) => (props.accept ? "green" : "red")};
  color: ${(props) => (props.accept ? "green" : "red")};
  font-weight: 600;
  font-size: 15px;
  transition: all 300ms ease;
  &:hover {
    background-color: ${(props) => (props.accept ? "green" : "red")};
    color: white;
  }
`;

const Message = styled.span`
  color: ${(props) => (props.color == -1 ? "green" : "red")};
  font-size: 30px;
  font-weight: 500;
`;

const Applicant = (applicant, getApplication) => {
  const controlBtnHandler = async (e) => {
    try {
      let res;
      if (Boolean(e.target.dataset.accept)) {
        const { data } = await studyApi.acceptApplication(e.target.id);
        if (data) {
          res = data;
        }
      } else {
        const { data } = await studyApi.declineApplication(e.target.id);
        if (data) {
          res = data;
        }
      }
      {
        res && getApplication();
      }
    } catch (e) {
      console.log(e);
    }

    // console.log(e.target.id, Boolean(e.target.dataset.accept));
  };

  const returnControlBtn = (state) =>
    state ? (
      <Message color={state}>
        {state == -1
          ? "This user has been approved."
          : "This user has been denied approval."}
      </Message>
    ) : (
      <>
        <ControlBtn
          id={applicant.idx}
          accept={true}
          onClick={controlBtnHandler}
          data-accept={true}
        >
          ACCEPT
        </ControlBtn>
        <ControlBtn
          id={applicant.idx}
          accept={false}
          onClick={controlBtnHandler}
          data-accept={""}
        >
          DENY
        </ControlBtn>
      </>
    );

  return (
    applicant && (
      <Container>
        <Title>
          <Img src={applicant.portfolio.img}></Img>
          <Name>
            {applicant.portfolio.user.name} /{" "}
            <Small>{applicant.position.name}</Small>{" "}
          </Name>
        </Title>
        <Section>
          <SectionName status={true}>
            <span style={{ backgroundColor: "white", padding: "0 20px" }}>
              Portfolio
            </span>
          </SectionName>
          <PortSection>
            <PortTitle>Title</PortTitle>
            <PortContents>{applicant.portfolio.title}</PortContents>
          </PortSection>
          <PortSection>
            <PortTitle>Content</PortTitle>
            <PortContents>{applicant.portfolio.content}</PortContents>
          </PortSection>
          <PortSection>
            <PortTitle>Education & Position</PortTitle>
            <PortContents>
              <EduAndPos>
                <EduPosOne display={"grid"}>
                  <MakeCenter>
                    <FontAwesomeIcon icon={faGraduationCap}></FontAwesomeIcon>
                  </MakeCenter>
                  <MakeCenter style={{ fontSize: 20 }}>
                    {applicant.portfolio.education.name}
                  </MakeCenter>
                </EduPosOne>
                <EduPosOne display={"flex"} style={{ fontSize: 25 }}>
                  {applicant.portfolio.position.name}
                </EduPosOne>
              </EduAndPos>
            </PortContents>
          </PortSection>
          <PortSection>
            <PortTitle>Project</PortTitle>
            <PortContents style={{ opacity: 1 }}>
              <ProjectUl>
                {applicant.portfolio.project.map((e) => (
                  <ProjectLi key={e.idx}>
                    <Project>
                      <MakeCenter
                        style={{ borderBottom: "1px solid lightgray" }}
                      >
                        <PortTitle style={{ fontSize: 40 }}>
                          {e.title.length >= 13
                            ? e.title.substring(0, 13) + "..."
                            : e.title}
                        </PortTitle>
                      </MakeCenter>
                      <PortContents
                        style={{
                          fontSize: 12,
                          height: "100%",
                          overflowY: "scroll",
                          margin: 0,
                          padding: "15px 0 ",
                        }}
                      >
                        {e.content}
                      </PortContents>
                      <Stacklist>
                        {e.stack.map((e) => (
                          <MakeCenter key={e.idx}>
                            <img
                              style={{ width: "65%" }}
                              src={`${wifi}api/img/default/stack_image_${e.idx}`}
                            />
                          </MakeCenter>
                        ))}
                      </Stacklist>
                      <MakeCenter>
                        <GoLink href={e.site}>
                          <FontAwesomeIcon icon={faLink} />
                          <span style={{ marginLeft: 20 }}>Go Link</span>
                        </GoLink>
                      </MakeCenter>
                    </Project>
                  </ProjectLi>
                ))}
              </ProjectUl>
            </PortContents>
          </PortSection>
          <PortSection style={{ borderBottom: "none" }}>
            <PortTitle>Stack</PortTitle>
            <PortContents style={{ opacity: 1 }}>
              <StackUl>
                {applicant.portfolio.tech.map((e) => (
                  <StackLi key={e.idx}>
                    <Stack>
                      <StackLogo>
                        <img
                          style={{ width: "50px" }}
                          src={`${wifi}api/img/default/stack_image_${e.stackIdx}`}
                        />
                        <span>{e.stackName}</span>
                      </StackLogo>
                      <MakeCenter>
                        <StackContents>{e.content}</StackContents>
                      </MakeCenter>
                      <MakeCenter>
                        <StarRatings
                          rating={e.ability}
                          starRatedColor="RGB(255, 140, 148)"
                          numberOfStars={5}
                          starSpacing="8px"
                          starDimension="20px"
                        />
                      </MakeCenter>
                    </Stack>
                  </StackLi>
                ))}
              </StackUl>
            </PortContents>
          </PortSection>
        </Section>
        <Section style={{ marginTop: 30 }}>
          <SectionName status={true}>
            <span style={{ backgroundColor: "white", padding: "0 20px" }}>
              No Flex zone
            </span>
          </SectionName>
          <BtnBkg>{returnControlBtn(applicant.declined)}</BtnBkg>
        </Section>
      </Container>
    )
  );
};

export default Applicant;
