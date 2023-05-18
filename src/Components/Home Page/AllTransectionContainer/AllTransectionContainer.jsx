import React, { memo } from "react";
import { useSelector } from "react-redux";

// Components
import TransectionsContainer from "../Transections Container/TransectionsContainer";

function AllTransectionContainer(props) {
  /* -------------------------------------------------------------------------- */
  /*                                FORMING ARRAY                               */
  /* -------------------------------------------------------------------------- */
  const expenseArr = useSelector((state) => state.transectionReducer.expense);
  const map = new Map();
  expenseArr.forEach((expense) => {
    if (map.has(expense.date)) {
      map.set(expense.date, [...map.get(expense.date), expense]);
    } else {
      map.set(expense.date, [expense]);
    }
  });

  const newTransectionCover = [];
  for (let i of map) {
    newTransectionCover.push(
      <TransectionsContainer key={i[0]} id={i[0]} data={i[1]} />
    );
  }

  return (
    <div className=" AllTransectionContainer-div ">{newTransectionCover}</div>
  );
}

export default memo(AllTransectionContainer);
