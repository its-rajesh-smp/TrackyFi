import React, { memo, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchTransections from "../../../Hooks/useFetchTransections";
import TransectionsContainer from "../Transections Container/TransectionsContainer";
import { setTotal } from "../../../Store/Reducer/totalReducer";

function AllTransectionContainer(props) {
  const dispatch = useDispatch();

  const { transections: transectionsArr } = useSelector(
    (state) => state.transectionReducer
  );

  // Hook To Fetch Transections
  useFetchTransections();

  // I have to show date wise so map them to store expense in particulat dates
  const map = new Map();
  let total = { totalExpense: 0, totalCredit: 0 };

  const memoizeTransectionArr = useMemo(() => {
    transectionsArr.forEach((transection) => {
      // Storing In Map
      if (map.has(transection.date)) {
        map.set(transection.date, [...map.get(transection.date), transection]);
      } else {
        map.set(transection.date, [transection]);
      }

      // Updating Total
      if (transection.type === "expense") {
        total.totalExpense += transection.price;
      } else {
        total.totalCredit += transection.price;
      }
    });

    // Forming Main Container Array
    const transectionContainerArr = [];
    for (let i of map) {
      transectionContainerArr.push(i);
    }

    // Sort By Date
    transectionContainerArr.sort((a, b) => new Date(b[0]) - new Date(a[0]));

    return transectionContainerArr;
  }, [transectionsArr]);

  useEffect(() => {
    dispatch(setTotal(total));
  }, [memoizeTransectionArr]);

  return (
    <div className=" AllTransectionContainer-div ">
      {memoizeTransectionArr.map((transection) => (
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
