import React, { useState } from 'react';
import { useBudgetContext } from '../BudgetContext';

function SavingsGoals() {
    const { savingsGoals, addSavingsGoal } = useBudgetContext();
    const [name, setName] = useState('');
    const [target, setTarget] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !target) return;
        addSavingsGoal(name, target);
        setName('');
        setTarget('');
    };

    return (
        <div className="savings-goals">
            <h2>Savings Goals</h2>
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
                {savingsGoals.map((goal) => (
                    <div key={goal.id} className="goal-item">
                        <h3>{goal.name}</h3>
                        <p>Target: ${goal.target.toFixed(2)}</p>
                        <p>Saved: ${goal.current.toFixed(2)}</p>
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

export default SavingsGoals;