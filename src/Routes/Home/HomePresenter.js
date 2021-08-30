import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Design = styled.div`
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

const HomePresenter = () => {
  const [slider, setSlider] = useState();
  useEffect(() => {
    window.addEventListener("wheel", (e) => {
      slide(e.wheelDelta);
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
  console.log(slickList);
  return (
    <Design>
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        <div>
          <Flex
            setting={{ justify: "center", align: "center", dir: "column" }}
            style={{ height: "100vh" }}
          >
            Fuck1
          </Flex>
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
    </Design>
  );
};

export default HomePresenter;
