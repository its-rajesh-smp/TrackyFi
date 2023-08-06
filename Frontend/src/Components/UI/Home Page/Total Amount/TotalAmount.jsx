import React, { memo } from "react";
import "./TotalAmount.css";
import { useSelector } from "react-redux";

function TotalAmount() {
  const { totalExpense, totalCredit } = useSelector(
    (state) => state.totalReducer
  );

  return (
    <div className="TotalAmount-Div">
      <p>Total:</p>
      <p>
        <span className="TotalAmount-Div_totalExpense">{totalExpense}$</span>
        <span className="TotalAmount-Div_totalCredit">{totalCredit}$</span>
      </p>
    </div>
  );
}

export default memo(TotalAmount);
