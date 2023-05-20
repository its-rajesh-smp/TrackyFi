import React, { useState } from "react";
import "./CategoryItem.css";
import { useDispatch } from "react-redux";
import { deleteCategoryfunc } from "../../../Store/Reducer/categoryReducer";

function CategoryItem(props) {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  return (
    <li className=" CategoryItem-Li " key={props.category.id}>
      <span>{props.category.name}</span>
      <span
        onClick={() => {
          if (!loader) {
            setLoader(true);
            dispatch(deleteCategoryfunc(props.category.id, setLoader));
          }
        }}
      >
        {loader ? <i className="bx bx-loader-circle bx-spin"></i> : "X"}
      </span>
    </li>
  );
}

export default CategoryItem;
