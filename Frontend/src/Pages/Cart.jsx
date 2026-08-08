import React, { useContext, useEffect, useState } from 'react';
import '../styles/cart.css';
import { cartContext } from '../../Context/CartContext';


export default function Cart() {
 
  const {cartItems, quantityIncrease , quantityDecrease , removeFromCart, clearCart} = useContext(cartContext)
const [cartDetails, setCartDetails] = useState([])
const [loading, setLoading] = useState(false)
const cartItemsObj = {}
cartItems.forEach(item => {
  cartItemsObj[item.id] = item.quantity
});
const subTotal = cartDetails.reduce((acc,cart) => acc + cart.quantity * cart.price, 0)
const tax = subTotal * 18 / 100


useEffect(()=>{
    async function getCarts() {
      if (!cartItems || cartItems.length === 0) {
      setCartDetails([]);
      return;
    }
      setLoading(true)
      try {
        const productIds = cartItems.map(item => item.id);
  const response = await fetch("http://localhost:2310/api/products/cart",{
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({ids : productIds})
  })
  const data = await response.json()
  setCartDetails(data.products)
  
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false)
      }
    }
    getCarts()
},[cartItems])

if(loading){
  return <h1>Data is Loading. Please Wait</h1>
}

  return (
    <div className="cart-container">
      {/* Header */}
      <header className="cart-header">
        <h1>
          Your Shopping Cart <span>({cartDetails.length} Items)</span>
        </h1>
        <a href="#shop" className="continue-shopping">
          ← Continue Shopping
        </a>
      </header>

      <div className="cart-layout">
        {/* Left: Cart Items List */}
        <section className="cart-items">
          {cartDetails?.map((item) => {
            item.quantity = cartItemsObj[item._id]
           return (
             <div className="cart-card" key={item._id}>
              <img src={item.image} alt={item.title} className="product-img" />
              
              <div className="product-info">
                <h3 className="product-title">{item.title}</h3>
                <p className="product-category">{item.category}</p>
                <span className="product-price">₹{item?.price?.toLocaleString('en-IN')}</span>
              </div>

              <div className="quantity-controls">
                <button className="qty-btn" aria-label="Decrease quantity" onClick={()=> quantityDecrease(item._id)}>−</button>
                <span className="qty-count">{item.quantity}</span>
                <button className="qty-btn" aria-label="Increase quantity" onClick={()=> quantityIncrease(item._id)}>+</button>
              </div>

              <div className="item-total">
                ₹{(item.price * item?.quantity)?.toFixed(2).toLocaleString('en-IN')}
              </div>

              <button className="remove-btn" title="Remove Item" aria-label="Remove item" onClick={()=> removeFromCart(item._id)}>
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