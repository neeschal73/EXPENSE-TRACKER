import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ExpenseContext } from '../App';
import './Navigation.css';

function Navigation() {
  const ctx = useContext(ExpenseContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          💰 Expense Tracker
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/expenses" className="nav-link">Expenses</Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link">Transactions</Link>
          </li>
          <li className="nav-item">
            <Link to="/summary" className="nav-link">Summary</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
        </ul>
        <div className="nav-auth">
          {ctx.user ? (
            <>
              <span className="nav-user">Hello, {ctx.user.name}</span>
              <button className="btn-link" onClick={ctx.logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
