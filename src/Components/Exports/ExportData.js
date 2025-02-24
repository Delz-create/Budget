import React from "react";
import { useBudgetContext } from "../BudgetContext";

function ExportData() {
  const { exportCSV, exportJSON } = useBudgetContext();

  return (
    <div className="export-data">
      <h2>Export Data</h2>

      <button
        onClick={exportCSV}
        className="csv">
        Export as CSV
      </button>
      <button
        onClick={exportJSON}
        className="json">
        Export as JSON
      </button>
    </div>
  );
}

export default ExportData;
