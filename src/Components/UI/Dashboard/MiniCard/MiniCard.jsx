import React from "react";
import "./MiniCard.css";
import { CChart } from "@coreui/react-chartjs";
function MiniCard(props) {
  return (
    <div className=" MiniCard-div ">
      <div className="MiniCard-div__div">
        <h3>Hello</h3>
        <h1>89</h1>
      </div>
      <CChart
        type="line"
        data={{
          labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
          ],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "rgba(220, 220, 220, 1)",
              pointBackgroundColor: "green",
              pointBorderColor: "green",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
            },
            {
              label: "My Second dataset",
              backgroundColor: "rgba(151, 187, 205, 0.2)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "red",
              pointBorderColor: "red",
              data: [50, 12, 28, 29, 7, 25, 12, 70, 60],
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
            tooltip: {
              enabled: false,
            },
          },
          scales: {
            x: {
              display: false,
            },
            y: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
}

export default MiniCard;
