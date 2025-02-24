import React, { useState } from "react";
import { useBudgetContext } from "./BudgetContext";

function Budget() {
  const { setBudget, message, validationErrors, validateBudget } =
    useBudgetContext();
  const [inputBudget, setInputBudget] = useState(0);

  const handleInputChange = (value) => {
    const numValue = parseFloat(value);
    setInputBudget(value);
    validateBudget(numValue);
  };

  const handleSetBudget = () => {
    const numValue = parseFloat(inputBudget);
    if (!validationErrors.budget) {
      setBudget(numValue);
    }
  };

  return (
    <div className="budget container">
      <div className="budget_header">
        <h2>Budget</h2>
      </div>

      <div className="budget_input">
        <input
          type="number"
          value={inputBudget}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter your budget"
        />
        {validationErrors.budget && (
          <div className="error">{validationErrors.budget}</div>
        )}
      </div>

      <div>
        <button onClick={handleSetBudget}>Set Budget</button>
      </div>

      {message && (
        <div className="budget_message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Budget;
