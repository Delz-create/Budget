import React from 'react'
import { useBudgetContext } from './BudgetContext'
import Edit from '../images/edit.svg'
import Delete from '../images/delete.svg'

function ExpensesList() {
    const { expenses, deleteExpense, editExpense } = useBudgetContext()

  return (
    <div className='container'>
        <h2>Expenses List</h2>

        <div className='expenses-list'>
            <ul>
                {expenses.map((expense) => (
                    <div className='expense_item' key={expense.id}>
                        <li>
                            <div className='expense_item-product_name'>
                                <h4>{expense.product}</h4>
                            </div>

                            <div className='expense_item-product_price'>
                                <p>${expense.price.toFixed(2)}</p>
                            </div>

                            <div className='expense_item-product_btn'>
                                <div className='edit'>
                                    <button onClick={() => editExpense(expense)}>
                                        <img src={Edit} alt='edit' />
                                    </button>
                                </div>

                                <div className='delete'>
                                    <button onClick={() => deleteExpense(expense.id)}>
                                        <img src={Delete} alt='delete'/>
                                    </button>
                                </div>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default ExpensesList