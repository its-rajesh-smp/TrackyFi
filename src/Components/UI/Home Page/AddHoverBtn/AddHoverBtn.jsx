import React from "react";
import "./AddHoverBtn.css";
import { useDispatch } from "react-redux";
import { toggleAdd } from "../../../../Store/Reducer/toggleAddEditExpense";

function AddHoverBtn(props) {
  const dispatch = useDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                ON BTN CLICK                                */
  /* -------------------------------------------------------------------------- */
  const onBtnClick = () => {
    dispatch(toggleAdd());
  };

  return (
    <div onClick={onBtnClick} className="AddNew-div">
      +
    </div>
  );
}

export default AddHoverBtn;
