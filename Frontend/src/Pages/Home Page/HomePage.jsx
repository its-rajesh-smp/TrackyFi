import React from "react";
import "./HomePage.css";
import { useSelector } from "react-redux";

// Component
import AddHoverBtn from "../../Components/UI/Home Page/AddHoverBtn/AddHoverBtn";
import FilterField from "../../Components/UI/Home Page/FilterField/FilterField";
import TotalAmount from "../../Components/UI/Home Page/Total Amount/TotalAmount";
import AddEditCard from "../../Components/UI/Home Page/AddEditCard/AddEditCard";
import AllTransectionContainer from "../../Components/Home Page/AllTransectionContainer/AllTransectionContainer";

function HomePage(props) {
  const toggleAddCard = useSelector((state) => state.toggleAddEdit);

  return (
    <div className=" HomePage-div ">
      <h1>Transections</h1>
      <FilterField />
      <TotalAmount />

      <AllTransectionContainer />

      {!toggleAddCard.isAdd && !toggleAddCard.isEdit && <AddHoverBtn />}
      {(toggleAddCard.isAdd || toggleAddCard.isEdit) && <AddEditCard />}
    </div>
  );
}

export default HomePage;
