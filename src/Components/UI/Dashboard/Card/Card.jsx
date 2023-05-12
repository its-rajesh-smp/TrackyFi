import React from "react";
import "./Card.css";

function Card(props) {
  return (
    <div className=" Card-div ">
      <h3 className="Card-div__for">{props.for}</h3>
      <h1>{props.value}</h1>
      <progress value={props.value} min="0" max="200" />
    </div>
  );
}

export default Card;
