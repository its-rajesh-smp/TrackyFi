import React, { memo } from "react";
import "./FilterField.css";
import { useSelector } from "react-redux";
function FilterField() {
  const selector = useSelector((state) => state.themeReducer.bool);

  const style = {
    backgroundColor: `${selector ? "#BC6FF1" : "#F2F7A1"}`,
  };

  return (
    <div className="input_fields">
      <div style={style}>
        <i className="bx bx-search-alt"></i>
        <input
          style={style}
          type="text"
          placeholder="Search.."
          defaultValue=""
        />
      </div>
      <select className="filterSelect">
        <option>Filter</option>
        <option>Today</option>
        <option>YesterDay</option>
        <option>Tomorrow</option>
      </select>
    </div>
  );
}

export default memo(FilterField);
