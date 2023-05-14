import React from "react";
import "./Dashboard.css";
import CardContainer from "../../Components/Dashboard/CardContainer/CardContainer";
import BarChart from "../../Components/UI/Dashboard/BarChart/BarChart";
import DoughnutChart from "../../Components/UI/Dashboard/DoughnutChart/DoughnutChart";
import MiniCardContainer from "../../Components/Dashboard/MiniCardContainer/MiniCardContainer";
import LineChart from "../../Components/UI/Dashboard/LineChart/LineChart";

function Dashboard(props) {
  return (
    <div className=" Dashboard-div ">
      <h1>Dashboard</h1>
      <MiniCardContainer />
      <CardContainer>
        <BarChart />
        <DoughnutChart />
      </CardContainer>
      <CardContainer>
        <LineChart />
      </CardContainer>
    </div>
  );
}

export default Dashboard;
