import React from 'react';
import { useBudgetContext } from './BudgetContext';

function CurrencySelector() {
    const { currency, setCurrency } = useBudgetContext();

    return (
        <div className="currency-selector">
            <h2>Currency</h2>
            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="INR">INR</option>
            </select>
        </div>
    );
}

export default CurrencySelector;