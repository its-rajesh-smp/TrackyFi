import React from "react";
import "./TransectionsContainer.css";

// Component
import Transection from "../../UI/Home Page/Transection/Transection";

function TransectionsContainer({ date, transections }) {
  // Generating Datename from date
  const dateName = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });

  return (
    <div className=" TransectionsContainer-div ">
      <p className="currentDate">
        <span>{date}</span>
        <span>{dateName}</span>
      </p>
      {transections.map((transection) => {
        return (
          <Transection
            id={transection.id}
            key={transection.id}
            category={transection.category}
            name={transection.name}
            date={transection.date}
            time={transection.time}
            price={transection.price}
            type={transection.type}
          />
        );
      })}
    </div>
  );
}

export default TransectionsContainer;
