import React from "react";
import "./TransectionsContainer.css";

// Component
import Transection from "../../UI/Home Page/Transection/Transection";

function TransectionsContainer(props) {
  const transectionArr = props.data;

  return (
    <div className=" TransectionsContainer-div ">
      <p className="currentDate">
        <span>{props.id}</span>
        <span>Sunday</span>
      </p>
      {transectionArr.map((expense) => {
        return <Transection key={expense.id} data={expense} />;
      })}
    </div>
  );
}

export default TransectionsContainer;
