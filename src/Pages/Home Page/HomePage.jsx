import React from "react";
import "./HomePage.css";
import AddHoverBtn from "../../Components/UI/Home Page/AddHoverBtn/AddHoverBtn";
import FilterField from "../../Components/UI/Home Page/FilterField/FilterField";
import TotalAmount from "../../Components/UI/Home Page/Total Amount/TotalAmount";
import TransectionsContainer from "../../Components/Home Page/Transections Container/TransectionsContainer";
import AddEditCard from "../../Components/UI/Home Page/AddEditCard/AddEditCard";
import { useSelector } from "react-redux";

function HomePage(props) {
  const toggleAddCard = useSelector((state) => state.toggleAddEdit);

  return (
    <div className=" HomePage-div ">
      <h1>Transections</h1>
      <FilterField />
      <TotalAmount />

      <TransectionsContainer />
      <TransectionsContainer />

      {!toggleAddCard.isAdd && !toggleAddCard.isEdit && <AddHoverBtn />}
      {(toggleAddCard.isAdd || toggleAddCard.isEdit) && <AddEditCard />}
    </div>
  );
}

export default HomePage;
