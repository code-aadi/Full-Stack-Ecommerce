import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <>
      <style>{`
        .skeleton-card {
          position: relative;
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #eef2f6;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
          height: 100%;
          box-sizing: border-box;
        }

        /* Shimmer Animation Effect */
        .skeleton-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes skeleton-loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        .skeleton-image-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
        }

        .skeleton-content {
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 6px;
          flex-grow: 1;
        }

        .skeleton-rating-row {
          display: flex;
          align-items: center;
          gap: 6px;
          height: 14px;
        }

        .skeleton-title-line-1 {
          width: 90%;
          height: 14px;
          margin-top: 4px;
        }

        .skeleton-title-line-2 {
          width: 65%;
          height: 14px;
        }

        .skeleton-price-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          padding-top: 6px;
        }

        .skeleton-footer {
          padding: 0 0.85rem 0.85rem;
        }

        .skeleton-cart-btn {
          width: 100%;
          height: 35px;
          border-radius: 8px;
        }

        /* Mobile Match */
        @media (max-width: 580px) {
          .skeleton-content {
            padding: 0.65rem;
            gap: 4px;
          }

          .skeleton-footer {
            padding: 0 0.65rem 0.65rem;
          }

          .skeleton-title-line-1,
          .skeleton-title-line-2 {
            height: 12px;
          }

          .skeleton-cart-btn {
            height: 31px;
            border-radius: 6px;
          }
        }
      `}</style>

      <div className="skeleton-card" aria-hidden="true">
        {/* Product Image Placeholder */}
        <div className="skeleton-image-container skeleton-pulse" />

        {/* Card Content Placeholder */}
        <div className="skeleton-content">
          {/* Rating Placeholder */}
          <div className="skeleton-rating-row">
            <div className="skeleton-pulse" style={{ width: '42px', height: '12px' }} />
            <div className="skeleton-pulse" style={{ width: '30px', height: '12px' }} />
          </div>

          {/* 2-Line Product Title Placeholder */}
          <div className="skeleton-pulse skeleton-title-line-1" />
          <div className="skeleton-pulse skeleton-title-line-2" />

          {/* Price Row Placeholder */}
          <div className="skeleton-price-row">
            <div className="skeleton-pulse" style={{ width: '60px', height: '18px' }} />
            <div className="skeleton-pulse" style={{ width: '45px', height: '14px' }} />
            <div className="skeleton-pulse" style={{ width: '35px', height: '14px' }} />
          </div>
        </div>

        {/* Footer Button Placeholder */}
        <div className="skeleton-footer">
          <div className="skeleton-pulse skeleton-cart-btn" />
        </div>
      </div>
    </>
  );
};

export default ProductCardSkeleton;