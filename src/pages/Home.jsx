import './Home.css';

function Home() {
  return (
    <div className="container home-container">
      <div className="hero">
        <h1 className="heading">Welcome to Expense Tracker</h1>
        <p className="hero-subtitle">
          Manage Your Expenses Efficiently and Effectively
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Track Expenses</h3>
          <p>View all your expenses from our comprehensive product database</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💹</div>
          <h3>Detailed Summary</h3>
          <p>Get insights with total, average, and category-wise expense breakdown</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Smart Analysis</h3>
          <p>Identify your highest and lowest expenses at a glance</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Responsive Design</h3>
          <p>Access your expense tracker from any device seamlessly</p>
        </div>
      </div>

      <div className="hero-bottom">
        <h2>Get Started</h2>
        <p className="hero-text">
          Explore your expenses, analyze spending patterns, and take control of your finances.
          Click on "Expenses" to view all items or "Summary" for detailed statistics.
        </p>
      </div>
    </div>
  );
}

export default Home;
