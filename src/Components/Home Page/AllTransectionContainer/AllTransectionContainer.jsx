import React, { memo } from "react";
import { useSelector } from "react-redux";

// Components
import TransectionsContainer from "../Transections Container/TransectionsContainer";

function AllTransectionContainer(props) {
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const filterValue = useSelector((state) => state.searchReducer.filterValue);
  /* -------------------------------------------------------------------------- */
  /*                                FORMING ARRAY                               */
  /* -------------------------------------------------------------------------- */
  const expenseArr = useSelector((state) => state.transectionReducer.expense);

  const map = new Map();
  expenseArr.forEach((expense) => {
    // Filters
    if (
      ((expense.name
        .toLowerCase()
        .trim()
        .includes(searchValue.toLowerCase().trim()) ||
        expense.price.trim().includes(searchValue.trim()) ||
        expense.category
          .toLowerCase()
          .trim()
          .includes(searchValue.toLowerCase().trim()) ||
        expense.date.trim().includes(searchValue.toLowerCase().trim())) &&
        filterValue === "") ||
      expense.date === filterValue
    ) {
      if (map.has(expense.date)) {
        map.set(expense.date, [...map.get(expense.date), expense]);
      } else {
        map.set(expense.date, [expense]);
      }
    }
  });

  // Map To Array
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
