import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import wifi from "../../wifi";

const Design = styled.div`
  position: relative;

  .vertical-dots {
    right: 30px;
    list-style: none;
    position: absolute;
    top: calc(50vh - 60px);
    margin-top: -10px;
    text-align: right;
    pointer-events: none;
  }
  .vertical-dots li {
    position: relative;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .vertical-dots li button {
    font-size: 0;
    line-height: 0;
    display: block;
    width: 20px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    color: transparent;
    border: 0;
    outline: none;
    background: transparent;
  }
  .vertical-dots li button:hover,
  .vertical-dots li button:focus {
    outline: none;
  }
  .vertical-dots li button:hover:before,
  .vertical-dots li button:focus:before {
    opacity: 1;
  }
  .vertical-dots li button:before {
    font-family: "slick";
    font-size: 6px;
    line-height: 20px;

    position: absolute;
    top: 0;
    left: 0;

    width: 20px;
    height: 20px;

    content: "O";
    text-align: center;

    opacity: 0.25;
    color: black;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .vertical-dots li.slick-active button:before {
    opacity: 0.75;
    color: black;
  }
  .slick-list {
    height: 100vh;
  }
  .slick-slide {
    height: 100vh;
  }
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

const Linkto = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  position: fixed;
  top: 50px;
  left: 120px;
`;
const Logo = styled.img`
  width: 70px;
  height: 70px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  height: 100vh;
`;

const SignUpBtn = styled.button`
  width: 300px;
  height: 70px;
  border-radius: 10px;
  background-color: blue;
  color: white;
  font-size: 32px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: "white";
  }
`;
const HomePresenter = () => {
  const [slider, setSlider] = useState();
  console.log(slider);
  useEffect(() => {
    window.addEventListener("wheel", (e) => {
      slide(e.wheelDelta);
      //   slider && slider.not(".slick-initialized").slick();
    });
  }, [slider]);

  const slide = (y) => {
    y > 0 ? slider && slider.slickPrev() : slider && slider.slickNext();
  };
  var settings = {
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    dotsClass: "vertical-dots",
    dots: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };
  const slickList = document.querySelector(".slick-list");
  // slickList.style.height = "100vh";
  slickList && slickList.setAttribute("style", "");
  return (
    <Design>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        <div>
          <Container>
            <Flex
              setting={{ justify: "center", align: "center", dir: "column" }}
              style={{ height: "100%" }}
            >
              <Flex
                setting={{
                  justify: "flex-start",
                  align: "flex-start",
                  dir: "column",
                }}
                style={{
                  height: "60%",
                  paddingLeft: "120px",
                }}
              >
                <Text
                  weight={"400"}
                  size={"33px"}
                  style={{ color: "black", margin: "20px 0" }}
                  className={"basic"}
                >
                  Let's make up a study <br />
                  group!
                </Text>
                <Text
                  weight={"100"}
                  size={"17px"}
                  style={{
                    color: "rgba(0,0,0,0.8)",
                    lineHeight: "25px",
                    marginBottom: "35px",
                  }}
                  className={"basic"}
                >
                  Thanks for visiting Studyroom, <br />
                  Web services to provide study meetings
                  <br /> We hope you enjoy it!
                </Text>
                <SignUpBtn className={"basic"} as={Link} to="/signup">
                  FREE SIGN UP
                </SignUpBtn>
                <Text
                  weight={"100"}
                  size={"17px"}
                  style={{ color: "rgba(0,0,0,0.8)", marginTop: "45px" }}
                  className={"basic"}
                >
                  Get more information from LIMBAE here:
                </Text>
                <Text
                  weight={"500"}
                  size={"17px"}
                  style={{ color: "rgba(0,0,0,1)", marginTop: "15px" }}
                  className={"basic"}
                >
                  https://rhkd6351.gitbook.io/limbae/
                </Text>
              </Flex>
            </Flex>
            <Flex
              setting={{
                justify: "center",
                align: "flex-start",
                dir: "column",
              }}
              style={{ height: "100%" }}
            >
              <img
                src="http://3.37.208.251:8080/api/img/default/deb4ee12-5bbc-4339-a592-a77d07dec1a6"
                style={{ width: 550, marginLeft: "80px" }}
              ></img>
            </Flex>
          </Container>
        </div>
        <div>
          <Flex
            setting={{ justify: "center", align: "center", dir: "column" }}
            style={{ height: "100vh" }}
          >
            Fuck2
          </Flex>
        </div>
        <div>
          <Flex
            setting={{ justify: "center", align: "center", dir: "column" }}
            style={{ height: "100vh" }}
          >
            Fuck3
          </Flex>
        </div>
        <div>
          <Flex
            setting={{ justify: "center", align: "center", dir: "column" }}
            style={{ height: "100vh" }}
          >
            Fuck4
          </Flex>
        </div>
        <div>
          <Flex
            setting={{ justify: "center", align: "center", dir: "column" }}
            style={{ height: "100vh" }}
          >
            Fuck5
          </Flex>
        </div>
        <div>
          <Flex
            setting={{ justify: "center", align: "center", dir: "column" }}
            style={{ height: "100vh" }}
          >
            Fuck6
          </Flex>
        </div>
      </Slider>
      <Linkto to="/" style={{ width: 300 }}>
        <Logo src={`${wifi}api/img/default/logo_transparent`} />
        <Text
          size={"35px"}
          weight={"700"}
          style={{
            marginLeft: 20,
            color: `var(--color-text-ver1) `,
            fontFamily: "Josefin Sans', cursive",
          }}
          className="set"
        >
          StudyMall
        </Text>
      </Linkto>
    </Design>
  );
};

export default HomePresenter;
