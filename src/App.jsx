import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import ProductDetail from './pages/ProductDetail';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Summary from './pages/Summary';
import About from './pages/About';
import './App.css';

export const ExpenseContext = createContext(null);

function App() {
  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(() => {
    try { return JSON.parse(localStorage.getItem('et_darkMode')) || false; } catch { return false; }
  });

  useEffect(() => { localStorage.setItem('et_darkMode', JSON.stringify(darkMode)); }, [darkMode]);
  useEffect(() => { document.body.classList.toggle('dark', darkMode); }, [darkMode]);

  // API products (kept for reference)
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState(null);

  const API_URL = 'https://dummyjson.com/products';

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await axios.get(API_URL);
      setProducts(response.data?.products || []);
      setProductsError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProductsError('Failed to load products.');
      setProducts([]);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Authentication with passwords
  const [users, setUsers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('et_users')) || {}; } catch { return {}; }
  });

  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('et_user')) || null; } catch { return null; }
  });

  const register = (username, password) => {
    if(users[username]) return { success: false, error: 'User already exists' };
    const newUsers = { ...users, [username]: { password } };
    setUsers(newUsers);
    localStorage.setItem('et_users', JSON.stringify(newUsers));
    const u = { name: username };
    setUser(u);
    localStorage.setItem('et_user', JSON.stringify(u));
    return { success: true };
  };

  const login = (username, password) => {
    const userRecord = users[username];
    if(!userRecord || userRecord.password !== password) {
      return { success: false, error: 'Invalid username or password' };
    }
    const u = { name: username };
    setUser(u);
    localStorage.setItem('et_user', JSON.stringify(u));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('et_user');
  };

  // Transactions (user-managed) stored in localStorage per user
  const storageKey = user ? `et_txns_${user.name}` : 'et_txns_guest';
  const [transactions, setTransactions] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || []; } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(transactions)); } catch {}
  }, [storageKey, transactions]);

  useEffect(() => {
    try {
      const tx = JSON.parse(localStorage.getItem(storageKey)) || [];
      setTransactions(tx);
    } catch { setTransactions([]); }
  }, [user]);

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Date.now() };
    setTransactions((s) => [newTx, ...s]);
    return newTx;
  };

  const editTransaction = (id, updates) => {
    setTransactions((s) => s.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTransaction = (id) => {
    setTransactions((s) => s.filter(t => t.id !== id));
  };

  // Calculations
  const totalIncome = (items = transactions) => items.filter(i=>i.type==='income').reduce((sum,i)=>sum+Number(i.amount||0),0);
  const totalExpense = (items = transactions) => items.filter(i=>i.type==='expense').reduce((sum,i)=>sum+Number(i.amount||0),0);
  const currentBalance = () => totalIncome() - totalExpense();

  const categoryTotals = () => {
    return transactions.filter(t => t.type === 'expense').reduce((acc, t) => {
      const cat = t.category || 'Other';
      acc[cat] = (acc[cat] || 0) + Number(t.amount || 0);
      return acc;
    }, {});
  };

  const monthlyTotal = (year, month) => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month+1, 1);
    return transactions.filter(t=>{
      const d = new Date(t.date);
      return d >= start && d < end && t.type==='expense';
    }).reduce((s,t)=>s+Number(t.amount||0),0);
  };

  // Calculation functions for Summary page (using products from API)
  const calculateTotalExpense = (items = products) => {
    return (items || []).reduce((sum, item) => sum + (item.price || 0), 0);
  };

  const calculateAverageExpense = (items = products) => {
    if (!items || items.length === 0) return 0;
    return calculateTotalExpense(items) / items.length;
  };

  const getHighestExpense = (items = products) => {
    if (!items || items.length === 0) return null;
    return items.reduce((max, item) => (item.price || 0) > (max.price || 0) ? item : max);
  };

  const getLowestExpense = (items = products) => {
    if (!items || items.length === 0) return null;
    return items.reduce((min, item) => (item.price || 0) < (min.price || 0) ? item : min);
  };

  // Budgets (category-wise limits)
  const budgetKey = user ? `et_budgets_${user.name}` : 'et_budgets_guest';
  const [budgets, setBudgets] = useState(() => {
    try { return JSON.parse(localStorage.getItem(budgetKey)) || {}; } catch { return {}; }
  });

  useEffect(() => {
    try { localStorage.setItem(budgetKey, JSON.stringify(budgets)); } catch {}
  }, [budgetKey, budgets]);

  useEffect(() => {
    try {
      const b = JSON.parse(localStorage.getItem(budgetKey)) || {};
      setBudgets(b);
    } catch { setBudgets({}); }
  }, [user]);

  const setBudgetLimit = (category, limit) => {
    setBudgets(s => ({ ...s, [category]: limit }));
  };

  const getBudgetStatus = (category) => {
    const spent = categoryTotals()[category] || 0;
    const limit = budgets[category] || 0;
    if(!limit) return { spent, limit, pct: 0, exceeded: false };
    const pct = Math.min(Math.round((spent / limit) * 100), 100);
    return { spent, limit, pct, exceeded: spent > limit };
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Type', 'Category', 'Description', 'Amount'];
    const rows = transactions.map(t => [
      t.date,
      t.type,
      t.category || 'Other',
      t.description || '',
      t.amount.toFixed(2)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expenses_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const contextValue = {
    // API products
    products,
    loadingProducts,
    productsError,
    refetchProducts: fetchProducts,
    // auth
    user,
    register,
    login,
    logout,
    users,
    // dark mode
    darkMode,
    toggleDarkMode: () => setDarkMode(d => !d),
    // transactions
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    totalIncome,
    totalExpense,
    currentBalance,
    monthlyTotal,
    categoryTotals,
    // calculations for Summary page
    calculateTotalExpense,
    calculateAverageExpense,
    getHighestExpense,
    getLowestExpense,
    // budgets
    budgets,
    setBudgetLimit,
    getBudgetStatus,
    // export
    exportToCSV,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/:id" element={<ProductDetail />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ExpenseContext.Provider>
  );
}

export default App;
