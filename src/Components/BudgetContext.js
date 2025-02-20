import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

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

    useEffect(() => localStorage.setItem('budget', budget), [budget]);
    useEffect(() => localStorage.setItem('expenses', JSON.stringify(expenses)), [expenses]);

    const [budgetGoals, setBudgetGoals] = useState(() => {
        const savedGoals = localStorage.getItem('budgetGoals')
        return savedGoals ? JSON.parse(savedGoals) : {}
    })

    const [savingsGoals, setSavingsGoals] = useState(() => {
        const savedSavings = localStorage.getItem('savingsGoals')
        return savedSavings ? JSON.parse(savedSavings) : []
    })

    const [income, setIncome] = useState(() => {
        const savedIcome = localStorage.getItem('income')
        return savedIcome ? JSON.parse(savedIcome) : []
    })

    useEffect(() => localStorage.setItem('budgetGoals', JSON.stringify(budgetGoals)), [budgetGoals]);
    useEffect(() => localStorage.setItem('savingsGoals', JSON.stringify(savingsGoals)), [savingsGoals]);
    useEffect(() => localStorage.setItem('income', JSON.stringify(income)), [income]);

    const addBudgetGoal = (category, target) => {
        setBudgetGoals((prev) => ({
            ...prev,
            [category]: { target: parseFloat(target), current: 0 }
        }))
    }

    const updateBudgetGoals = () => {
        const updatedGoals = {...budgetGoals}
        Object.keys(updatedGoals).forEach((category) => {
            const totalSpent = expenses
            .filter((expense) => expense.category === category)
            .reduce((total, expense) => total + expense.price, 0)
            updatedGoals[category].current = totalSpent
        })
        setBudgetGoals(updatedGoals)
    }

    const addSavingsGoal = (name, target) => {
        setSavingsGoals((prev) => [
            ...prev,
            {id: Date.now(), name, target: parseFloat(target), current: 0}
        ])
    }

    const updateSavingsGoals = () => {
        const totalSaved = budget - totalExpenses
        setSavingsGoals((prev) => 
        prev.map((goal) => ({
            ...goal,
            current: totalSaved
        })))
    }

    const addIncome = (source, amount, frequency) => {
        setIncome((prev) => [
            ...prev,
            { id: Date.now(), source, amount: parseFloat(amount), frequency }
        ])
    }

    const netSavings = budget - totalExpenses

    useEffect(() => {
        updateBudgetGoals()
        updateSavingsGoals()
    }, [expenses, budget])    

    const categoryExpenses = useMemo(() => {
        return categories.map((category) => ({
            category,
            total: expenses
            .filter((expense) => expense.category === category)
            .reduce((total, expense) => total + expense.price, 0)
        }))
    }, [expenses, categories])

    const budgetVsActual = useMemo(() => {
        return categories.map((category) => ({
            category,
            budget: budgetGoals[category]?.target || 0,
            actual: categoryExpenses.find((c) => c.category === category)?.total || 0
        }))
    }, [budgetGoals, categoryExpenses, categories])

    const savingsProgress = useMemo(() => {
        const dailySavings = []
        let cumulative = 0

        for (let i = 0; i < 30; i++){
            cumulative += (budget - totalExpenses) / 30
            dailySavings.push({
                day: `Day ${i + 1}`,
                amount: cumulative
            })
        }

        return dailySavings
    }, [budget, totalExpenses])

    const exportCSV = () => {
        const headers = ['Type', 'Name', 'Amount', 'Category', 'Date']
        const data = [
            ...expenses.map((expense) => ({
                type: 'Expense',
                Name: expense.product,
                Amount: expense.price,
                category: expense.category
            })),
            ...income.map((inc) => ({
                type: 'Income',
                Name: inc.source,
                Amount: inc.amount,
                category: 'Income'
            }))
        ]

        const csvContent = [
            headers.join('.'),
            ...data.map((row) => Object.values(row).join('.')),
        ].join('\n')

        const blob = new Blob([csvContent], {type: 'text/csv'})
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href =url
        link.download = 'budget_data.csv'
        link.click()
    }

    const exportJSON = () => {
        const data = {
            budget,
            expenses,
            income,
            budgetGoals,
            savingsGoals,
        };
        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'budget_data.json';
        link.click();
    };

    const [currency, setCurrency] = useState('USD')
    const [ExchangeRates, setExchangeRates] = useState({})

    useEffect(() => {
        const fecthRates = async () => {
            try {
                const response = await fetch ('https://api.exchangerate-api.com/v4/latest/USD')
                const data = await response.json()
                setExchangeRates(data.rates)
            } catch(error) {
                console.error('error fetching exchange reates:', error)
            }
        }
        fecthRates()
    }, [])

    const convertAmount = (amount) => {
        const rate = ExchangeRates[currency] || 1
        return (amount * rate).toFixed(2)
    }

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
                setSearchQuery,
                budgetGoals,
                addBudgetGoal,
                savingsGoals,
                addSavingsGoal,
                income,
                addIncome,
                netSavings,
                categoryExpenses,
                budgetVsActual,
                savingsProgress,
                exportCSV,
                exportJSON,
                currency,
                setCurrency,
                convertAmount
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudgetContext = () => useContext(BudgetContext);