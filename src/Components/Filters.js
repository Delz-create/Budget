import React from "react";
import { useBudgetContext } from "./BudgetContext";

function Filters() {
  const {
    categories,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
  } = useBudgetContext();

  return (
    <div className="filters">
      <div className="searches">
        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search"
          />
        </div>
      </div>

      <div className="drop-down_search">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
          <option value="category">Sort by Category</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}>
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
