import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import ProductDetail from './pages/ProductDetail';
import Transactions from './pages/Transactions';
import Login from './pages/Login';
import Summary from './pages/Summary';
import About from './pages/About';
import './App.css';

export const ExpenseContext = createContext(null);

function App() {
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

  // Authentication (very simple for demo)
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('et_user')) || null; } catch { return null; }
  });

  const login = (username) => {
    const u = { name: username };
    setUser(u);
    localStorage.setItem('et_user', JSON.stringify(u));
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

  const monthlyTotal = (year, month) => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month+1, 1);
    return transactions.filter(t=>{
      const d = new Date(t.date);
      return d >= start && d < end && t.type==='expense';
    }).reduce((s,t)=>s+Number(t.amount||0),0);
  };

  const categoryTotals = (items = transactions) => {
    return items.reduce((acc, t) => {
      const key = t.category || 'Other';
      acc[key] = (acc[key] || 0) + Number(t.amount || 0) * (t.type === 'expense' ? 1 : 0);
      return acc;
    }, {});
  };

  const contextValue = {
    // API products
    products,
    loadingProducts,
    productsError,
    refetchProducts: fetchProducts,
    // auth
    user,
    login,
    logout,
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
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/:id" element={<ProductDetail />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; 2026 Expense Tracker. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </ExpenseContext.Provider>
  );
}

export default App;
