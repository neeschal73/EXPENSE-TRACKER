import { useState, useContext } from 'react';
import { ExpenseContext } from '../App';
import ExpenseCard from '../components/ExpenseCard';
import './Expenses.css';

function Expenses() {
  const { transactions } = useContext(ExpenseContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredExpenses = transactions.filter(expense =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'amount-asc') {
      return a.amount - b.amount;
    } else if (sortBy === 'amount-desc') {
      return b.amount - a.amount;
    }
    return 0;
  });

  return (
    <div className="expenses-container">
      <div className="expenses-header">
        <h1>Your Expenses</h1>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search expenses..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="amount-asc">Sort by Amount (Low to High)</option>
          <option value="amount-desc">Sort by Amount (High to Low)</option>
        </select>
      </div>

      <div className="expenses-grid">
        {sortedExpenses.length > 0 ? (
          sortedExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))
        ) : (
          <p>No expenses found.</p>
        )}
      </div>
    </div>
  );
}

export default Expenses;
