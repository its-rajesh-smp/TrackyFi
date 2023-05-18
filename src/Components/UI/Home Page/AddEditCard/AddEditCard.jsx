import React, { useState } from "react";
import "./AddEditCard.css";
import { useDispatch, useSelector } from "react-redux";
import { disableToggle } from "../../../../Store/Reducer/toggleAddEditExpense";
import {
  addExpensefunc,
  deleteExpense,
  editExpensefunc,
} from "../../../../Store/Reducer/transectionReducer";

function AddEditCard(props) {
  /* -------------------------------------------------------------------------- */
  /*                                ON CLOSE BTN                                */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const onCloseBtnHandeler = () => {
    dispatch(disableToggle());
  };

  const selector = useSelector((state) => state.toggleAddEdit);
  const [name, setName] = useState(selector.data.name);
  const [date, setDate] = useState(selector.data.date);
  const [time, setTime] = useState(selector.data.time);
  const [price, setPrice] = useState(selector.data.price);
  const [category, setCategory] = useState(selector.data.category);
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

    if (selector.isEdit) {
      dispatch(editExpensefunc(selector.data.id, newExpenseObject));
    } else {
      dispatch(addExpensefunc(newExpenseObject));
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               DELETE EXPENSE                               */
  /* -------------------------------------------------------------------------- */
  const onDeleteBtnClick = (e) => {
    dispatch(deleteExpense(selector.data.id));
  };

  return (
    <div className=" AddEditCard-div__wrapper ">
      <form className="AddEditCard-div">
        <i onClick={onCloseBtnHandeler} className="bx bx-x"></i>

        {selector.isEdit && (
          <i onClick={onDeleteBtnClick} className="bx bxs-box"></i>
        )}

        <h3>{selector.isEdit ? "Edit Expense" : "Add New Expenses"}</h3>

        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
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
            value={date}
            type="date"
            placeholder="Date"
            name=""
            id=""
          />
          <input
            onChange={(e) => {
              setTime(e.target.value);
            }}
            value={time}
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
          value={category}
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
          value={price}
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
