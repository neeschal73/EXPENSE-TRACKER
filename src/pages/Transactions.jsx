import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../App';
import './Transactions.css';

export default function Transactions(){
  const { transactions, addTransaction, editTransaction, deleteTransaction, totalIncome, totalExpense, currentBalance } = useContext(ExpenseContext);
  const [form, setForm] = useState({ type: 'expense', amount: '', category: '', description: '', date: new Date().toISOString().slice(0,10) });

  const submit = (e) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if(!amount || amount <= 0) return;
    addTransaction({ ...form, amount });
    setForm({ type: 'expense', amount: '', category: '', description: '', date: new Date().toISOString().slice(0,10) });
  };

  return (
    <div className="page-container">
      <div className="grid">
        <section className="card">
          <h3>Add Transaction</h3>
          <form onSubmit={submit} className="form">
            <label>Type</label>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <label>Amount</label>
            <input value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="0.00" />
            <label>Category</label>
            <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g. Food" />
            <label>Date</label>
            <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
            <label>Description</label>
            <input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
            <button className="btn" type="submit">Add</button>
          </form>
        </section>

        <section className="card">
          <h3>Summary</h3>
          <p><strong>Income:</strong> ${totalIncome().toFixed(2)}</p>
          <p><strong>Expenses:</strong> ${totalExpense().toFixed(2)}</p>
          <p><strong>Balance:</strong> ${currentBalance().toFixed(2)}</p>
        </section>
      </div>

      <section className="card">
        <h3>Transactions</h3>
        {transactions.length === 0 ? (
          <p>No transactions yet.</p>
        ) : (
          <ul className="tx-list">
            {transactions.map(t=> (
              <li key={t.id} className="tx-item">
                <div>
                  <div className="tx-title">{t.description || t.category || (t.type === 'income' ? 'Income' : 'Expense')}</div>
                  <div className="tx-meta">{t.category} • {new Date(t.date).toLocaleDateString()}</div>
                </div>
                <div className={"tx-amount "+(t.type==='income'?'plus':'minus')}>${Number(t.amount).toFixed(2)}</div>
                <div className="tx-actions">
                  <button className="btn-small" onClick={()=>deleteTransaction(t.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
