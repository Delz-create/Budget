import React from 'react'
import { useBudgetContext } from './BudgetContext'

function Summary() {
    const { budget, totalExpenses, remainingBalance } = useBudgetContext()

  return (
    <div className='container'>
        <div className='summary_sub'>
            <div className='total-budget'>
                <div className='total_budget-sub'>
                    <h3>Total Budget</h3>
                    <p>${budget.toFixed(2)}</p>
                </div>
            </div>

            <div className='total-expenses'>
                <div className='total_expenses-sub'>
                    <h3>Total Expenses</h3>
                    <p>${totalExpenses.toFixed(2)}</p>
                </div>
            </div>

            <div className='remaining-balance'>
                <div className='remaining_balance-sub'>
                    <h3>Remaining Balance</h3>
                    <p>${remainingBalance.toFixed(2)}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Summary