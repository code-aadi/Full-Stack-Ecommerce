import React, { useContext, useState } from 'react';
import '../styles/cart.css';
import { cartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../Context/AlertContext';
import EmptyState from '../components/EmptyState';
import Loader from '../components/Loader';

export default function Cart() {
  const { cartItems, quantityIncrease, quantityDecrease, removeFromCart, clearCart } = useContext(cartContext);
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const subTotal = cartItems.reduce((acc, cart) => acc + cart.quantity * cart.product.price, 0);
  const tax = (subTotal * 18) / 100;
  const total = subTotal + tax;

  const formatINR = (value) =>
    value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (loading) {
    return (
      <div style={{height : "60vh", display : "flex", justifyContent : "center"}}><Loader text='Loading Your Cart'/></div>
    );
  }

  if (cartItems.length === 0) {
    return <EmptyState type="cart" buttonLink="/" />;
  }

  async function handleRemoveFromCart(id) {
    const result = await removeFromCart(id);
    if (!result.success) {
      showAlert(result.message, 'error');
    }
  }

  async function handleQuantityIncrease(id, currentQuantity) {
    const result = await quantityIncrease(id, currentQuantity);
    if (!result.success) {
      showAlert(result.message, 'error');
    }
  }

  async function handleQuantityDecrease(id, currentQuantity) {
    const result = await quantityDecrease(id, currentQuantity);
    if (!result.success) {
      showAlert(result.message, 'error');
    }
  }

  return (
    <div className="cart-page">
      <div className="cart-page__inner">
        <header className="cart-page__header">
          <h1 className="cart-page__title">
            Your Cart<span className="cart-page__count">({cartItems.length} items)</span>
          </h1>
          <a href="#shop" className="cart-page__continue">
            ← Continue shopping
          </a>
        </header>

        <div className="cart-page__toolbar">
          <button
            type="button"
            className="cart-clear"
            onClick={clearCart}
            aria-label="Clear all items from cart"
          >
            <span className="cart-clear__icon">🗑️</span>
            <span className="cart-clear__text">Clear cart</span>
          </button>
        </div>

        <div className="cart-layout">
          {/* Left: cart items */}
          <section className="cart-items">
            {cartItems?.map((item) => {
              const isMaxStock = item.product.stock === item.quantity;

              return (
                <div
                  className={`cart-item${isMaxStock ? ' cart-item--out-of-stock' : ''}`}
                  key={item.product._id}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item__image"
                  />

                  <div className="cart-item__body">
                    <h3 className="cart-item__title">{item.product.name}</h3>
                    <p className="cart-item__category">{item.product.category}</p>
                    <span className="cart-item__price">
                      ₹{item?.product?.price?.toLocaleString('en-IN')}
                    </span>
                    {isMaxStock && <p className="cart-item__badge">Out of stock</p>}
                  </div>

                  <div className="cart-item__footer">
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        aria-label="Decrease quantity"
                        disabled={item.quantity === 1}
                        onClick={() => handleQuantityDecrease(item.product._id, item.quantity)}
                      >
                        −
                      </button>
                      <span className="cart-item__qty-count">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        disabled={isMaxStock}
                        aria-label="Increase quantity"
                        onClick={() => handleQuantityIncrease(item.product._id, item.quantity)}
                      >
                        +
                      </button>
                    </div>

                    <div className="cart-item__total">
                      ₹{formatINR(item.product.price * item.quantity)}
                    </div>

                    <button
                      className="cart-item__remove"
                      title="Remove item"
                      aria-label="Remove item"
                      onClick={() => handleRemoveFromCart(item.product._id)}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Right: order summary */}
          <aside className="cart-summary">
            <h2 className="cart-summary__title">Order summary</h2>

            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>₹{formatINR(subTotal)}</span>
            </div>

            <div className="cart-summary__row">
              <span>Estimated shipping</span>
              <span className="cart-summary__free">FREE</span>
            </div>

            <div className="cart-summary__row">
              <span>Tax (18% GST)</span>
              <span>₹{formatINR(tax)}</span>
            </div>

            <div className="cart-summary__promo">
              <input
                type="text"
                className="cart-summary__promo-input"
                placeholder="Promo code"
              />
              <button type="button" className="cart-summary__promo-btn">
                Apply
              </button>
            </div>

            <hr className="cart-summary__divider" />

            <div className="cart-summary__total">
              <span>Total</span>
              <span>₹{formatINR(total)}</span>
            </div>

            <button
              onClick={() => navigate('/userAddress')}
              type="button"
              className="cart-summary__checkout"
            >
              Proceed to checkout →
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}