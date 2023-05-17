import React, { useEffect } from "react";
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
  const expenseObj = useSelector((state) => state.transectionReducer.expense);
  const newExpenseCover = Object.keys(expenseObj).map((date) => {
    return (
      <TransectionsContainer
        id={date}
        key={date}
        date={date}
        list={expenseObj[date]}
      />
    );
  });

  return <div className=" AllTransectionContainer-div ">{newExpenseCover}</div>;
}

export default AllTransectionContainer;
