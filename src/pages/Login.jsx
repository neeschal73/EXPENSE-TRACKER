import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ExpenseContext } from '../App';
import './Login.css';

export default function Login(){
  const ctx = useContext(ExpenseContext);
  const { login } = ctx || {};
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if(!login) {
      setError('Context not initialized');
      return;
    }
    
    if(!username.trim() || !password.trim()) {
      setError('Username and password required');
      return;
    }

    const result = login(username.trim(), password);
    if(result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign In</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label>Username</label>
          <input 
            value={username} 
            onChange={e=>setUsername(e.target.value)} 
            placeholder="Enter your username" 
          />
          <label>Password</label>
          <input 
            type="password"
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            placeholder="Enter your password" 
          />
          <button className="btn-primary" type="submit">Sign In</button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
