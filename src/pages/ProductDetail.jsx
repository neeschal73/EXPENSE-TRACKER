import { useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ExpenseContext } from '../App';
import './ProductDetail.css';

function ProductDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useContext(ExpenseContext);
  const { products = [], loading = false, error = null } = ctx || {};

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error">{error}</div>;

  const product = (products || []).find(p => String(p.id) === String(id));

  if (!product) return (
    <div className="container">
      <h2 className="heading">Product not found</h2>
      <p className="subheading">This product doesn't exist or may have been removed.</p>
      <div style={{textAlign: 'center', marginTop: 20}}>
        <Link to="/expenses" className="button">Back to Expenses</Link>
      </div>
    </div>
  );

  return (
    <div className="container detail-container">
      <div className="detail-grid">
        <div className="detail-media">
          <img src={product.thumbnail || product.images?.[0]} alt={product.title} loading="lazy" />
          <div className="thumb-row">
            {(product.images || []).slice(0,4).map((src, i) => (
              <img key={i} src={src} alt={`${product.title}-${i}`} loading="lazy"/>
            ))}
          </div>
        </div>

        <div className="detail-info">
          <h1 className="title">{product.title}</h1>
          <div className="meta">
            <span className="category">{product.category}</span>
            <span className="rating">⭐ {product.rating.toFixed(1)}</span>
          </div>

          <p className="price">${product.price.toFixed(2)}</p>
          <p className="description">{product.description}</p>

          <div className="specs">
            <div><strong>Stock:</strong> {product.stock}</div>
            <div><strong>Discount:</strong> {product.discountPercentage}%</div>
            <div><strong>Brand:</strong> {product.brand || '—'}</div>
          </div>

          <div className="actions">
            <button className="button" onClick={() => navigate(-1)}>Back</button>
            <Link to="/summary" className="button secondary">View Summary</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
