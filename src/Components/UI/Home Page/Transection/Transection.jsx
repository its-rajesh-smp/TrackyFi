import React from "react";
import "./Transection.css";
import { useDispatch } from "react-redux";
import { toggleEdit } from "../../../../Store/Reducer/toggleAddEditExpense";

function Transection(props) {
  /* -------------------------------------------------------------------------- */
  /*                                  ON CLICK                                  */
  /* -------------------------------------------------------------------------- */
  const dispatch = useDispatch();
  const onClickHandeler = () => {
    dispatch(
      toggleEdit({
        ...props.data,
        id: props.id,
        containerId: props.containerId,
      })
    );
  };

  return (
    <div onClick={onClickHandeler} className=" Transection-div ">
      <div className="Transection-div_left">
        <p className="Transection-div_Name">
          <span>{props.data.name}</span> /{" "}
          <span className="catagorie">{props.data.category}</span>
        </p>
        <div className="Transection-div__div">
          <p className="Transection-div_Date">{props.data.date}</p>
          <p className="Transection-div_Time">{props.data.time}</p>
        </div>
      </div>
      <div className="Transection-div_right">
        <p>
          <span>{props.data.price}</span> $
        </p>
      </div>
    </div>
  );
}

export default Transection;
