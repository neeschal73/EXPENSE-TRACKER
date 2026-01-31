import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../App';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Reports.css';

export default function Reports(){
  const ctx = useContext(ExpenseContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  if(!ctx || !ctx.user) {
    return (
      <div className="page-container">
        <div className="card">
          <p>Please login to view reports.</p>
        </div>
      </div>
    );
  }

  const categoryTotals = ctx.categoryTotals();
  const categories = Object.keys(categoryTotals);
  
  // Prepare pie chart data
  const pieData = categories.map(cat => ({
    name: cat,
    value: categoryTotals[cat]
  })).filter(item => item.value > 0);

  // Prepare bar chart data for last 12 months
  const barData = [];
  for(let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const total = ctx.monthlyTotal(d.getFullYear(), d.getMonth());
    barData.push({
      month: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      amount: total
    });
  }

  const COLORS = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e'];

  return (
    <div className="page-container">
      <h2 style={{marginBottom: '20px'}}>Financial Reports</h2>

      <div className="reports-grid">
        {/* Pie Chart */}
        {pieData.length > 0 && (
          <div className="card report-card">
            <h3>Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({name, value}) => `${name}: $${value.toFixed(0)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Bar Chart */}
        {barData.some(d => d.amount > 0) && (
          <div className="card report-card">
            <h3>Monthly Expense Trends (Last 12 Months)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                <Legend />
                <Bar dataKey="amount" fill="#3498db" name="Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Summary Statistics */}
      <div className="card" style={{marginTop: '20px'}}>
        <h3>Summary Statistics</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Income</span>
            <span className="stat-value income">${ctx.totalIncome().toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Expenses</span>
            <span className="stat-value expense">${ctx.totalExpense().toFixed(2)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Net Balance</span>
            <span className={`stat-value ${ctx.currentBalance() >= 0 ? 'positive' : 'negative'}`}>
              ${ctx.currentBalance().toFixed(2)}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Avg Monthly Expense</span>
            <span className="stat-value">${(ctx.totalExpense() / 12).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {categories.length > 0 && (
        <div className="card" style={{marginTop: '20px'}}>
          <h3>Category Breakdown</h3>
          <div className="category-list">
            {categories.map(cat => {
              const amt = categoryTotals[cat] || 0;
              const pct = ((amt / ctx.totalExpense()) * 100).toFixed(1);
              return (
                <div key={cat} className="category-row">
                  <span className="cat-name">{cat}</span>
                  <span className="cat-amount">${amt.toFixed(2)}</span>
                  <span className="cat-pct">({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
