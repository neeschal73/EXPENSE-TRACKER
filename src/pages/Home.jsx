import './Home.css';
import { useContext, useMemo, useState } from 'react';
import { ExpenseContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const ctx = useContext(ExpenseContext);
  const navigate = useNavigate();
  const userName = ctx?.user?.name || '';

  const todayKey = new Date().toISOString().slice(0, 10);
  const todaysSpending = useMemo(() => {
    if (!ctx?.transactions) return 0;
    return ctx.transactions
      .filter(t => t.type === 'expense' && new Date(t.date).toISOString().slice(0,10) === todayKey)
      .reduce((s, t) => s + Number(t.amount || 0), 0);
  }, [ctx?.transactions]);

  const catTotals = ctx?.categoryTotals ? ctx.categoryTotals() : {};
  const topCategory = useMemo(() => {
    const entries = Object.entries(catTotals || {});
    if (!entries.length) return '—';
    entries.sort((a,b) => b[1] - a[1]);
    return entries[0][0];
  }, [catTotals]);

  const totalBudget = useMemo(() => Object.values(ctx?.budgets || {}).reduce((s,v)=>s+Number(v||0),0), [ctx?.budgets]);
  const remainingBudget = Math.max(0, (totalBudget || 0) - (ctx?.totalExpense ? ctx.totalExpense() : 0));

  // simple streak calculation: consecutive days with transactions up to today
  const streak = useMemo(() => {
    if(!ctx?.transactions) return 0;
    const dates = Array.from(new Set(ctx.transactions.map(t => new Date(t.date).toISOString().slice(0,10))));
    dates.sort((a,b)=>b.localeCompare(a));
    let s = 0; let cur = new Date();
    while (true) {
      const d = cur.toISOString().slice(0,10);
      if (dates.includes(d)) { s++; cur.setDate(cur.getDate()-1); } else break;
    }
    return s;
  }, [ctx?.transactions]);

  const [q, setQ] = useState('');
  const handleSearch = (e) => {
    e.preventDefault();
    if (!q) return navigate('/transactions');
    navigate(`/transactions?q=${encodeURIComponent(q)}`);
  };

  const giveFeedback = () => {
    const msg = prompt('Share your feedback or suggestion:');
    if (msg) {
      const stored = JSON.parse(localStorage.getItem('et_feedback') || '[]');
      stored.unshift({ text: msg, date: new Date().toISOString(), user: userName || 'guest' });
      localStorage.setItem('et_feedback', JSON.stringify(stored));
      alert('Thanks for your feedback!');
    }
  };

  return (
    <div className="home-page">
      <header className="hero-hero">
        <div className="hero-inner container">
          <h1 className="hero-title">{ctx?.user ? `Welcome back, ${ctx.user.name}!` : 'Welcome to Expense Tracker'}</h1>
          <p className="hero-sub">Easily Manage Your Expenses and Track Your Spending</p>

          <div className="hero-actions">
            <Link to="/transactions" className="btn btn-primary" aria-label="Add Expense">Add Expense</Link>
            <Link to="/about#demo" className="btn btn-outline" aria-label="Take a tour">Take the tour</Link>
          </div>

          <form className="hero-search" onSubmit={handleSearch} role="search">
            <div className="search-wrap">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search transactions or reports..." aria-label="Search" />
              <span className="search-icon">🔎</span>
            </div>
            <button type="submit">Search</button>
            {q && <button type="button" className="btn small outline" onClick={() => setQ('')}>Clear</button>}
          </form>
        </div>
      </header>

      <main className="container">
        <div className="main-card">
        <section className="features-row">
          <Link to="/transactions" className="feature clickable feature-link" onClick={() => {}}>
            <div className="feature-icon">📊</div>
            <h3>Track Expenses</h3>
            <p>View and manage all your expenses</p>
            <span className="feature-cta">Open</span>
          </Link>

          <Link to="/summary" className="feature clickable feature-link">
            <div className="feature-icon">💹</div>
            <h3>Detailed Summary</h3>
            <p>Get insights with monthly reports</p>
            <span className="feature-cta">Open</span>
          </Link>

          <Link to="/reports" className="feature clickable feature-link">
            <div className="feature-icon">🔍</div>
            <h3>Smart Analysis</h3>
            <p>Identify spending patterns</p>
            <span className="feature-cta">Open</span>
          </Link>

          <Link to="/about" className="feature clickable feature-link">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works seamlessly on all devices</p>
            <span className="feature-cta">Open</span>
          </Link>
        </section>

        <section className="quick-stats">
          <div className="stat-card">
              <div className="stat-top"><span className="stat-icon">💸</span><div className="stat-title">Today's Spending <span className="tooltip" tabIndex="0">ℹ<span className="tooltiptext">Amount spent today</span></span></div></div>
            <div className="stat-value">${todaysSpending.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span className="stat-icon">🏷️</span><div className="stat-title">Top Category <span className="tooltip" tabIndex="0">ℹ<span className="tooltiptext">Category with highest expenses</span></span></div></div>
            <div className="stat-value">{topCategory}</div>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span className="stat-icon">🎯</span><div className="stat-title">Remaining Budget <span className="tooltip" tabIndex="0">ℹ<span className="tooltiptext">Budget left across categories</span></span></div></div>
            <div className="stat-value">${remainingBudget.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-top"><span className="stat-icon">🔥</span><div className="stat-title">Streak <span className="tooltip" tabIndex="0">ℹ<span className="tooltiptext">Consecutive days with activity</span></span></div></div>
            <div className="stat-value">{streak} days</div>
          </div>
        </section>

        <section className="preview-and-badges">
          <div className="previews">
            <div className="device device-phone">Mobile Preview</div>
            <div className="device device-tablet">Tablet Preview</div>
            <div className="device device-desktop">Desktop Preview</div>
          </div>

          <aside className="badges">
            <h4>Achievements</h4>
            <ul>
              <li className="badge">Budget Beginner</li>
              <li className="badge">3-Day Streak</li>
              <li className="badge">First Export</li>
            </ul>
            <div className="links">
              <button className="btn small" onClick={() => navigate('/about#tutorial')}>Demo / Tutorial</button>
              <button className="btn small outline" onClick={giveFeedback}>Send Feedback</button>
            </div>
          </aside>
        </section>
        </div>
      </main>

      <button className="feedback-fab" title="Send feedback" onClick={giveFeedback}>💬</button>
    </div>
  );
}

export default Home;
