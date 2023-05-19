import React from "react";
import "./MiniCardContainer.css";
import MiniCard from "../../UI/Dashboard/MiniCard/MiniCard";

function MiniCardContainer(props) {
  return (
    <div className=" MiniCardContainer-div ">
      <MiniCard
        for="Today Credit"
        total={props.totalThisDateCredit}
        expense={props.thisDateExpense}
        credit={props.thisDateCredit}
      />
      <MiniCard
        for="Today Expense"
        total={props.totalThisDateExpense}
        expense={props.thisDateExpense}
        credit={props.thisDateCredit}
      />
      <MiniCard
        for="This Month Credit"
        total={props.totalThisMonthCredit}
        expense={props.thisMonthExpense}
        credit={props.thisMonthCredit}
      />
      <MiniCard
        for="This Month Expense"
        total={props.totalThisMonthExpense}
        expense={props.thisMonthExpense}
        credit={props.thisMonthCredit}
      />
    </div>
  );
}

export default MiniCardContainer;
