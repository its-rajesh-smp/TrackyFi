import React from "react";
import "./TransectionsContainer.css";

// Component
import Transection from "../../UI/Home Page/Transection/Transection";

function TransectionsContainer(props) {
  const newExpenseArr = Object.keys(props.list).map((expense) => {
    return (
      <Transection key={expense} id={expense} data={props.list[expense]} />
    );
  });

  return (
    <div className=" TransectionsContainer-div ">
      <p className="currentDate">
        <span>{props.date}</span>
        <span>Sunday</span>
      </p>
      {newExpenseArr}
    </div>
  );
}

export default TransectionsContainer;
