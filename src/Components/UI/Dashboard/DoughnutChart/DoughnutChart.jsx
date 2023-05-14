import React from "react";
import "./DoughnutChart.css";
import { CChart } from "@coreui/react-chartjs";
function DoughnutChart(props) {
  return (
    <div className=" DoughnutChart-div">
      <CChart
        type="doughnut"
        data={{
          labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
              data: [40, 20, 80, 10],
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
}

export default DoughnutChart;
