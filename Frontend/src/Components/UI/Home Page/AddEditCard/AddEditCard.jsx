import React, { useState } from "react";
import "./AddEditCard.css";
import { useDispatch, useSelector } from "react-redux";
import { disableToggle } from "../../../../Store/Reducer/toggleAddEditExpense";
import {
  addExpensefunc,
  deleteExpense,
  editExpensefunc,
} from "../../../../Store/Reducer/transectionReducer";
import { setVisiblefunc } from "../../../../Store/Reducer/notificationReducer";

function AddEditCard(props) {
  const selector = useSelector((state) => state.toggleAddEdit);
  const categoryList = useSelector(
    (state) => state.categoryReducer.categoryArr
  );

  const [name, setName] = useState(selector.data.name);
  const [date, setDate] = useState(selector.data.date);
  const [time, setTime] = useState(selector.data.time);
  const [price, setPrice] = useState(selector.data.price);
  const [category, setCategory] = useState(selector.data.category ? selector.data.category : { id: 0, name: "No Category" });
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
  const isVIP = useSelector((state) => state.authReducer.VIP);
  const onAddExpenseHandeler = (transectionType) => {
    if (name === "" || date === "" || price === "") {
      return;
    }
    if (Number(price) >= 5000 && (!isVIP || isVIP === undefined)) {
      dispatch(
        setVisiblefunc("", "OOPS! You Have To Buy VIP For This Operation")
      );
      return;
    }
    if (!loader) {
      setLoader(true);
      const newExpenseObject = {
        name,
        date,
        time,
        price,
        category,
        type: transectionType,
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
            setCategory(JSON.parse(e.target.value));
          }}
          value={JSON.stringify(category)}
          name="cataselect"
          id="cataselect"
        >
          <option value={JSON.stringify({ id: 0, name: "No Category" })}>No Category</option>

          {categoryList.map((category) => {
            return (
              <option key={Math.random()} value={JSON.stringify({ name: category.name, id: category.id, })}>
                {category.name}
              </option>
            );
          })}
        </select>

        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          value={price}
          type="number"
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
