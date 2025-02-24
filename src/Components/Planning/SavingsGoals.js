import React, { useState } from "react";
import { useBudgetContext } from "../BudgetContext";

function SavingsGoals() {
  const { savingsGoals, addSavingsGoal } = useBudgetContext();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const { currency, convertAmount } = useBudgetContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !target) return;
    addSavingsGoal(name, target);
    setName("");
    setTarget("");
  };

  return (
    <div className="savings-goals container">
      <h3>Savings Goals</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Goal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          {savingsGoals.map((goal) => (
            <li>
              <div
                key={goal.id}
                className="goal-item">
                <h3>{goal.name}</h3>
                <p>
                  Target: {currency} {convertAmount(goal.target)}
                </p>
                <p>
                  Saved: {currency} {convertAmount(goal.target)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SavingsGoals;
