import React from "react";
import "./HomePage.css";
import AddHoverBtn from "../../Components/UI/Home Page/AddHoverBtn/AddHoverBtn";
import FilterField from "../../Components/UI/Home Page/FilterField/FilterField";
import TotalAmount from "../../Components/UI/Home Page/Total Amount/TotalAmount";
import TransectionsContainer from "../../Components/Home Page/Transections Container/TransectionsContainer";
import AddEditCard from "../../Components/UI/Home Page/AddEditCard/AddEditCard";

function HomePage(props) {
  return (
    <div className=" HomePage-div ">
      <AddHoverBtn />
      <FilterField />
      <TotalAmount />
      <TransectionsContainer />
      {/* <AddEditCard /> */}
    </div>
  );
}

export default HomePage;
