import React from 'react';

const PromoBannersSkeleton = ({ count = 2 }) => {
  return (
    <>
      <style>{`
        /* Promo Shimmer Pulse for Dark Cards */
        .promo-sk-pulse {
          background: linear-gradient(90deg, rgba(51, 65, 85, 0.4) 25%, rgba(71, 85, 105, 0.6) 50%, rgba(51, 65, 85, 0.4) 75%);
          background-size: 200% 100%;
          animation: promoSkShimmer 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes promoSkShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Skeleton Card Base Matching Original Promo Card */
        .promo-sk-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          height: 320px;
          display: flex;
          align-items: flex-end;
          background-color: #0f172a;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1),
                      0 8px 10px -6px rgba(0, 0, 0, 0.08);
          box-sizing: border-box;
        }

        .promo-sk-content {
          position: relative;
          z-index: 2;
          padding: 2rem;
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .promo-sk-card {
            height: 280px;
          }
          .promo-sk-content {
            padding: 1.5rem;
          }
        }
      `}</style>

      <section className="promo-section" aria-hidden="true" aria-label="Loading Promotional Banners">
        <div className="promo-grid">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="promo-sk-card">
              <div className="promo-sk-content">
                {/* 1. Category Tag */}
                <div
                  className="promo-sk-pulse"
                  style={{
                    width: '90px',
                    height: '14px',
                    borderRadius: '4px',
                    marginBottom: '0.75rem'
                  }}
                />

                {/* 2. Heading & Offer Line */}
                <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div
                    className="promo-sk-pulse"
                    style={{
                      width: index % 2 === 0 ? '85%' : '75%',
                      height: '24px',
                      borderRadius: '6px'
                    }}
                  />
                </div>

                {/* 3. Shop Now Rounded Pill Button */}
                <div
                  className="promo-sk-pulse"
                  style={{
                    width: '125px',
                    height: '38px',
                    borderRadius: '9999px'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PromoBannersSkeleton;