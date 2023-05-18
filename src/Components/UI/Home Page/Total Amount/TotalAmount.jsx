import React, { memo } from "react";
import "./TotalAmount.css";

function TotalAmount(props) {
  return (
    <div className="TotalAmount-Div">
      <p>Total:</p>
      <p>
        <span>{"2000"}</span> $
      </p>
    </div>
  );
}

export default memo(TotalAmount);
