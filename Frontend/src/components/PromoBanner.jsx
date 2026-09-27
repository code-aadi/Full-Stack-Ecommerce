import React from 'react';
import "../styles/PromoBanner.css"

// Hardcoded promotional banners data
const PROMO_DATA = [
  {
    id: 'promo-tech',
    category: 'Electronics & Gadgets',
    tagline: 'Upgrade Your Tech',
    offer: 'Up to 40% Off',
    ctaText: 'Shop Now',
    link: '/category/Electronics',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    alt: 'Modern workspace featuring electronics and gadgets',
  },
  {
    id: 'promo-fashion',
    category: 'Fashion & Footwear',
    tagline: 'Step Up Your Style',
    offer: 'Flat 30% Off',
    ctaText: 'Shop Now',
    link: '/category/Footwear',
    image:
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Stylish sneakers and trendy lifestyle footwear',
  },
];

export default function PromoBanner() {

  return (
    <>
    <section className="promo-section" aria-label="Promotional Banners">
      <div className="promo-grid">
        {PROMO_DATA.map((banner) => (
          <div key={banner.id} className="promo-card">
            {/* Background Image Container */}
            <div className="promo-image-wrapper">
              <img
                src={banner.image}
                alt={banner.alt}
                className="promo-image"
                loading="lazy"
              />
            </div>

            {/* Gradient Overlay for Readability */}
            <div className="promo-overlay" />

            {/* Banner Text and Call to Action */}
            <div className="promo-content">
              <span className="promo-category">{banner.category}</span>
              <h3 className="promo-heading">
                {banner.tagline}
                <span className="promo-divider"> | </span>
                <span className="promo-offer">{banner.offer}</span>
              </h3>
              <a href={banner.link} className="promo-btn">
                {banner.ctaText}
                <svg
                  className="promo-btn-icon"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>   
     </>

  );
}