import React from "react";
import "./BarChart.css";
import { CChart } from "@coreui/react-chartjs";

function BarChart(props) {
  return (
    <div className=" BarChart-div ">
      <CChart
        className="myCHart"
        type="bar"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "Aug",
            "Sept",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              backgroundColor: "green",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
              barThickness: "20",
            },
            {
              backgroundColor: "red",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
              barThickness: "20",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        labels="months"
      />
    </div>
  );
}

export default BarChart;
