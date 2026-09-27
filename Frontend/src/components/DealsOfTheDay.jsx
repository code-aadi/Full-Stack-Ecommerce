import React, { useState, useEffect } from 'react';
import '../styles/DealsOfTheDay.css';
import Loader from './Loader';
import { useAlert } from '../../Context/AlertContext';

// 3 Dummy hot deal products
const DEAL_PRODUCTS = [
  {
    id: 'deal-1',
    title: 'Wireless Noise-Cancelling Headphones',
    originalPrice: 199.99,
    dealPrice: 129.99,
    badge: '35% OFF',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'deal-2',
    title: 'Smart Fitness Watch Series 5',
    originalPrice: 149.99,
    dealPrice: 89.99,
    badge: '40% OFF',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'deal-3',
    title: 'Minimalist Mechanical Keyboard',
    originalPrice: 119.99,
    dealPrice: 74.99,
    badge: '38% OFF',
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80',
  },
];

export default function DealsOfTheDay() {
  const {showAlert} = useAlert()
  const [timeLeft, setTimeLeft] = useState(8 * 3600 + 45 * 60 + 20);
const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formatDigit = (num) => String(num).padStart(2, '0');

  return (
    <section className="deals-container" aria-label="Deals of the Day">
      
      <div className="deals-header">
        <h2 className="deals-title">Deals of the Day</h2>
        <span className="deals-subtext">Hurry up! Special offers end soon.</span>
      </div>

      
      <div className="deals-layout">
        
        <aside className="deals-timer-card">
          <div className="timer-badge">Limited Time Only</div>
          <h3 className="timer-title">Flash Sale Ending In</h3>

          <div className="countdown-display">
            <div className="time-block">
              <span className="time-value">{formatDigit(hours)}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-value">{formatDigit(minutes)}</span>
              <span className="time-label">Mins</span>
            </div>
            <span className="time-colon">:</span>
            <div className="time-block">
              <span className="time-value">{formatDigit(seconds)}</span>
              <span className="time-label">Secs</span>
            </div>
          </div>

          <p className="timer-cta-note">Grab your gear before stock runs dry!</p>
        </aside>

 {loading && <Loader />}
        
        <div className="deals-products-grid">
          {DEAL_PRODUCTS.map((product) => (
            <article key={product.id} className="deal-card">
              <div className="deal-image-wrapper">
                <span className="deal-discount-badge">{product.badge}</span>
                <img
                  src={product.image}
                  alt={product.title}
                  className="deal-image"
                  onLoad={()=> setLoading(false)}
                />
              </div>

              <div className="deal-info">
                <h4 className="deal-product-title">{product.title}</h4>
                <div className="deal-price-row">
                  <span className="deal-current-price">₹{product.dealPrice.toFixed(2)}</span>
                  <span className="deal-original-price">₹{product.originalPrice.toFixed(2)}</span>
                </div>
                <button type="button" className="deal-action-btn" onClick={()=> showAlert("The Deal Is Closed! Come After Some Time", "error")}>
                  Claim Deal
                </button>
              </div>
            </article>
          ))}
        </div>
      
      </div>
    </section>
  );
}