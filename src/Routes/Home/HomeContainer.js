import React from "react";
import Popup from "../../Components/Popup";
import Applicant from "../../Components/Applicant";
const HomeContainer = () => {
  return (
    <Popup
      status={true}
      component={Applicant}
      size={{ width: "1050px", height: "650px" }}
    ></Popup>
  );
};

export default HomeContainer;
