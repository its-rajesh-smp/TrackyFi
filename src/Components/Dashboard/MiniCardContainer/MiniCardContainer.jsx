import React from "react";
import "./MiniCardContainer.css";
import MiniCard from "../../UI/Dashboard/MiniCard/MiniCard";

function MiniCardContainer(props) {
  return (
    <div className=" MiniCardContainer-div ">
      <MiniCard />
      <MiniCard />
      <MiniCard />
      <MiniCard />
    </div>
  );
}

export default MiniCardContainer;
