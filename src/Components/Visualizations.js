import React from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import { useBudgetContext } from "./BudgetContext";

function Visualizations() {
  const { categoryExpenses, budgetVsActual, savingsProgress } =
    useBudgetContext();

  const pieData = {
    labels: categoryExpenses.map((c) => c.category),
    datasets: [
      {
        data: categoryExpenses.map((c) => c.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const barData = {
    labels: budgetVsActual.map((b) => b.category),
    datasets: [
      {
        label: "Budget",
        data: budgetVsActual.map((b) => b.budget),
        backgroundColor: "#36A2EB",
      },
      {
        label: "Actual",
        data: budgetVsActual.map((b) => b.actual),
        backgroundColor: "#FF6384",
      },
    ],
  };

  const lineData = {
    labels: savingsProgress.map((s) => s.day),
    datasets: [
      {
        label: "Savings Progress",
        data: savingsProgress.map((s) => s.amount),
        borderColor: "#4BC0C0",
        fill: false,
      },
    ],
  };

  return (
    <div className="visualizations container">
      <div className="chart-container">
        <h2>Expense Categories</h2>
        <Pie data={pieData} />
      </div>

      <div className="chart-container">
        <h2>Budget vs. Actual Spending</h2>
        <Bar data={barData} />
      </div>

      <div className="chart-container">
        <h2>Savings Progress</h2>
        <Line data={lineData} />
      </div>
    </div>
  );
}

export default Visualizations;
