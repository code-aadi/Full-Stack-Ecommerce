import React from 'react';
import "../styles/BrandSlider.css";

const brands = [
  {
    id: 1,
    name: 'Vortex',
    svg: (
      <svg viewBox="0 0 24 24" className="brand-logo">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    name: 'Nexus',
    svg: (
      <svg viewBox="0 0 24 24" className="brand-logo">
        <polygon points="12,2 22,20 2,20" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="12" cy="14" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 3,
    name: 'Aether',
    svg: (
      <svg viewBox="0 0 24 24" className="brand-logo">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 4,
    name: 'Kinetics',
    svg: (
      <svg viewBox="0 0 24 24" className="brand-logo">
        <path d="M4 12a8 8 0 0 1 14.5-4.5M20 12a8 8 0 0 1-14.5 4.5" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 5,
    name: 'Solace',
    svg: (
      <svg viewBox="0 0 24 24" className="brand-logo">
        <polygon points="12,3 21,12 12,21 3,12" stroke="currentColor" strokeWidth="2.5" fill="none" />
      </svg>
    ),
  },
  {
    id: 6,
    name: 'Hyperion',
    svg: (
      <svg viewBox="0 0 24 24" className="brand-logo">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
      </svg>
    ),
  },
];

export default function BrandSlider() {
  return (
    <section className="brand-slider-container" aria-label="Partner Brands">
      <h2 className="brand-slider-heading">Top Brands We Trust</h2>
      <div className="brand-slider-row">
        {brands.map((brand) => (
          <div key={brand.id} className="brand-item" title={brand.name}>
            {brand.svg}
            <span className="brand-name">{brand.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}