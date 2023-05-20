import React, { memo } from "react";
import "./DoughnutChart.css";
import { CChart } from "@coreui/react-chartjs";
import { useSelector } from "react-redux";
function DoughnutChart(props) {
  const expenses = useSelector((state) => state.transectionReducer.expense);

  // Creating Map
  const categoryMap = new Map();
  expenses.forEach((expenses) => {
    if (categoryMap.has(expenses.category)) {
      categoryMap.set(
        expenses.category,
        categoryMap.get(expenses.category) + Number(expenses.price)
      );
    } else {
      categoryMap.set(expenses.category, Number(expenses.price));
    }
  });

  // Forming Array
  const categoryArr = [];
  const priceArr = [];
  for (let expense of categoryMap) {
    categoryArr.push(expense[0]);
    priceArr.push(expense[1]);
  }

  return (
    <div className=" DoughnutChart-div">
      <CChart
        type="doughnut"
        data={{
          labels: categoryArr,
          datasets: [
            {
              backgroundColor: [
                "#41B883",
                "#E46651",
                "#00D8FF",
                "#DD1B16",
                "#41B883",
                "#E46651",
                "#00D8FF",
                "#DD1B16",
              ],
              data: priceArr,
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

export default memo(DoughnutChart);
