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
  const selector = useSelector((state) => state.toggleAddEdit);
  const [name, setName] = useState(selector.data.name);
  const [date, setDate] = useState(selector.data.date);
  const [time, setTime] = useState(selector.data.time);
  const [price, setPrice] = useState(selector.data.price);
  const [category, setCategory] = useState(
    selector.data.category === "" ? "Not Selected" : selector.data.category
  );
  const [loader, setLoader] = useState(false);
  /* -------------------------------------------------------------------------- */
  /*                                ON CLOSE BTN                                */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const onCloseBtnHandeler = () => {
    dispatch(disableToggle());
  };

  /* -------------------------------------------------------------------------- */
  /*                                 ADD EXPENSE                                */
  /* -------------------------------------------------------------------------- */
  const onAddExpenseHandeler = (e) => {
    if (name === "" || date === "" || price === "") {
      return;
    }
    if (!loader) {
      setLoader(true);
      const newExpenseObject = {
        name: name,
        date: date,
        time: time,
        price: price,
        category: category,
        type: e,
      };

      if (selector.isEdit) {
        dispatch(
          editExpensefunc(
            selector.data.id,
            newExpenseObject,
            onCloseBtnHandeler,
            setLoader
          )
        );
      } else {
        dispatch(
          addExpensefunc(newExpenseObject, onCloseBtnHandeler, setLoader)
        );
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               DELETE EXPENSE                               */
  /* -------------------------------------------------------------------------- */
  const onDeleteBtnClick = (e) => {
    if (!loader) {
      setLoader(true);
      dispatch(deleteExpense(selector.data.id, onCloseBtnHandeler, setLoader));
    }
  };

  return (
    <div className=" AddEditCard-div__wrapper ">
      <form className="AddEditCard-div">
        {loader && (
          <i className="addEditLoader bx bx-loader-circle bx-spin"></i>
        )}
        <i onClick={onCloseBtnHandeler} className="bx bx-x"></i>

        {selector.isEdit && (
          <i onClick={onDeleteBtnClick} className="bx bxs-box"></i>
        )}

        <h3>{selector.isEdit ? "Edit Transection" : "Add New Transection"}</h3>

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
          <option value="not selected">Not Selected</option>
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
            EXPENSE
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
