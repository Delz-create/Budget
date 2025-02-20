import React, { useState } from 'react';
import { useBudgetContext } from '../BudgetContext';

function IncomeTracker() {
    const { income, addIncome } = useBudgetContext();
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState('monthly');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!source || !amount) return;
        addIncome(source, amount, frequency);
        setSource('');
        setAmount('');
    };

    return (
        <div className="income-tracker">
            <h2>Income Tracker</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Income Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                >
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="yearly">Yearly</option>
                </select>
                <button type="submit">Add Income</button>
            </form>

            <div className="income-list">
                {income.map((inc) => (
                    <div key={inc.id} className="income-item">
                        <h3>{inc.source}</h3>
                        <p>Amount: ${inc.amount.toFixed(2)}</p>
                        <p>Frequency: {inc.frequency}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default IncomeTracker;