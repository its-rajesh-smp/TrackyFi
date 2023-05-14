import React from "react";
import "./Dashboard.css";
import CardContainer from "../../Components/Dashboard/CardContainer/CardContainer";
import BarChart from "../../Components/UI/Dashboard/BarChart/BarChart";
import DoughnutChart from "../../Components/UI/Dashboard/DoughnutChart/DoughnutChart";

function Dashboard(props) {
  return (
    <div className=" Dashboard-div ">
      <h1>Dashboard</h1>
      <CardContainer>
        <BarChart value="120" for="EXPENSE" />
        <DoughnutChart />
      </CardContainer>
      <CardContainer>{/* <DoughnutChart /> */}</CardContainer>
    </div>
  );
}

export default Dashboard;
