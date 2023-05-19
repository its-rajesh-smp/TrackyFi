import React from "react";
import "./CardContainer.css";

function CardContainer(props) {
  return (
    <div className=" CardContainer-div ">
      <h3 className="CardContainer-div__for">{props.for}</h3>
      <div className="CardContainer-div__container">{props.children}</div>
    </div>
  );
}

export default CardContainer;
