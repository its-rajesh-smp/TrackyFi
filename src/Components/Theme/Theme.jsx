import React from "react";
import "./Theme.css";
import { useDispatch, useSelector } from "react-redux";
import { switchTheme } from "../../Store/Reducer/themeReducer";

function Theme(props) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.themeReducer.bool);
  return (
    <div className=" Theme-div ">
      <i
        onClick={() => {
          dispatch(switchTheme());
        }}
        className={`bx bx-${theme ? "moon" : "sun"}`}
      ></i>
    </div>
  );
}

export default Theme;
