import React, { useContext, useState } from 'react';
import { ShoppingCart, Heart, Eye, Star, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

const ProductCard = ({ item }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { cartItems, addToCart, quantityDecrease, quantityIncrease, removeFromCart } = useContext(cartContext);

  // Check karein ki product pehle se cart me hai ya nahi
  const cartItem = cartItems?.find((cItem) => cItem.product._id === item?._id || cItem.product.id === item?._id);
  const isInCart = Boolean(cartItem);
  const currentQuantity = cartItem ? cartItem.quantity : 1;

  const isOutOfStock = item.stock <= 0;
  const isLowStock = item.stock > 0 && item.stock <= 5;
  const discount = item.originalPrice 
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100) 
    : 0;

  // Handlers (aap custom logic add kar sakte hain)


  return (
    <>
      <style>{`
        .product-card {
          position: relative;
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #f3f4f6;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.03);
        }

        .product-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
          border-color: #e5e7eb;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 220px;
          background-color: #f9fafb;
          overflow: hidden;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-img {
          transform: scale(1.06);
        }

        .card-actions {
          position: absolute;
          top: 10px;
          right: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 2;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #4b5563;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .action-btn.active {
          color: #ef4444;
        }

        .badge-container {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          z-index: 2;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .badge-new { background: #4f46e5; color: #ffffff; }
        .badge-low-stock { background: #fff7ed; color: #ea580c; border: 1px solid #ffedd5; }
        .badge-out-stock { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }

        .card-content {
          padding: 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }

        .rating-box { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; }
        .stars-row { display: flex; align-items: center; color: #f59e0b; }
        .reviews-count { color: #9ca3af; }

        .product-title {
          font-size: 0.98rem;
          font-weight: 600;
          color: #111827;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
          height: 2.8em;
        }

        .price-row { display: flex; align-items: baseline; gap: 8px; margin-top: auto; }
        .current-price { font-size: 1.2rem; font-weight: 800; color: #111827; }
        .original-price { font-size: 0.88rem; color: #9ca3af; text-decoration: line-through; }
        .discount-percent { font-size: 0.78rem; font-weight: 700; color: #16a34a; margin-left: auto; }

        .card-footer { padding: 0 1.1rem 1.1rem; }

        .cart-btn {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1.5px solid #4f46e5;
          background: transparent;
          color: #4f46e5;
          font-size: 0.9rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cart-btn:hover:not(:disabled) { background: #4f46e5; color: #ffffff; }
        .cart-btn:disabled { border-color: #e5e7eb; color: #9ca3af; background: #f3f4f6; cursor: not-allowed; }

        /* Counter Styles */
        .card-quantity-selector {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: 1.5px solid #4f46e5;
          border-radius: 10px;
          overflow: hidden;
          background: #eef2ff;
        }

        .card-qty-btn {
          background: transparent;
          border: none;
          padding: 8px 14px;
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
          opacity: 0.5;
          cursor: not-allowed;
        }

        .card-qty-value {
          font-weight: 700;
          font-size: 0.95rem;
          color: #4f46e5;
        }
      `}</style>

      <div className="product-card">
        <div className="image-container">
          <Link to={`/product/${item._id}`}> 
            <img src={item.image} onLoad={() => console.log("image Loaded")} alt={item.name} className="product-img" loading="lazy" />
          </Link>
          <div className="badge-container">
            {item.isNew && !isOutOfStock && <span className="badge badge-new">NEW</span>}
            {isOutOfStock && <span className="badge badge-out-stock">Out of Stock</span>}
            {isLowStock && <span className="badge badge-low-stock">Only {item.stock} Left</span>}
          </div>

          <div className="card-actions">
            <button 
              className={`action-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart size={18} fill={isWishlisted ? "#ef4444" : "none"} />
            </button>
            <button className="action-btn"><Eye size={18} /></button>
          </div>
        </div>

        <div className="card-content">
          <div className="rating-box">
            <div className="stars-row">
              <Star size={14} fill="#f59e0b" stroke="none" />
              <span style={{ fontWeight: 700, marginLeft: 3 }}>{item.rating}</span>
            </div>
            {item.reviewsCount && <span className="reviews-count">({item.reviewsCount})</span>}
          </div>

          <h3 className="product-title">{item.name}</h3>

          <div className="price-row">
            <span className="current-price">₹{item.price.toLocaleString('en-IN')}</span>
            {item.originalPrice && <span className="original-price">₹{item.originalPrice.toLocaleString('en-IN')}</span>}
            {discount > 0 && <span className="discount-percent">{discount}% OFF</span>}
          </div>
        </div>

        <div className="card-footer">
          {isInCart ? (
            /* Jab Item Cart me hai -> (+ / -) Quantity Counter dikhega */
            <div className="card-quantity-selector">
              <button className="card-qty-btn" onClick={()=> quantityDecrease(item._id, currentQuantity)}>
                <Minus size={16} />
              </button>
              <span className="card-qty-value">{currentQuantity}</span>
              <button 
                className="card-qty-btn" 
                onClick={()=> quantityIncrease(item._id, currentQuantity)} 
                disabled={currentQuantity >= item.stock}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            /* Jab Item Cart me nahi hai -> Add to Cart Button dikhega */
            <button className="cart-btn" disabled={isOutOfStock} onClick={() => addToCart(item._id)}>
              <ShoppingCart size={17} />
              <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;