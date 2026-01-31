import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import ProductDetail from './pages/ProductDetail';
import Summary from './pages/Summary';
import About from './pages/About';
import './App.css';

export const ExpenseContext = createContext(null);

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://dummyjson.com/products';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data?.products || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const calculateTotalExpense = (items = products) => {
    return items.reduce((total, product) => total + (Number(product.price) || 0), 0);
  };

  const calculateAverageExpense = (items = products) => {
    if (!items || items.length === 0) return 0;
    return calculateTotalExpense(items) / items.length;
  };

  const getHighestExpense = (items = products) => {
    if (!items || items.length === 0) return null;
    return items.reduce((max, product) => (product.price > max.price ? product : max), items[0]);
  };

  const getLowestExpense = (items = products) => {
    if (!items || items.length === 0) return null;
    return items.reduce((min, product) => (product.price < min.price ? product : min), items[0]);
  };

  const contextValue = {
    products,
    loading,
    error,
    refetch: fetchProducts,
    calculateTotalExpense,
    calculateAverageExpense,
    getHighestExpense,
    getLowestExpense,
  };

  return (
    <ExpenseContext.Provider value={contextValue}>
      <Router>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/expenses/:id" element={<ProductDetail />} />
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
