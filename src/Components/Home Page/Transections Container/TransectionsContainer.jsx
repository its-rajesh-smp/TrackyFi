import React from "react";
import "./TransectionsContainer.css";
import Transection from "../../UI/Home Page/Transection/Transection";

function TransectionsContainer(props) {
  return (
    <div className=" TransectionsContainer-div ">
      <p className="currentDate">
        <span>29/11/2000</span>
        <span>Sunday</span>
      </p>
      <Transection />
      <Transection />
      <Transection />
      <Transection />
    </div>
  );
}

export default TransectionsContainer;
