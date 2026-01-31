import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ExpenseContext } from '../App';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

export default function Dashboard() {
  const { user, totalIncome, totalExpense, currentBalance, transactions, categoryTotals } = useContext(ExpenseContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="summary-card">
          <p>Please <Link to="/login" className="btn-link">login</Link> to view your dashboard.</p>
        </div>
      </div>
    );
  }

  const income = totalIncome();
  const expense = totalExpense();
  const balance = currentBalance();

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const month = new Date(new Date().setMonth(new Date().getMonth() - i)).toLocaleString('default', { month: 'short' });
    return {
      month,
      income: Math.random() * 5000 + 1000,
      expense: Math.random() * 4000 + 500,
    };
  }).reverse();

  const recentTransactions = transactions.slice(0, 5);

  const savingsGoals = [
    { name: 'Emergency Fund', target: 5000, current: 3200 },
    { name: 'Vacation', target: 2000, current: 1100 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}!</h1>
        <p>Here is your financial overview.</p>
      </div>

      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="card-top">
            <div className="card-label">Total Balance</div>
            <div className="card-icon">💰</div>
          </div>
          <div className="card-value">${balance.toFixed(2)}</div>
          <div className={`card-change ${balance >= 0 ? 'positive' : 'negative'}`}>
            {balance >= 0 ? 'Looking good!' : 'In the red!'}
          </div>
        </div>
        <div className="summary-card">
          <div className="card-top">
            <div className="card-label">Total Income</div>
            <div className="card-icon">📈</div>
          </div>
          <div className="card-value">${income.toFixed(2)}</div>
          <div className="card-change positive">+${(income * 0.1).toFixed(2)} this month</div>
        </div>
        <div className="summary-card">
          <div className="card-top">
            <div className="card-label">Total Expense</div>
            <div className="card-icon">📉</div>
          </div>
          <div className="card-value">${expense.toFixed(2)}</div>
          <div className="card-change negative">-${(expense * 0.05).toFixed(2)} this month</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <div className="section-header">
            <h2>Monthly Overview</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" stroke="rgba(255, 255, 255, 0.7)" />
              <YAxis stroke="rgba(255, 255, 255, 0.7)" />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Bar dataKey="income" fill="#4ade80" />
              <Bar dataKey="expense" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard-sidebar">
          <div className="dashboard-section">
            <div className="section-header">
              <h3>Recent Transactions</h3>
              <Link to="/transactions" className="btn-link">View All</Link>
            </div>
            <div className="transactions-table">
              <div className="table-header">
                <div>Date</div>
                <div>Amount</div>
                <div>Category</div>
              </div>
              {recentTransactions.length > 0 ? (
                recentTransactions.map(t => (
                  <div key={t.id} className="table-row">
                    <div>{new Date(t.date).toLocaleDateString()}</div>
                    <div className={`amount ${t.type}`}>
                      {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                    </div>
                    <div>{t.category}</div>
                  </div>
                ))
              ) : (
                <p>No recent transactions.</p>
              )}
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h3>Savings Goals</h3>
            </div>
            <div className="goals-list">
              {savingsGoals.map((goal, index) => {
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={index} className="goal-item">
                    <div className="goal-header">
                      <span>{goal.name}</span>
                      <span>${goal.current} / ${goal.target}</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
