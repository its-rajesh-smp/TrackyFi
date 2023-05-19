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
          labels: props.monthDatesArr,
          datasets: [
            {
              label: "Total Expense",
              backgroundColor: "red",
              data: props.thisMonthExpense,
            },
            {
              label: "Total Credit",
              backgroundColor: "green",
              data: props.thisMonthCredit,
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
