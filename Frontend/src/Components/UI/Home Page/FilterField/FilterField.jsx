import React, { memo } from "react";
import "./FilterField.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearch } from "../../../../Store/Reducer/searchReducer";
function FilterField() {
  const selector = useSelector((state) => state.themeReducer.bool);
  const dispatch = useDispatch();

  const style = {
    backgroundColor: `${selector ? "#BC6FF1" : "#F2F7A1"}`,
  };

  return (
    <div className="input_fields">
      <div style={style}>
        <i className="bx bx-search-alt"></i>
        <input
          onChange={(e) => dispatch(setSearch(e.target.value))}
          style={style}
          type="text"
          placeholder="Search.."
          defaultValue=""
        />
      </div>
      <input
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="dateinput"
        type="date"
      />
    </div>
  );
}

export default memo(FilterField);
