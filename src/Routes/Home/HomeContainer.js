import React from "react";
import Popup from "../../Components/Popup";
import Applicant from "../../Components/Applicant";
import Navigation from "../../Components/Navigation";

const HomeContainer = () => {
  const navbar = [
    {
      idx: 130,
      component: (state) => (state ? <div>state1</div> : null),
      checked: true,
      name: "one",
    },
    {
      idx: 131,
      component: (state) => (state ? <div>state2</div> : null),
      checked: false,
      name: "two",
    },
    {
      idx: 132,
      component: (state) => (state ? <div>state3</div> : null),
      checked: false,
      name: "three",
    },
    {
      idx: 133,
      component: (state) => (state ? <div>state4</div> : null),
      checked: false,
      name: "four",
    },
  ];

  return <Applicant />;
};

export default HomeContainer;
