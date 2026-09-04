import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>ShopEase</h2>
          <p className = 'address-error'>Your one-stop destination for best deals on electronics, fashion, and everyday essentials.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Returns Policy</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p className = 'address-error'>Subscribe to get special discounts.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Your Email" />
            <button>Join</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 ShopEase, Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;