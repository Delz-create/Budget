import React from "react";
import { useBudgetContext } from "./BudgetContext";

function CurrencySelector() {
  const { currency, setCurrency } = useBudgetContext();

  return (
    <div className="currency-selector">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
      </select>
    </div>
  );
}

export default CurrencySelector;
