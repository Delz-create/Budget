import React, { useState, useEffect } from "react";
import { useBudgetContext } from "./BudgetContext";

function Expenses() {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const {
    addExpense,
    expenseToEdit,
    validationErrors,
    validateExpense,
    categories,
  } = useBudgetContext();
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    validateExpense(product, parseFloat(price || 0));
  }, [product, price]);

  useEffect(() => {
    if (expenseToEdit) {
      setProduct(expenseToEdit.product);
      setPrice(expenseToEdit.price.toString());
      setCategory(expenseToEdit.category);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(product, price, category);
    setProduct("");
    setPrice("");
    setCategory(categories[0]);
  };

  return (
    <div className="Expenses container">
      <div className="Expenses_header">
        <h3>{expenseToEdit ? "Edit Expense" : "Add Expense"}</h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="Expenses_input">
          <input
            type="text"
            value={product}
            placeholder="Product"
            onChange={(e) => setProduct(e.target.value)}
          />
          {validationErrors.product && (
            <div className="error">{validationErrors.product}</div>
          )}
          <input
            type="number"
            value={price}
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          {validationErrors.price && (
            <div className="error">{validationErrors.price}</div>
          )}

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="Expenses_button">
          <button type="submit">
            {expenseToEdit ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Expenses;
