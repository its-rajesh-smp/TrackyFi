import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpensefunc } from "../../../Store/Reducer/transectionReducer";
// Components
import TransectionsContainer from "../Transections Container/TransectionsContainer";

function AllTransectionContainer(props) {
  /* -------------------------------------------------------------------------- */
  /*                              FETCH ALL EXPENSE                             */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchExpensefunc());
  }, []);

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
