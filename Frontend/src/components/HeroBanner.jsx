import React from 'react';

const HeroBanner = () => {
  return (
    <div className="container">
      <div className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
          alt="Banner Background"
          className="hero-bg"
        />
        <div className="hero-content">
          <span className="hero-subtitle">Exclusive Summer Sale</span>
          <h2 className="hero-title">Upgrade Your Style Up to 50% Off</h2>
          <p className="hero-desc">
            Explore top brands in Electronics, Fashion, Home Decor, and more.
          </p>
          <button className="btn-primary">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;