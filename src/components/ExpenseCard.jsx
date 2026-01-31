import React from 'react';
import './ExpenseCard.css';

const ExpenseCard = ({ expense }) => {
  return (
    <div className="expense-card">
      <div className="card-content">
        <h3 className="expense-title">{expense.title}</h3>
        <p className="expense-amount">${expense.amount.toFixed(2)}</p>
        <p className="expense-date">{new Date(expense.date).toLocaleDateString()}</p>
        <p className="expense-category">{expense.category}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
