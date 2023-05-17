import React, { useState } from "react";
import "./AddEditCard.css";
import { useDispatch } from "react-redux";
import { disableToggle } from "../../../../Store/Reducer/toggleAddEditExpense";
import { addExpensefunc } from "../../../../Store/Reducer/transectionReducer";

function AddEditCard(props) {
  /* -------------------------------------------------------------------------- */
  /*                                ON CLOSE BTN                                */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const onCloseBtnHandeler = () => {
    dispatch(disableToggle());
  };

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  /* -------------------------------------------------------------------------- */
  /*                                 ADD EXPENSE                                */

  /* -------------------------------------------------------------------------- */
  const onAddExpenseHandeler = (e) => {
    const newExpenseObject = {
      name: name,
      date: date,
      time: time,
      price: price,
      category: category,
    };
    dispatch(addExpensefunc(newExpenseObject));
  };

  return (
    <div className=" AddEditCard-div__wrapper ">
      <form className="AddEditCard-div">
        <i onClick={onCloseBtnHandeler} className="bx bx-x"></i>
        <i class="bx bxs-box"></i>

        <h3>Add New Expenses</h3>

        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Expense Name"
          name=""
          id=""
        />

        <div className="AddEditCard-div_dateTimeContainer">
          <input
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="date"
            placeholder="Date"
            name=""
            id=""
          />
          <input
            onChange={(e) => {
              setTime(e.target.value);
            }}
            type="time"
            placeholder="Time"
            name=""
            id=""
          />
        </div>

        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          name="cataselect"
          id="cataselect"
        >
          <option value="book">Book</option>
          <option value="mobile">Mobile</option>
          <option value="petrol">Petrol</option>
        </select>

        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="text"
          placeholder="Price"
          name=""
          id=""
        />

        <div className="btnContainer">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddExpenseHandeler("expense");
            }}
            className="addEditBtn"
          >
            ADD
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddExpenseHandeler("credit");
            }}
            className="addEditBtn"
          >
            CREDIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditCard;
