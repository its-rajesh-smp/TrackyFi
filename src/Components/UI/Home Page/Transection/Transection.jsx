import React from "react";
import "./Transection.css";

function Transection(props) {
  return (
    <div className=" Transection-div ">
      <div className="Transection-div_left">
        <p className="Transection-div_Name">Chicken</p>
        <div className="Transection-div__div">
          <p className="Transection-div_Date">29/11/2000</p>
          <p className="Transection-div_Time">02:33 AM</p>
        </div>
      </div>
      <div className="Transection-div_right">
        <p>
          <span>2500</span> $
        </p>
      </div>
    </div>
  );
}

export default Transection;
