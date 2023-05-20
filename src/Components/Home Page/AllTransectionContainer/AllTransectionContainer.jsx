import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "../../../Store/Reducer/totalReducer";

// Components
import TransectionsContainer from "../Transections Container/TransectionsContainer";

function AllTransectionContainer(props) {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const filterValue = useSelector((state) => state.searchReducer.filterValue);
  const selector = useSelector((state) => state.transectionReducer.expense);
  const totalTransection = { totalExpense: 0, totalCredit: 0 };

  // Sorting selector is the readonly value
  const expenseArr = [...selector];
  expenseArr.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  /* -------------------------------------------------------------------------- */
  /*                                FORMING ARRAY                               */
  /* -------------------------------------------------------------------------- */

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
      // Updating Total
      if (expense.type === "credit") {
        totalTransection.totalCredit += Number(expense.price);
      } else {
        totalTransection.totalExpense += Number(expense.price);
      }
      // Set in Map
      if (map.has(expense.date)) {
        map.set(expense.date, [...map.get(expense.date), expense]);
      } else {
        map.set(expense.date, [expense]);
      }
    }
  });

  // We Cannot Update like this as we are rendering a another component
  // So i use this kind of <jugad>
  setTimeout(function () {
    dispatch(setTotal(totalTransection));
  }, 1);

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
