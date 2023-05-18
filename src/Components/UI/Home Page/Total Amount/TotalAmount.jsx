import React, { memo } from "react";
import "./TotalAmount.css";
import { useSelector } from "react-redux";

function TotalAmount(props) {
  const selector = useSelector((state) => state.totalReducer);

  return (
    <div className="TotalAmount-Div">
      <p>Total:</p>
      <p>
        <span className="TotalAmount-Div_totalExpense">
          {selector.totalExpense}$
        </span>
        <span className="TotalAmount-Div_totalCredit">
          {selector.totalCredit}$
        </span>
      </p>
    </div>
  );
}

export default memo(TotalAmount);
