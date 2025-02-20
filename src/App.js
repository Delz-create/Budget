import "./App.css";
import Budget from "./Components/Budget";
import { BudgetProvider } from "./Components/BudgetContext";
import Expenses from "./Components/Expenses";
import ExpensesList from "./Components/ExpensesList";
import ExportData from "./Components/Exports/ExportData";
import Filters from "./Components/Filters";
import BudgetGoals from "./Components/Planning/BudgetGoals";
import IncomeTracker from "./Components/Planning/IncomeTracker";
import SavingsGoals from "./Components/Planning/SavingsGoals";
import Summary from "./Components/Summary";
import Visualizations from "./Components/Visualizations";

function App() {
  return (
    <BudgetProvider>
      <div className="App">
        <div className="Planner">
          <BudgetGoals />
          <SavingsGoals />
          <IncomeTracker />
        </div>
        <div className="sub-container">
          <Budget />
          <Expenses />
        </div>
        <Filters />
        <Summary />
        <ExpensesList />
        <ExportData />
        <Visualizations />
      </div>
    </BudgetProvider>
  );
}

export default App;
