import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ExternalLink, ShieldCheck, Truck, RotateCcw, Minus, Plus } from 'lucide-react';
import { cartContext } from '../../Context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log(id);

  // DB Fields ke anusar State
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const { cartItems, addToCart, quantityDecrease, quantityIncrease, removeFromCart } = useContext(cartContext);

  
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check karein ki product pehle se cart me hai ya nahi
  const cartItem = cartItems?.find((item) => item._id === id || item.id === id);
  const isInCart = Boolean(cartItem);
  const currentQuantity = cartItem ? cartItem.quantity : 1;
console.log(cartItems)
  // API Call to Fetch Product by ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:2310/api/products/id/${id}`);
        const data = await response.json();

        setProduct(data.product);
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError('Product load nahi ho paya. Kripya dobara try karein.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductDetails();
  }, [id]);


console.log(product)
 
  const handleAddToCart = () => {
    if (addToCart && product) {
      addToCart(product._id);
    }
  };

  return (
    <>
      <style>{`
        .pdp-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }

        /* Breadcrumbs */
        .breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: #6b7280;
          margin-bottom: 2rem;
          text-transform: capitalize;
        }

        .breadcrumbs a {
          color: #4f46e5;
          text-decoration: none;
        }

        .breadcrumbs a:hover {
          text-decoration: underline;
        }

        /* Layout Grid */
        .pdp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (max-width: 868px) {
          .pdp-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Image Section */
        .image-wrapper {
          position: relative;
          background-color: #f9fafb;
          border-radius: 20px;
          border: 1px solid #f3f4f6;
          overflow: hidden;
          padding: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
        }

        .main-product-img {
          max-width: 100%;
          max-height: 480px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .main-product-img:hover {
          transform: scale(1.03);
        }

        /* Details Section */
        .details-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .category-capsule {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #4f46e5;
          background: #eef2ff;
          padding: 4px 12px;
          border-radius: 20px;
          width: fit-content;
          text-transform: uppercase;
        }

        .product-name-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #111827;
          line-height: 1.3;
        }

        /* Rating & Reviews */
        .rating-reviews-bar {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stars-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          background-color: #fef3c7;
          color: #d97706;
          padding: 4px 10px;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .total-ratings-text {
          font-size: 0.88rem;
          color: #6b7280;
        }

        /* Price Section */
        .price-section {
          display: flex;
          align-items: baseline;
          gap: 12px;
          border-y: 1px solid #f3f4f6;
          padding: 0.8rem 0;
        }

        .price-tag {
          font-size: 2.2rem;
          font-weight: 800;
          color: #111827;
        }

        /* Stock Status */
        .stock-badge {
          font-size: 0.85rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          width: fit-content;
        }

        .in-stock { background: #ecfdf5; color: #059669; }
        .low-stock { background: #fff7ed; color: #ea580c; }
        .out-of-stock { background: #fef2f2; color: #dc2626; }

        /* Description */
        .description-box {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.6;
          background-color: #fafafa;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
        }

        /* Actions (Quantity & Buttons) */
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          width: fit-content;
          overflow: hidden;
          background: #f9fafb;
        }

        .qty-btn {
          background: #f9fafb;
          border: none;
          padding: 12px 16px;
          cursor: pointer;
          color: #374151;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .qty-btn:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .qty-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .qty-value {
          padding: 0 16px;
          font-weight: 700;
          font-size: 1rem;
          color: #111827;
        }

        .buttons-row {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-add-to-cart {
          flex: 1;
          background: #4f46e5;
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
          transition: all 0.2s;
        }

        .btn-add-to-cart:hover:not(:disabled) {
          background: #4338ca;
          transform: translateY(-2px);
        }

        .btn-add-to-cart:disabled {
          background: #9ca3af;
          box-shadow: none;
          cursor: not-allowed;
        }

        .btn-wishlist {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          border: 1.5px solid #e5e7eb;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #4b5563;
          transition: all 0.2s;
        }

        .btn-wishlist:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .btn-wishlist.active {
          color: #ef4444;
          background: #fef2f2;
          border-color: #fecaca;
        }

        /* External Product Link */
        .external-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #4f46e5;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          margin-top: 0.2rem;
        }

        .external-link-btn:hover {
          text-decoration: underline;
        }

        /* Value Props / Benefits */
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: #4b5563;
          font-weight: 500;
        }
      `}</style>

      <div className="pdp-container">
        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#4f46e5', fontWeight: 600 }}>
            Loading Product Details...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#dc2626' }}>
            <h2>{error}</h2>
            <Link to="/" style={{ color: '#4f46e5', marginTop: '1rem', display: 'inline-block' }}>
              Back to Store
            </Link>
          </div>
        )}

        {/* Success / Product Render State */}
        {!loading && !error && product && (
          <>
            {/* Breadcrumbs */}
            <div className="breadcrumbs">
              <Link to="/">Home</Link> / 
              <Link to={`/category/${product.category}`}>{product.category}</Link> / 
              <span>{product.subcategory}</span>
            </div>

            {/* Main Product Grid */}
            <div className="pdp-grid">
              {/* Left Column: Image */}
              <div className="image-wrapper">
                <img src={product.image} alt={product.name} className="main-product-img" />
              </div>

              {/* Right Column: Details */}
              <div className="details-wrapper">
                <div className="category-capsule">
                  <span>{product.category}</span> • <span>{product.subcategory}</span>
                </div>

                <h1 className="product-name-title">{product.name}</h1>

                <div className="rating-reviews-bar">
                  <div className="stars-badge">
                    <Star size={16} fill="#d97706" stroke="none" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="total-ratings-text">
                    ({product.totalRatings} customer ratings)
                  </span>
                </div>

                <div className="price-section">
                  <span className="price-tag">${product.price}</span>
                </div>

                <div>
                  {product.stock > 5 ? (
                    <span className="stock-badge in-stock">In Stock ({product.stock} available)</span>
                  ) : product.stock > 0 ? (
                    <span className="stock-badge low-stock">Hurry, only {product.stock} left in stock!</span>
                  ) : (
                    <span className="stock-badge out-of-stock">Out of Stock</span>
                  )}
                </div>

                <div className="description-box">
                  <p style={{ fontWeight: 600, color: '#111827', marginBottom: '4px' }}>Product Overview:</p>
                  {product.description}
                </div>

                {/* Conditional Render: Cart Actions */}
                {product.stock > 0 && (
                  <div className="buttons-row" style={{ marginTop: '0.5rem' }}>
                    {isInCart ? (
                      /* Jab Cart me hai -> Counter dikhega */
                      <div className="quantity-selector">
                        <button className="qty-btn" onClick={()=> quantityDecrease(product._id)}>
                          <Minus size={16} />
                        </button>
                        <span className="qty-value">{currentQuantity}</span>
                        <button
                          className="qty-btn"
                          onClick={()=> quantityIncrease(product._id)}
                          disabled={currentQuantity >= product.stock}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      /* Jab Cart me nahi hai -> Add To Cart Button dikhega */
                      <button className="btn-add-to-cart" onClick={handleAddToCart}>
                        <ShoppingCart size={20} />
                        <span>Add to Cart</span>
                      </button>
                    )}

                    <button
                      className={`btn-wishlist ${isWishlisted ? 'active' : ''}`}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      title="Add to Wishlist"
                    >
                      <Heart size={20} fill={isWishlisted ? '#ef4444' : 'none'} />
                    </button>
                  </div>
                )}

                {product.url && (
                  <a href={product.url} target="_blank" rel="noopener noreferrer" className="external-link-btn">
                    <span>View original product link</span>
                    <ExternalLink size={14} />
                  </a>
                )}

                <div className="benefits-grid">
                  <div className="benefit-item">
                    <ShieldCheck size={18} color="#4f46e5" />
                    <span>100% Authentic</span>
                  </div>
                  <div className="benefit-item">
                    <Truck size={18} color="#4f46e5" />
                    <span>Fast Delivery</span>
                  </div>
                  <div className="benefit-item">
                    <RotateCcw size={18} color="#4f46e5" />
                    <span>7 Days Return</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;