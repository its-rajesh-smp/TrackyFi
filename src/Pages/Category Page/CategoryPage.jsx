import React, { useState } from "react";
import "./CategoryPage.css";
import DoughnutChart from "../../Components/UI/Dashboard/DoughnutChart/DoughnutChart";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryfunc } from "../../Store/Reducer/categoryReducer";
import CategoryItem from "../../Components/Category Page/Category Item/CategoryItem";

function CategoryPage(props) {
  const [category, setCategory] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.categoryReducer.categoryArr);

  //   On Category Add
  const onCategoryAdd = () => {
    if (!loader && category.trim() !== "") {
      setLoader(true);
      dispatch(addCategoryfunc(category, setLoader));
    }
  };

  return (
    <div className=" CategoryPage-div ">
      <h1>Categorys</h1>

      <ul>
        <h3>Your Categorys</h3>

        {selector.map((category) => {
          return <CategoryItem key={Math.random()} category={category} />;
        })}
      </ul>

      <div className="CategoryPage-div__addCate">
        <input
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          placeholder="Add New Category"
          type="text"
          name=""
          id=""
        />

        <button onClick={onCategoryAdd}>
          {loader ? <i className="bx bx-loader-circle bx-spin"></i> : "ADD"}
        </button>
      </div>

      <div className="CategoryPage-div__chartContainer">
        <DoughnutChart categoryArr={selector} />
      </div>
    </div>
  );
}

export default CategoryPage;
