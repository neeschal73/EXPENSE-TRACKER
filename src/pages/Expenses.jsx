import { useState, useContext } from 'react';
import { ExpenseContext } from '../App';
import './Expenses.css';

function Expenses() {
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  const { products: ctxProducts, loading: ctxLoading, error: ctxError } = useContext(ExpenseContext);

  const filteredProducts = (ctxProducts || []).filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortBy === 'price-asc') {
      return a.price - b.price;
    } else if (sortBy === 'price-desc') {
      return b.price - a.price;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  if (ctxLoading) return <div className="loading">Loading expenses...</div>;
  if (ctxError) return <div className="error">{ctxError}</div>;

  return (
    <div className="container">
      <h1 className="heading">All Expenses</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search expenses by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="name">Sort by Name</option>
          <option value="price-asc">Sort by Price (Low to High)</option>
          <option value="price-desc">Sort by Price (High to Low)</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="no-data">No expenses found matching your search.</div>
      ) : (
        <>
          <div className="expense-stats">
            <p>Total Expenses: <strong>{sortedProducts.length}</strong></p>
          </div>
          <div className="expenses-grid">
            {sortedProducts.map((product) => (
              <div key={product.id} className="expense-card">
                <img src={product.thumbnail} alt={product.title} className="expense-image" />
                <div className="expense-content">
                  <h3>{product.title}</h3>
                  <p className="category">{product.category}</p>
                  <p className="description">{product.description}</p>
                  <div className="expense-footer">
                    <div className="price">${product.price.toFixed(2)}</div>
                    <div className="rating">⭐ {product.rating.toFixed(1)}</div>
                  </div>
                  <div className="discount">
                    <span>Stock: {product.stock}</span>
                    <span className="discount-percent">-{product.discountPercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Expenses;
