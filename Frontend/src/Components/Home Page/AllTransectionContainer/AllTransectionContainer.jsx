import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

function AllTransectionContainer(props) {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const filterValue = useSelector((state) => state.searchReducer.filterValue);
  const selector = useSelector(
    (state) => state.transectionReducer.transections
  );

  return <div className=" AllTransectionContainer-div "></div>;
}

export default memo(AllTransectionContainer);
