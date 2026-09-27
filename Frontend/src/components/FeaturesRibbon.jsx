import React from 'react';
import '../styles/FeaturesRibbon.css';

const FEATURES = [
  {
    id: 'free-shipping',
    title: 'Free Shipping',
    description: 'On all orders over $50 without hidden fees',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11" />
        <path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    id: 'fast-delivery',
    title: 'Fast Delivery',
    description: 'Guaranteed 2-3 business day doorstep delivery',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: 'secure-payments',
    title: 'Secure Payments',
    description: 'Protected by 256-bit encrypted checkout',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    id: 'easy-returns',
    title: '7-Day Returns',
    description: 'Hassle-free replacement or complete refund',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    ),
  },
];

export default function FeaturesRibbon() {
  return (
    <section className="features-ribbon" aria-label="Customer Guarantees">
      <div className="features-container">
        {FEATURES.map((item) => (
          <div key={item.id} className="feature-card">
            <div className="feature-icon-wrapper" aria-hidden="true">
              {item.icon}
            </div>
            <div className="feature-text">
              <h3 className="feature-title">{item.title}</h3>
              <p className="feature-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}