import React from "react";
import "./Dashboard.css";
import CardContainer from "../../Components/Dashboard/CardContainer/CardContainer";
import Card from "../../Components/UI/Dashboard/Card/Card";
function Dashboard(props) {
  return (
    <div className=" Dashboard-div ">
      <h1>Dashboard</h1>
      <CardContainer>
        <Card value="120" for="EXPENSE" />
        <Card value="25" for="CREDIT" />
        <Card value="120" for="THIS MONTH EXPENSE" />
        <Card value="25" for="THIS MONTH CREDIT" />
      </CardContainer>
      <CardContainer>
        <Card value="120" for="THIS MONTH EXPENSE" />
        <Card value="25" for="THIS YEAR CREDIT" />
      </CardContainer>
      <CardContainer>
        <Card value="120" for="FOOD" />
        <Card value="120" for="DRESS" />
        <Card value="120" for="PHONE" />
        <Card value="120" for="HOME RENT" />
        <Card value="25" for="MEDIC" />
      </CardContainer>
    </div>
  );
}

export default Dashboard;
