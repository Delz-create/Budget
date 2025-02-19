import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const categories = ['Food', 'Rent', 'Transport', 'Entertainment', 'Utilities', 'Others']
    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem('budget');
        return savedBudget ? parseFloat(savedBudget) : 0;
    });
    

    const [message, setMessage] = useState('');
    const [expenses, setExpenses] = useState(() => {
        const savedExpenses = localStorage.getItem('expenses');
        try {
            return savedExpenses ? JSON.parse(savedExpenses) : [];
        } catch (error) {
            console.error('Error parsing expenses:', error);
            return [];
        }
    });

    const [validationErrors, setValidationErrors] = useState({
        budget: '',
        product: '',
        price: '',
    });

    const [expenseToEdit, setExpenseToEdit] = useState(null); 

    const [filterCategory, setFilterCategory] = useState('All');
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc');
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredExpenses = useMemo(() => {
        let filtered = [...expenses];

        if (filterCategory !== 'All') {
            filtered = filtered.filter(expense => expense.category === filterCategory);
        }


        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(expense => 
                expense.product.toLowerCase().includes(query)
            );
        }

        filtered.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(a.date) - new Date(b.date);
            } else if (sortBy === 'price') {
                return a.price - b.price;
            } else if (sortBy === 'category') {
                return a.category.localeCompare(b.category);
            }
            return 0;
        });

        return sortOrder === 'desc' ? filtered.reverse() : filtered;
    }, [filterCategory, searchQuery, sortBy, sortOrder, expenses]);

    useEffect(() => localStorage.setItem('budget', budget), [budget]);
    useEffect(() => localStorage.setItem('expenses', JSON.stringify(expenses)), [expenses]);


    const handleSetBudget = (value) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setMessage('Please enter a valid number for the budget');
            setTimeout(() => setMessage(''), 5000);
            return;
        }
        if (numValue < 0) {
            setMessage('Budget must be a positive number');
            setTimeout(() => setMessage(''), 5000);
            return;
        }
        setBudget(numValue);
        setMessage(`Your Budget $${numValue}`);
        setTimeout(() => setMessage(''), 5000);
    };

    const addExpense = (product, price, category) => {
        const priceNumber = parseFloat(price);

        if (!product || isNaN(priceNumber)) {
            setMessage('Please enter valid product and price');
            setTimeout(() => setMessage(''), 5000);
            return;
        }

        if (priceNumber <= 0) {
            setMessage('Price must be greater than 0');
            setTimeout(() => setMessage(''), 5000);
            return;
        }

        const newTotal = totalExpenses + (expenseToEdit ? (priceNumber - expenseToEdit.price) : priceNumber);
        if (newTotal > budget) {
            setMessage('Expense exceeds remaining budget!');
            setTimeout(() => setMessage(''), 5000);
            return;
        }

        if (expenseToEdit) {
            setExpenses(expenses.map(expense =>
                expense.id === expenseToEdit.id ? { ...expense, product, price: priceNumber, category } : expense
            ));
            setMessage(`Expense updated: ${product} - $${priceNumber}`);
            setExpenseToEdit(null); 
        } else {
            const newExpense = { id: Date.now(), product, price: priceNumber, category };
            setExpenses([...expenses, newExpense]);
            setMessage(`Expense added: ${product} - $${priceNumber}`);
        }

        setTimeout(() => setMessage(''), 5000);
    };

    const deleteExpense = (id) => {
        const expense = expenses.find((e) => e.id === id);
        setExpenses(expenses.filter((e) => e.id !== id));
        setMessage(`Expense deleted: ${expense.product} - $${expense.price}`);
        setTimeout(() => setMessage(''), 5000);
    };

    const editExpense = (expense) => {
        setExpenseToEdit(expense);
    };

    const totalExpenses = expenses.reduce((total, expense) => total + expense.price, 0);
    const remainingBalance = budget - totalExpenses;

    const validateBudget = (value) => {
        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            setValidationErrors((prev) => ({ ...prev, budget: 'Budget must be a number' }));
        } else if (numValue < 0) {
            setValidationErrors((prev) => ({ ...prev, budget: 'Budget must be a positive number' }));
        } else {
            setValidationErrors((prev) => ({ ...prev, budget: '' }));
        }
    };

    const validateExpense = (product, price) => {
        const priceNumber = parseFloat(price);
        const errors = { product: '', price: '' };

        if (!product) errors.product = 'Product name is required';
        if (isNaN(priceNumber)) errors.price = 'Price must be a number';
        if (priceNumber <= 0) errors.price = 'Price must be greater than 0';
        if (priceNumber > remainingBalance) errors.price = 'Price exceeds remaining budget';

        setValidationErrors((prev) => ({ ...prev, ...errors }));
    };

    return (
        <BudgetContext.Provider
            value={{
                budget,
                setBudget: handleSetBudget,
                message,
                expenses,
                categories,
                addExpense,
                deleteExpense,
                editExpense,
                expenseToEdit,
                totalExpenses,
                remainingBalance,
                validationErrors,
                validateBudget,
                validateExpense,
                filteredExpenses,
                filterCategory,
                setFilterCategory,
                sortBy,
                setSortBy,
                sortOrder,
                setSortOrder,
                searchQuery,
                setSearchQuery
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudgetContext = () => useContext(BudgetContext);