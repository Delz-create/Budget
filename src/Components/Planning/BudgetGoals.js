import React, { useState } from "react";
import { useBudgetContext } from "../BudgetContext";

function BudgetGoals() {
  const { budgetGoals, addBudgetGoal, categories } = useBudgetContext();
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState("");
  const { currency, convertAmount } = useBudgetContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !target) return;
    addBudgetGoal(category, target);
    setCategory("");
    setTarget("");
  };

  return (
    <div className="budget-goals container">
      <h3>Budget Goals</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Target Amount"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
        <button type="submit">Add Goal</button>
      </form>

      <div className="goals-list">
        <ul>
          {Object.entries(budgetGoals).map(([category, goal]) => (
            <li>
              <div
                key={category}
                className="goal-item">
                <h3>{category}</h3>
                <p>
                  Target: {currency} {convertAmount(goal.target)}
                </p>
                <p>
                  Spent: {currency} {convertAmount(goal.current)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BudgetGoals;
