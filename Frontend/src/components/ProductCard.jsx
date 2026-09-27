import React, { useContext, useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { useAlert } from '../../Context/AlertContext';

const ProductCard = ({ item }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { showAlert } = useAlert();
  const { cartItems, addToCart, quantityDecrease, quantityIncrease } = useContext(cartContext);

  const cartItem = cartItems?.find(
    (cItem) => cItem.product._id === item?._id || cItem.product.id === item?._id
  );
  const isInCart = Boolean(cartItem);
  const currentQuantity = cartItem ? cartItem.quantity : 1;

  const isOutOfStock = item.stock <= 0;
  const isLowStock = item.stock > 0 && item.stock <= 5;
  const discount = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  async function handleAddToCart(id) {
    const result = await addToCart(id);
    if (result.success) {
      showAlert(result.message, "success");
    } else {
      showAlert(result.message, "error");
    }
  }

  async function handleQuantityIncrease(id, currentQuantity) {
    const result = await quantityIncrease(id, currentQuantity);
    if (result && !result.success) {
      showAlert(result.message, "error");
    }
  }

  async function handleQuantityDecrease(id, currentQuantity) {
    const result = await quantityDecrease(id, currentQuantity);
    if (result && !result.success) {
      showAlert(result.message, "error");
    }
  }

  return (
    <>
      <style>{`
        .product-card {
          position: relative;
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #eef2f6;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          height: 100%;
          box-sizing: border-box;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        .image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1; /* Fixed 220px ki jagah clean responsive square */
          background-color: #f8fafc;
          overflow: hidden;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .product-card:hover .product-img {
          transform: scale(1.05);
        }

        .card-actions {
          position: absolute;
          top: 8px;
          right: 8px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 2;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(0,0,0,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #475569;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: transform 0.15s ease, color 0.15s ease;
        }

        .action-btn:hover {
          transform: scale(1.08);
          color: #0f172a;
        }

        .action-btn.active {
          color: #ef4444;
        }

        .badge-container {
          position: absolute;
          top: 8px;
          left: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 2;
        }

        .badge {
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.03em;
          text-transform: uppercase;
        }

        .badge-new { background: #4f46e5; color: #ffffff; }
        .badge-low-stock { background: #fff7ed; color: #ea580c; border: 1px solid #ffedd5; }
        .badge-out-stock { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }

        .card-content {
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }

        .rating-box { 
          display: flex; 
          align-items: center; 
          gap: 4px; 
          font-size: 0.78rem; 
        }

        .stars-row { 
          display: flex; 
          align-items: center; 
          color: #f59e0b; 
          font-weight: 700;
        }

        .reviews-count { 
          color: #94a3b8; 
          font-size: 0.75rem; 
        }

        .product-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.35;
          min-height: 2.7em;
          margin: 0;
        }

        .price-row { 
          display: flex; 
          align-items: baseline; 
          flex-wrap: wrap;
          gap: 4px 6px; 
          margin-top: auto; 
          padding-top: 4px;
        }

        .current-price { 
          font-size: 1.05rem; 
          font-weight: 800; 
          color: #0f172a; 
        }

        .original-price { 
          font-size: 0.8rem; 
          color: #94a3b8; 
          text-decoration: line-through; 
        }

        .discount-percent { 
          font-size: 0.72rem; 
          font-weight: 700; 
          color: #16a34a; 
        }

        .card-footer { 
          padding: 0 0.85rem 0.85rem; 
        }

        .cart-btn {
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1.5px solid #4f46e5;
          background: transparent;
          color: #4f46e5;
          font-size: 0.84rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cart-btn:hover:not(:disabled) { 
          background: #4f46e5; 
          color: #ffffff; 
        }

        .cart-btn:disabled { 
          border-color: #e2e8f0; 
          color: #94a3b8; 
          background: #f1f5f9; 
          cursor: not-allowed; 
        }

        /* Counter Styles */
        .card-quantity-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 35px;
          border: 1.5px solid #4f46e5;
          border-radius: 8px;
          overflow: hidden;
          background: #eef2ff;
          box-sizing: border-box;
        }

        .card-qty-btn {
          background: transparent;
          border: none;
          height: 100%;
          padding: 0 12px;
          cursor: pointer;
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .card-qty-btn:hover:not(:disabled) { 
          background: #4f46e5; 
          color: #ffffff; 
        }

        .card-qty-btn:disabled { 
          opacity: 0.4; 
          cursor: not-allowed; 
        }

        .card-qty-value {
          font-weight: 700;
          font-size: 0.9rem;
          color: #4f46e5;
        }

        /* Mobile Adjustments (2 Cards Side by Side) */
        @media (max-width: 580px) {
          .card-content {
            padding: 0.65rem;
            gap: 4px;
          }

          .card-footer {
            padding: 0 0.65rem 0.65rem;
          }

          .product-title {
            font-size: 0.82rem;
            line-height: 1.3;
            min-height: 2.6em;
          }

          .current-price {
            font-size: 0.95rem;
          }

          .original-price {
            font-size: 0.72rem;
          }

          .discount-percent {
            font-size: 0.68rem;
          }

          .cart-btn {
            padding: 6px 8px;
            font-size: 0.78rem;
            border-radius: 6px;
            gap: 4px;
          }

          .action-btn {
            width: 28px;
            height: 28px;
          }

          .card-quantity-selector {
            height: 31px;
            border-radius: 6px;
          }

          .card-qty-btn {
            padding: 0 8px;
          }

          .badge {
            padding: 2px 6px;
            font-size: 0.62rem;
          }
        }
      `}</style>

      <div className="product-card">
        <div className="image-container">
          <Link to={`/product/${item._id}`}>
            <img src={item.image} alt={item.name} className="product-img" loading="lazy" />
          </Link>
          <div className="badge-container">
            {item.isNew && !isOutOfStock && <span className="badge badge-new">NEW</span>}
            {isOutOfStock && <span className="badge badge-out-stock">Out of Stock</span>}
            {isLowStock && <span className="badge badge-low-stock">Only {item.stock} Left</span>}
          </div>

          <div className="card-actions">
            <button
              type="button"
              className={`action-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
              aria-label="Wishlist"
            >
              <Heart size={15} fill={isWishlisted ? "#ef4444" : "none"} />
            </button>
            <Link to={`/product/${item._id}`} className="action-btn" aria-label="View product">
              <Eye size={15} />
            </Link>
          </div>
        </div>

        <div className="card-content">
          <div className="rating-box">
            <div className="stars-row">
              <Star size={12} fill="#f59e0b" stroke="none" />
              <span style={{ marginLeft: 3 }}>{item.rating || '4.5'}</span>
            </div>
            {item.reviewsCount && <span className="reviews-count">({item.reviewsCount})</span>}
          </div>

          <h3 className="product-title" title={item.name}>{item.name}</h3>

          <div className="price-row">
            <span className="current-price">₹{item.price?.toLocaleString('en-IN')}</span>
            {item.originalPrice && (
              <span className="original-price">₹{item.originalPrice?.toLocaleString('en-IN')}</span>
            )}
            {discount > 0 && <span className="discount-percent">{discount}% off</span>}
          </div>
        </div>

        <div className="card-footer">
          {isInCart ? (
            <div className="card-quantity-selector">
              <button
                type="button"
                className="card-qty-btn"
                onClick={() => handleQuantityDecrease(item._id, currentQuantity)}
              >
                <Minus size={14} />
              </button>
              <span className="card-qty-value">{currentQuantity}</span>
              <button
                type="button"
                className="card-qty-btn"
                onClick={() => handleQuantityIncrease(item._id, currentQuantity)}
                disabled={currentQuantity >= item.stock}
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="cart-btn"
              disabled={isOutOfStock}
              onClick={() => handleAddToCart(item._id)}
            >
              <ShoppingCart size={15} />
              <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;