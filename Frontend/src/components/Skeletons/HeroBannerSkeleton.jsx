import React from 'react';

const HeroBannerSkeleton = () => {
  return (
    <>
      <style>{`
        /* Hero Banner Container Base */
        .hero-banner-sk {
          position: relative;
         
          border-radius: 16px;
          overflow: hidden;
          background: #0f172a; /* Same dark theme base as original gradient */
          display: flex;
          align-items: center;
          min-height: 380px;
          box-sizing: border-box;
        }

        /* Subtle Dark Shimmer */
        .hero-sk-pulse {
          background: linear-gradient(90deg, rgba(51, 65, 85, 0.4) 25%, rgba(71, 85, 105, 0.6) 50%, rgba(51, 65, 85, 0.4) 75%);
          background-size: 200% 100%;
          animation: heroSkShimmer 1.5s infinite;
          border-radius: 6px;
        }

        @keyframes heroSkShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .hero-content-sk {
          position: relative;
          z-index: 3;
          padding: 5rem 3.5rem;
          max-width: 620px;
          width: 100%;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }

        /* Responsive Mobile Tuning */
        @media (max-width: 768px) {
          .hero-content-sk {
            padding: 3rem 1.5rem;
          }
          .hero-banner-sk {
            min-height: 300px;
          }
        }
      `}</style>

      <div className="container" aria-hidden="true">
        <div className="hero-banner-sk hero-banner">
          <div className="hero-content-sk hero-content">
            {/* 1. Subtitle Badge (Capsule shape) */}
            <div
              className="hero-sk-pulse"
              style={{
                width: '180px',
                height: '26px',
                borderRadius: '9999px',
                marginBottom: '1.2rem'
              }}
            />

            {/* 2. Main Title (2 Lines Fluid Typography) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.25rem' }}>
              <div
                className="hero-sk-pulse"
                style={{ width: '95%', height: '38px', borderRadius: '8px' }}
              />
              <div
                className="hero-sk-pulse"
                style={{ width: '65%', height: '38px', borderRadius: '8px' }}
              />
            </div>

            {/* 3. Description (2 Lines) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '2rem' }}>
              <div
                className="hero-sk-pulse"
                style={{ width: '90%', height: '16px' }}
              />
              <div
                className="hero-sk-pulse"
                style={{ width: '70%', height: '16px' }}
              />
            </div>

            {/* 4. Action Button (Shop Now) */}
            <div
              className="hero-sk-pulse"
              style={{
                width: '140px',
                height: '46px',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroBannerSkeleton;