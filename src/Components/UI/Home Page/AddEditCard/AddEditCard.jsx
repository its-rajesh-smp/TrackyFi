import React from "react";
import "./AddEditCard.css";

function AddEditCard(props) {
  return (
    <div className=" AddEditCard-div__wrapper ">
      <form className="AddEditCard-div">
        <h3>Add New Expenses</h3>
        <input type="text" placeholder="Expense Name" name="" id="" />
        <div className="AddEditCard-div_dateTimeContainer">
          <input type="text" placeholder="Date" name="" id="" />
          <input type="text" placeholder="Time" name="" id="" />
        </div>
        <input type="text" placeholder="Catagorie" name="" id="" />
        <input type="text" placeholder="Price" name="" id="" />
        <div className="btnContainer">
          <button className="addEditBtn">ADD</button>
          <button className="addEditBtn">CREDIT</button>
        </div>
      </form>
    </div>
  );
}

export default AddEditCard;
