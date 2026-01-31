import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpenseContext } from '../App';
import './Login.css';

export default function Login(){
  const { login } = useContext(ExpenseContext);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name.trim()) return;
    login(name.trim());
    navigate('/transactions');
  };

  return (
    <div className="page-container">
      <div className="card small">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>Username</label>
          <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter a display name" />
          <button className="btn" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}
