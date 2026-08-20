import React, { useContext, useEffect, useState } from 'react';
import '../styles/cart.css';
import { cartContext } from '../../Context/CartContext';


export default function Cart() {
 
  const {cartItems, quantityIncrease , quantityDecrease , removeFromCart, clearCart} = useContext(cartContext)

const [loading, setLoading] = useState(false)
const cartItemsObj = {}
cartItems?.forEach(item => {
  cartItemsObj[item.product._id] = item.quantity
});
const subTotal = cartItems.reduce((acc,cart) => acc + cart.product.quantity * cart.product.price, 0)
const tax = subTotal * 18 / 100



if(loading){
  return <h1>Data is Loading. Please Wait</h1>
}

  return (
    <div className="cart-container">
      {/* Header */}
      <header className="cart-header">
        <h1>
          Your Shopping Cart <span>({cartItems.length} Items)</span>
        </h1>
        <a href="#shop" className="continue-shopping">
          ← Continue Shopping
        </a>
      </header>
  <button 
      type="button" 
      className="cart-clear-btn" 
      onClick={clearCart}
      aria-label="Clear all items from cart"
    >
      <span className="cart-clear-icon">🗑️</span>
      <span className="cart-clear-text">Clear Cart</span>
    </button>
      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <section className="cart-items">
          {cartItems?.map((item) => {
            item.quantity = cartItemsObj[item.product._id]
           return (
             <div className="cart-card" key={item.product._id}>
              <img src={item.product.image} alt={item.product.name} className="product-img" />
              
              <div className="product-info">
                <h3 className="product-title">{item.product.name}</h3>
                <p className="product-category">{item.product.category}</p>
                <span className="product-price">₹{item?.product?.price?.toLocaleString('en-IN')}</span>
              </div>

              <div className="quantity-controls">
                <button className="qty-btn" aria-label="Decrease quantity" onClick={()=> quantityDecrease(item.product._id, item.quantity)}>−</button>
                <span className="qty-count">{item.quantity}</span>
                <button className="qty-btn" aria-label="Increase quantity" onClick={()=> quantityIncrease(item.product._id, item.quantity)}>+</button>
              </div>

              <div className="item-total">
                ₹{(item.product.price * item?.quantity)?.toFixed(2).toLocaleString('en-IN')}
              </div>

              <button className="remove-btn" title="Remove Item" aria-label="Remove item" onClick={()=> removeFromCart(item.product._id)}>
                ✕
              </button>
            </div>
           )
})}
        </section>

        {/* Right: Order Summary Sidebar */}
        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <span className="free-shipping">FREE</span>
          </div>

          <div className="summary-row">
            <span>Tax (18% GST)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>

          {/* Promo Code Box */}
          <div className="promo-box">
            <input type="text" placeholder="Promo code" />
            <button type="button">Apply</button>
          </div>

          <hr className="divider" />

          <div className="summary-row total-row">
            <span>Total</span>
            <span>{(subTotal + tax).toFixed(2)}</span>
          </div>

          <button type="button" className="checkout-btn">
            Proceed to Checkout →
          </button>
        </aside>
      </div>
    </div>
  );
}