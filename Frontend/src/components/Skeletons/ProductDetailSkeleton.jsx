import React from 'react';

const ProductDetailSkeleton = () => {
  return (
    <>
      <style>{`
        /* Container styling */
        .sk-pdp-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
          box-sizing: border-box;
        }

        /* Breadcrumbs Row */
        .sk-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        /* 2-Column Desktop Grid */
        .sk-pdp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        /* Left Image Box */
        .sk-image-wrapper {
          background-color: #f9fafb;
          border-radius: 20px;
          border: 1px solid #f3f4f6;
          padding: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 420px;
          aspect-ratio: 1 / 1;
          box-sizing: border-box;
        }

        /* Right Column Details */
        .sk-details-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        /* Shimmer Animation */
        .sk-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: sk-shimmer 1.5s infinite;
          border-radius: 6px;
        }

        @keyframes sk-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Mobile View */
        @media (max-width: 868px) {
          .sk-pdp-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .sk-image-wrapper {
            min-height: 280px;
          }
        }
      `}</style>

      <div className="sk-pdp-container" aria-hidden="true">
        {/* Breadcrumb Skeleton */}
        <div className="sk-breadcrumbs">
          <div className="sk-pulse" style={{ width: '45px', height: '14px' }} />
          <span style={{ color: '#cbd5e1' }}>/</span>
          <div className="sk-pulse" style={{ width: '70px', height: '14px' }} />
          <span style={{ color: '#cbd5e1' }}>/</span>
          <div className="sk-pulse" style={{ width: '90px', height: '14px' }} />
        </div>

        {/* 2-Column Grid */}
        <div className="sk-pdp-grid">
          {/* Left Column: Image Skeleton */}
          <div className="sk-image-wrapper">
            <div className="sk-pulse" style={{ width: '100%', height: '100%', borderRadius: '12px' }} />
          </div>

          {/* Right Column: Details Skeleton */}
          <div className="sk-details-wrapper">
            {/* Category Capsule */}
            <div className="sk-pulse" style={{ width: '120px', height: '24px', borderRadius: '20px' }} />

            {/* Product Title (2 Lines) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sk-pulse" style={{ width: '90%', height: '28px' }} />
              <div className="sk-pulse" style={{ width: '55%', height: '28px' }} />
            </div>

            {/* Rating Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="sk-pulse" style={{ width: '55px', height: '24px', borderRadius: '6px' }} />
              <div className="sk-pulse" style={{ width: '130px', height: '14px' }} />
            </div>

            {/* Price Tag */}
            <div style={{ padding: '0.6rem 0', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
              <div className="sk-pulse" style={{ width: '140px', height: '36px' }} />
            </div>

            {/* Stock Badge */}
            <div className="sk-pulse" style={{ width: '110px', height: '24px', borderRadius: '6px' }} />

            {/* Description Box */}
            <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '12px', border: '1px solid #f3f4f6', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="sk-pulse" style={{ width: '120px', height: '14px', marginBottom: '4px' }} />
              <div className="sk-pulse" style={{ width: '100%', height: '12px' }} />
              <div className="sk-pulse" style={{ width: '95%', height: '12px' }} />
              <div className="sk-pulse" style={{ width: '70%', height: '12px' }} />
            </div>

            {/* Add to Cart & Wishlist Buttons */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <div className="sk-pulse" style={{ flex: 1, height: '48px', borderRadius: '12px' }} />
              <div className="sk-pulse" style={{ width: '50px', height: '48px', borderRadius: '12px' }} />
            </div>

            {/* Benefits Row (3 items) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="sk-pulse" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                <div className="sk-pulse" style={{ width: '65px', height: '12px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="sk-pulse" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                <div className="sk-pulse" style={{ width: '60px', height: '12px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div className="sk-pulse" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                <div className="sk-pulse" style={{ width: '70px', height: '12px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailSkeleton;