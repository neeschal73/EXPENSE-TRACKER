import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ExpenseContext } from '../App';
import './Register.css';

export default function Register(){
  const ctx = useContext(ExpenseContext);
  const { register } = ctx || {};
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if(!register) {
      setError('Context not initialized');
      return;
    }
    
    if(!form.username.trim() || !form.password.trim()) {
      setError('Username and password required');
      return;
    }
    if(form.password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if(form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const result = register(form.username.trim(), form.password);
    if(result.success) {
      navigate('/transactions');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        {error && <div className="error-msg">{error}</div>}
        <form onSubmit={handleSubmit} className="form">
          <label>Username</label>
          <input 
            value={form.username} 
            onChange={e=>setForm({...form,username:e.target.value})} 
            placeholder="Enter username" 
          />
          <label>Password</label>
          <input 
            type="password"
            value={form.password} 
            onChange={e=>setForm({...form,password:e.target.value})} 
            placeholder="Enter password" 
          />
          <label>Confirm Password</label>
          <input 
            type="password"
            value={form.confirmPassword} 
            onChange={e=>setForm({...form,confirmPassword:e.target.value})} 
            placeholder="Confirm password" 
          />
          <button className="btn-primary" type="submit">Register</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
