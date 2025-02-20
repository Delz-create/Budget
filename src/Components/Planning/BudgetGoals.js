import React, { useState } from 'react';
import { useBudgetContext } from '../BudgetContext';

function BudgetGoals() {
    const { budgetGoals, addBudgetGoal, categories } = useBudgetContext();
    const [category, setCategory] = useState('');
    const [target, setTarget] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !target) return;
        addBudgetGoal(category, target);
        setCategory('');
        setTarget('');
    };

    return (
        <div className="budget-goals">
            <h2>Budget Goals</h2>
            <form onSubmit={handleSubmit}>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
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
                {Object.entries(budgetGoals).map(([category, goal]) => (
                    <div key={category} className="goal-item">
                        <h3>{category}</h3>
                        <p>Target: ${goal.target.toFixed(2)}</p>
                        <p>Spent: ${goal.current.toFixed(2)}</p>
                        <progress
                            value={goal.current}
                            max={goal.target}
                        ></progress>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BudgetGoals;