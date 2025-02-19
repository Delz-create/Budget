import './App.css';
import Budget from './Components/Budget';
import { BudgetProvider } from './Components/BudgetContext';
import Expenses from './Components/Expenses';
import ExpensesList from './Components/ExpensesList';
import Filters from './Components/Filters';
import Summary from './Components/Summary';


function App() {
  return (
    <BudgetProvider>
      <div className='App'>
        <div className='sub-container'>
          <Budget />
          <Expenses />
        </div>
        <Filters />
        <Summary />
        <ExpensesList />
      </div>
    </BudgetProvider>
  );
}

export default App;
