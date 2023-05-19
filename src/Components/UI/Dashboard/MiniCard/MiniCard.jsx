import React from "react";
import "./MiniCard.css";
import { CChart } from "@coreui/react-chartjs";
import { ShowOnDesktop } from "../../../../Styles/media";
function MiniCard(props) {
  return (
    <div className=" MiniCard-div ">
      <div className="MiniCard-div__div">
        <h3>{props.for}</h3>
        <h1>{props.total}</h1>
      </div>
      <ShowOnDesktop>
        <CChart
          type="line"
          data={{
            labels: [1, 2, 3, 4, 5, 6, 7],
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "green",
                pointBorderColor: "green",
                data: props.credit,
              },
              {
                label: "My Second dataset",
                backgroundColor: "rgba(151, 187, 205, 0.2)",
                borderColor: "rgba(151, 187, 205, 1)",
                pointBackgroundColor: "red",
                pointBorderColor: "red",
                data: props.expense,
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
      </ShowOnDesktop>
    </div>
  );
}

export default MiniCard;
