import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchTransections from "../../../Hooks/useFetchTransections";
import TransectionsContainer from "../Transections Container/TransectionsContainer";

function AllTransectionContainer(props) {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.searchReducer.searchValue);
  const filterValue = useSelector((state) => state.searchReducer.filterValue);

  const { transections: transectionsArr } = useSelector(
    (state) => state.transectionReducer
  );

  useFetchTransections();

  // I have to show date wise so map them to store expense in particulat dates
  const map = new Map();
  transectionsArr.forEach((transection) => {
    if (map.has(transection.date)) {
      map.set(transection.date, [...map.get(transection.date), transection]);
    } else {
      map.set(transection.date, [transection]);
    }
  });

  // Forming Main Container Array
  const transectionContainerArr = [];
  for (let i of map) {
    transectionContainerArr.push(i);
  }

  return (
    <div className=" AllTransectionContainer-div ">
      {transectionContainerArr.map((transection) => (
        <TransectionsContainer
          key={transection[0]}
          date={transection[0]}
          transections={transection[1]}
        />
      ))}
    </div>
  );
}

export default memo(AllTransectionContainer);
