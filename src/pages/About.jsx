import './About.css';

function About() {
  return (
    <div className="container about-container">
      <h1 className="heading">About Expense Tracker</h1>

      <div className="about-content">
        <div className="about-section">
          <h2>📋 What is Expense Tracker?</h2>
          <p>
            Expense Tracker is a modern, responsive web application designed to help you manage and analyze 
            your expenses efficiently. Built with React and powered by the DummyJSON API, it provides 
            comprehensive tools to track, categorize, and summarize your spending patterns.
          </p>
        </div>

        <div className="about-section">
          <h2>🎯 Key Features</h2>
          <ul className="features-list">
            <li><strong>Real-time Data:</strong> Fetch live product data from the DummyJSON API</li>
            <li><strong>Expense Tracking:</strong> View and manage all expenses in an organized manner</li>
            <li><strong>Advanced Filtering:</strong> Search and sort expenses by various criteria</li>
            <li><strong>Comprehensive Summary:</strong> Get detailed analytics including total, average, highest, and lowest expenses</li>
            <li><strong>Category Breakdown:</strong> View expense distribution across different categories</li>
            <li><strong>Responsive Design:</strong> Works seamlessly on desktop, tablet, and mobile devices</li>
            <li><strong>Modern UI:</strong> Professional interface with smooth animations and intuitive navigation</li>
          </ul>
        </div>

        <div className="about-section">
          <h2>💻 Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <h4>Frontend</h4>
              <p>React 19.2.0 - Modern JavaScript library for building user interfaces</p>
            </div>
            <div className="tech-item">
              <h4>Routing</h4>
              <p>React Router DOM - Client-side routing for seamless navigation</p>
            </div>
            <div className="tech-item">
              <h4>HTTP Client</h4>
              <p>Axios - Promise-based HTTP client for API calls</p>
            </div>
            <div className="tech-item">
              <h4>Build Tool</h4>
              <p>Vite - Next generation frontend build tool</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h2>🚀 How to Use</h2>
          <ol className="instructions">
            <li><strong>Home Page:</strong> Get an overview of the application and its features</li>
            <li><strong>Expenses Page:</strong> Browse all expenses, search by name or category, and sort by various criteria</li>
            <li><strong>Summary Page:</strong> View detailed analytics including total expenses, averages, extremes, and category-wise breakdown</li>
            <li><strong>About Page:</strong> Learn more about the application and its features</li>
          </ol>
        </div>

        <div className="about-section">
          <h2>📊 Data Processing</h2>
          <p>
            This application uses <strong>JavaScript's reduce() function</strong> for all expense calculations. 
            This functional programming approach ensures efficient computation of:
          </p>
          <ul className="data-list">
            <li>Total expenses across all items</li>
            <li>Average expense per item</li>
            <li>Highest and lowest expenses</li>
            <li>Category-wise expense aggregation</li>
          </ul>
        </div>

        <div className="about-section highlight-section">
          <h2>🌐 API Source</h2>
          <p>
            <strong>Endpoint:</strong> <code>https://dummyjson.com/products</code>
          </p>
          <p>
            This application uses the public DummyJSON API to fetch product data. Each product is treated as an 
            expense item with properties including price, category, rating, and more.
          </p>
        </div>

        <div className="about-section">
          <h2>👨‍💻 Development</h2>
          <p>
            Expense Tracker is built following best practices in React development including:
          </p>
          <ul className="dev-practices">
            <li>Component-based architecture</li>
            <li>Functional components with hooks (useState, useEffect)</li>
            <li>Separation of concerns (components, pages, services)</li>
            <li>Responsive CSS with mobile-first approach</li>
            <li>Error handling and loading states</li>
            <li>Professional UI/UX design</li>
          </ul>
        </div>

        <div className="about-footer">
          <p>🎉 Start tracking your expenses today!</p>
          <p>Navigate to the Expenses page to begin managing your spending.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
