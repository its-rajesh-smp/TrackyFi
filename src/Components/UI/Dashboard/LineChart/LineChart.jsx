import React from "react";
import "./LineChart.css";
import { CChart } from "@coreui/react-chartjs";
function LineChart(props) {
  return (
    <div className=" LineChart-div ">
      <CChart
        type="line"
        data={{
          labels: props.allDatesArr,
          datasets: [
            {
              label: "Lifetime Expense",
              backgroundColor: "red",
              borderColor: "red",
              pointBackgroundColor: "red",
              pointBorderColor: "red",
              data: props.totalExpenseArr,
            },
            {
              label: "Lifetime Credit",
              backgroundColor: "green",
              borderColor: "green",
              pointBackgroundColor: "green",
              pointBorderColor: "green",
              data: props.totalCreditArr,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              enabled: false,
            },
          },
        }}
      />
    </div>
  );
}

export default LineChart;
