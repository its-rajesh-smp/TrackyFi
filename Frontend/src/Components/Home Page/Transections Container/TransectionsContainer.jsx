import React from "react";
import "./TransectionsContainer.css";

// Component
import Transection from "../../UI/Home Page/Transection/Transection";

function TransectionsContainer(props) {
  const transectionArr = props.data;

  // Generating Datename from date
  const dateName = new Date(props.id).toLocaleDateString("en-US", { weekday: 'long' })


  return (
    <div className=" TransectionsContainer-div ">
      <p className="currentDate">
        <span>{props.id}</span>
        <span>{dateName}</span>
      </p>
      {transectionArr.map((expense) => {
        return <Transection key={expense.id} data={expense} />;
      })}
    </div>
  );
}

export default TransectionsContainer;
