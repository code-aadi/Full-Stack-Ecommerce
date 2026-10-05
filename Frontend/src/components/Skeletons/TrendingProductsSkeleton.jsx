import React from 'react';

const TrendingProductsSkeleton = ({ count = 8 }) => {
  return (
    <>
      <style>{`
        /* Card Shimmer Animation */
        .home-sk-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: homeSkShimmer 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes homeSkShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* 4:3 Image Container Match */
        .home-sk-media {
          position: relative;
          aspect-ratio: 4 / 3;
          width: 100%;
          border-top-left-radius: var(--home-radius-lg, 14px);
          border-top-right-radius: var(--home-radius-lg, 14px);
        }

        /* Bottom Action Button Skeleton */
        .home-sk-btn {
          width: 100%;
          height: 44px;
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
        }
      `}</style>

      <div className="home-products-grid" aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="home-product-card">
            <div className="home-product-top">
              {/* Media Section (4:3 aspect ratio) */}
              <div className="home-sk-media home-sk-pulse">
                {/* Category Pill Placeholder */}
                <div
                  className="home-sk-pulse"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    width: '60px',
                    height: '22px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.75)'
                  }}
                />
              </div>

              {/* Product Info Section */}
              <div className="home-product-info">
                {/* 2-Line Product Title Placeholder */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div className="home-sk-pulse" style={{ width: '88%', height: '14px' }} />
                  <div className="home-sk-pulse" style={{ width: '55%', height: '14px' }} />
                </div>

                {/* Bottom Row: Price & Rating */}
                <div className="home-product-bottom" style={{ marginTop: '4px' }}>
                  <div className="home-sk-pulse" style={{ width: '55px', height: '18px' }} />
                  <div className="home-sk-pulse" style={{ width: '40px', height: '14px' }} />
                </div>
              </div>
            </div>

            {/* Bottom Add to Cart Button */}
            <div className="home-sk-pulse home-sk-btn" />
          </div>
        ))}
      </div>
    </>
  );
};

export default TrendingProductsSkeleton;