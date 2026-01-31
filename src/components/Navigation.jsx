import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ExpenseContext } from '../App';
import './Navigation.css';

function Navigation() {
  const { user, logout } = useContext(ExpenseContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="white"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="white"/>
          </svg>
          <h1>Expense Tracker</h1>
        </Link>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? '✕' : '☰'}
        </button>
        <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              Home
            </NavLink>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/transactions" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
                  Transactions
                </NavLink>
              </li>
            </>
          )}
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <div className="nav-auth-mobile">
            {user ? (
              <button className="btn-logout" onClick={() => { logout(); closeMenu(); }}>
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="nav-link btn-register" onClick={closeMenu}>
                  Register
                </Link>
              </>
            )}
          </div>
        </ul>
        <div className="nav-auth-desktop">
          {user ? (
            <>
              <span className="nav-user">Welcome, {user.name}</span>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link btn-register">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
