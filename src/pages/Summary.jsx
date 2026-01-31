import { useState, useEffect } from 'react';
import {
  fetchProducts,
  calculateTotalExpense,
  calculateAverageExpense,
  getHighestExpense,
  getLowestExpense,
} from '../services/expenseService';
import './Summary.css';

function Summary() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load summary data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div className="loading">Loading summary...</div>;
  if (error) return <div className="error">{error}</div>;

  const totalExpense = calculateTotalExpense(products);
  const averageExpense = calculateAverageExpense(products);
  const highestExpense = getHighestExpense(products);
  const lowestExpense = getLowestExpense(products);

  // Group by category
  const categorized = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  const categoryStats = Object.entries(categorized).map(([category, items]) => ({
    category,
    total: calculateTotalExpense(items),
    count: items.length,
    average: calculateAverageExpense(items),
  }));

  return (
    <div className="container">
      <h1 className="heading">Expense Summary</h1>

      <div className="summary-cards">
        <div className="summary-card total">
          <h3>Total Expenses</h3>
          <p className="amount">${totalExpense.toFixed(2)}</p>
          <span className="subtitle">Across all items</span>
        </div>

        <div className="summary-card average">
          <h3>Average Expense</h3>
          <p className="amount">${averageExpense.toFixed(2)}</p>
          <span className="subtitle">Per item</span>
        </div>

        <div className="summary-card count">
          <h3>Total Items</h3>
          <p className="amount">{products.length}</p>
          <span className="subtitle">Products tracked</span>
        </div>

        <div className="summary-card range">
          <h3>Price Range</h3>
          <p className="amount">
            ${lowestExpense?.price.toFixed(2)} - ${highestExpense?.price.toFixed(2)}
          </p>
          <span className="subtitle">Min to Max</span>
        </div>
      </div>

      {highestExpense && (
        <div className="highlight-card highest">
          <h3>💰 Highest Expense</h3>
          <div className="highlight-content">
            <img src={highestExpense.thumbnail} alt={highestExpense.title} />
            <div className="highlight-info">
              <p className="title">{highestExpense.title}</p>
              <p className="category">{highestExpense.category}</p>
              <p className="price">${highestExpense.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      {lowestExpense && (
        <div className="highlight-card lowest">
          <h3>💸 Lowest Expense</h3>
          <div className="highlight-content">
            <img src={lowestExpense.thumbnail} alt={lowestExpense.title} />
            <div className="highlight-info">
              <p className="title">{lowestExpense.title}</p>
              <p className="category">{lowestExpense.category}</p>
              <p className="price">${lowestExpense.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="category-section">
        <h2>Breakdown by Category</h2>
        <div className="category-grid">
          {categoryStats.map((stat) => (
            <div key={stat.category} className="category-card">
              <h4>{stat.category}</h4>
              <div className="stat-row">
                <span>Total:</span>
                <strong>${stat.total.toFixed(2)}</strong>
              </div>
              <div className="stat-row">
                <span>Items:</span>
                <strong>{stat.count}</strong>
              </div>
              <div className="stat-row">
                <span>Average:</span>
                <strong>${stat.average.toFixed(2)}</strong>
              </div>
              <div className="percentage">
                {((stat.total / totalExpense) * 100).toFixed(1)}% of total
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Summary;
