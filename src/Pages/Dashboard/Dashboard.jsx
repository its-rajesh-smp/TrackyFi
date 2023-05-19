import React from "react";
import "./Dashboard.css";
import CardContainer from "../../Components/Dashboard/CardContainer/CardContainer";
import BarChart from "../../Components/UI/Dashboard/BarChart/BarChart";
import DoughnutChart from "../../Components/UI/Dashboard/DoughnutChart/DoughnutChart";
import MiniCardContainer from "../../Components/Dashboard/MiniCardContainer/MiniCardContainer";
import LineChart from "../../Components/UI/Dashboard/LineChart/LineChart";
import { useSelector } from "react-redux";

function Dashboard(props) {
  const expenseData = useSelector((state) => state.transectionReducer.expense);

  // GETTING TODAY
  const currentDate = new Date();
  const todayDate = currentDate.getDate();
  const todayYear = currentDate.getFullYear();
  const todayMonth = currentDate.getMonth();

  //This Day Expense=[]
  const thisDateExpense = [];
  const thisDateCredit = [];
  let totalThisDateCredit = 0;
  let totalThisDateExpense = 0;

  // This Month Expense
  const thisMonthExpense = [];
  const thisMonthCredit = [];
  const monthDatesArr = [];
  let totalThisMonthCredit = 0;
  let totalThisMonthExpense = 0;

  // This Year Expense
  const totalExpenseArr = [];
  const totalCreditArr = [];
  const allDatesArr = [];
  let totalThisYearCredit = 0;
  let totalThisYearExpense = 0;

  // Maps
  const categoryMap = new Map();
  const expenseMap = new Map();
  const thisMonthMap = new Map();

  expenseData.forEach((expense) => {
    // AllExpense Map
    if (expenseMap.has(expense.date)) {
      expenseMap.set(expense.date, [...expenseMap.get(expense.date), expense]);
    } else {
      expenseMap.set(expense.date, [expense]);
    }

    //This Month Map
    if (new Date(expense.date).getMonth() === todayMonth) {
      if (thisMonthMap.has(expense.date)) {
        thisMonthMap.set(expense.date, [
          ...thisMonthMap.get(expense.date),
          expense,
        ]);
      } else {
        thisMonthMap.set(expense.date, [expense]);
      }
    }

    //This Date
    if (new Date(expense.date).getDate() === todayDate) {
      if (expense.type === "credit") {
        thisDateCredit.push(expense.price);
        totalThisDateCredit += Number(expense.price);
      } else {
        thisDateExpense.push(expense.price);
        totalThisDateExpense += Number(expense.price);
      }
    }
  });

  // Looping on All Expense Map
  for (const date of expenseMap) {
    allDatesArr.push(date[0]);
    let totalExpense = 0;
    let totalCredit = 0;

    date[1].forEach((expense) => {
      if (expense.type === "credit") {
        totalCredit += Number(expense.price);
        totalThisYearCredit += Number(expense.price);
      } else {
        totalExpense += Number(expense.price);
        totalThisYearExpense += Number(expense.price);
      }
    });
    totalExpenseArr.push(totalExpense);
    totalCreditArr.push(totalCredit);
  }

  //Looping on All Month Map
  for (const month of thisMonthMap) {
    monthDatesArr.push(month[0]);
    let totalExpense = 0;
    let totalCredit = 0;
    month[1].forEach((expense) => {
      if (expense.type === "credit") {
        totalThisMonthCredit += Number(expense.price);
        totalCredit += Number(expense.price);
      } else {
        totalThisMonthExpense += Number(expense.price);
        totalExpense += Number(expense.price);
      }
    });
    thisMonthCredit.push(totalCredit);
    thisMonthExpense.push(totalExpense);
  }

  return (
    <div className=" Dashboard-div ">
      <div className="Dashboard-div__headingContianer">
        <h1>Dashboard</h1>
      </div>

      <MiniCardContainer
        thisDateExpense={thisDateExpense}
        thisDateCredit={thisDateCredit}
        thisMonthExpense={thisMonthExpense}
        thisMonthCredit={thisMonthCredit}
        totalThisDateCredit={totalThisDateCredit}
        totalThisDateExpense={totalThisDateExpense}
        totalThisMonthCredit={totalThisMonthCredit}
        totalThisMonthExpense={totalThisMonthExpense}
      />

      <CardContainer for="Monthly">
        <BarChart
          monthDatesArr={monthDatesArr}
          thisMonthExpense={thisMonthExpense}
          thisMonthCredit={thisMonthCredit}
        />
      </CardContainer>

      <CardContainer for="All Over">
        <LineChart
          allDatesArr={allDatesArr}
          totalExpenseArr={totalExpenseArr}
          totalCreditArr={totalCreditArr}
        />
      </CardContainer>
    </div>
  );
}

export default Dashboard;
