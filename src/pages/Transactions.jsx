import React, { useContext, useState, useMemo } from 'react';
import { ExpenseContext } from '../App';
import './Transactions.css';

export default function Transactions(){
  const ctx = useContext(ExpenseContext);
  
  if (!ctx) {
    return <div className="loading">Loading...</div>;
  }
  
  const [form, setForm] = useState({ type: 'expense', amount: '', category: 'Food', description: '', date: new Date().toISOString().slice(0,10) });
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const categories = ['Food', 'Travel', 'Bills', 'Rent', 'Entertainment', 'Shopping', 'Other'];

  const submit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if(!amount || amount <= 0) return;
    
    if(editingId) {
      ctx.editTransaction(editingId, { ...form, amount });
      setEditingId(null);
    } else {
      ctx.addTransaction({ ...form, amount });
    }
    setForm({ type: 'expense', amount: '', category: 'Food', description: '', date: new Date().toISOString().slice(0,10) });
  };

  const filtered = useMemo(() => {
    let result = ctx.transactions;

    if(filterType !== 'All') result = result.filter(t => t.type === filterType);
    if(filterCategory !== 'All') result = result.filter(t => t.category === filterCategory);
    if(searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(t => 
        (t.description && t.description.toLowerCase().includes(term)) ||
        (t.category && t.category.toLowerCase().includes(term)) ||
        t.amount.toString().includes(term)
      );
    }

    if(sortBy === 'latest') result = [...result].sort((a,b) => new Date(b.date) - new Date(a.date));
    if(sortBy === 'highest') result = [...result].sort((a,b) => b.amount - a.amount);
    if(sortBy === 'lowest') result = [...result].sort((a,b) => a.amount - b.amount);

    return result;
  }, [ctx.transactions, filterType, filterCategory, searchTerm, sortBy]);

  const startEdit = (tx) => {
    setForm(tx);
    setEditingId(tx.id);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ type: 'expense', amount: '', category: 'Food', description: '', date: new Date().toISOString().slice(0,10) });
  };

  const income = ctx.totalIncome();
  const expense = ctx.totalExpense();
  const balance = ctx.currentBalance();

  return (
    <div className="page-container">
      <h2>Transactions Manager</h2>
      <p>Track your income and expenses with detailed categorization and filtering</p>
      
      {/* Summary Cards */}
      <div className="summary-row">
        <div className="summary-mini income-mini">
          <div className="label">Total Income</div>
          <div className="amount">${income.toFixed(2)}</div>
        </div>
        <div className="summary-mini expense-mini">
          <div className="label">Total Expenses</div>
          <div className="amount">${expense.toFixed(2)}</div>
        </div>
        <div className={`summary-mini balance-mini ${balance >= 0 ? '' : 'neg'}`}>
          <div className="label">Net Balance</div>
          <div className="amount">${balance.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid">
        {/* Add/Edit Form */}
        <section className="card">
          <h3>{editingId ? '✎ Edit Transaction' : '➕ Add Transaction'}</h3>
          <form onSubmit={submit} className="form">
            <label>Transaction Type</label>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <label>Amount ($)</label>
            <input 
              type="number" 
              step="0.01" 
              value={form.amount} 
              onChange={e=>setForm({...form,amount:e.target.value})} 
              placeholder="0.00"
              required
            />

            <label>Category</label>
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>

            <label>Date</label>
            <input 
              type="date" 
              value={form.date} 
              onChange={e=>setForm({...form,date:e.target.value})}
              required
            />

            <label>Description (Optional)</label>
            <input 
              value={form.description} 
              onChange={e=>setForm({...form,description:e.target.value})} 
              placeholder="Add notes about this transaction..."
            />

            <div className="form-actions">
              <button className="btn-submit" type="submit">
                {editingId ? '💾 Update' : '➕ Add Transaction'}
              </button>
              {editingId && (
                <button className="btn-cancel" type="button" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Filters & Search */}
        <section className="card">
          <h3>🔍 Filters & Search</h3>
          
          <div className="filter-panel">
            <div className="filter-group">
              <label>🔎 Search</label>
              <input 
                value={searchTerm} 
                onChange={e=>setSearchTerm(e.target.value)} 
                placeholder="Description, category, amount..."
                type="text"
              />
            </div>

            <div className="filter-group">
              <label>💼 Type</label>
              <select value={filterType} onChange={e=>setFilterType(e.target.value)}>
                <option value="All">All Types</option>
                <option value="income">Income Only</option>
                <option value="expense">Expenses Only</option>
              </select>
            </div>

            <div className="filter-group">
              <label>📂 Category</label>
              <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)}>
                <option value="All">All Categories</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="filter-group">
              <label>⬆️ Sort By</label>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
                <option value="latest">Latest First</option>
                <option value="highest">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
              </select>
            </div>
          </div>
        </section>
      </div>

      {/* Transactions List */}
      <section className="card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{margin: 0}}>📊 Transaction History ({filtered.length})</h3>
          {ctx.transactions.length > 0 && (
            <button className="btn-export" onClick={ctx.exportToCSV}>
              📥 Export CSV
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div style={{textAlign: 'center', padding: '40px 20px', color: '#999'}}>
            <p style={{fontSize: '16px', margin: 0}}>📭 No transactions found</p>
            <p style={{fontSize: '13px', margin: '8px 0 0 0'}}>
              {ctx.transactions.length === 0 
                ? 'Start by adding your first transaction above' 
                : 'Try adjusting your filters or search'}
            </p>
          </div>
        ) : (
          <div className="transactions-list">
            {filtered.map(t => (
              <div key={t.id} className={`tx-row ${t.type}`}>
                <div className="tx-left">
                  <div className="tx-icon">{t.type === 'income' ? '💰' : '💸'}</div>
                  <div className="tx-details">
                    <div className="tx-desc">{t.description || t.category}</div>
                    <div className="tx-meta">
                      {t.category} • {new Date(t.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className={`tx-amount ${t.type}`}>
                  {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </div>
                <div className="tx-actions">
                  <button className="btn-icon" onClick={() => startEdit(t)}>✎ Edit</button>
                  <button className="btn-icon danger" onClick={() => ctx.deleteTransaction(t.id)}>🗑 Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
