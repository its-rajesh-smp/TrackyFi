import React from "react";
import "./Transection.css";
import { useDispatch } from "react-redux";
import { toggleEdit } from "../../../../Store/Reducer/toggleAddEditExpense";

function Transection({ id, type, name, category, date, time, price }) {
  const dispatch = useDispatch();

  /* -------------------------------------------------------------------------- */
  /*                                  ON CLICK                                  */
  /* -------------------------------------------------------------------------- */
  const onClickHandeler = () => {
    const payload = {
      id,
      type,
      name,
      category: { name: category.name, id: category.id },
      date,
      time,
      price,
    };
    dispatch(toggleEdit(payload));
  };

  return (
    <div onClick={onClickHandeler} className={` Transection-div ${type}`}>
      <div className="Transection-div_left">
        <p className="Transection-div_Name">
          <span>{name}</span> /{" "}
          <span className="catagorie">{category.name}</span>
        </p>
        <div className="Transection-div__div">
          <p className="Transection-div_Date">{date}</p>
          <p className="Transection-div_Time">{time}</p>
        </div>
      </div>
      <div className="Transection-div_right">
        <p>
          <span>{price}</span> $
        </p>
      </div>
    </div>
  );
}

export default Transection;
