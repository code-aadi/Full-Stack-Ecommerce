import React from 'react';

const CartPageSkeleton = () => {
  return (
    <>
      <style>{`
        /* Cart Shimmer Animation */
        .cart-sk-pulse {
          background: linear-gradient(90deg, #eceee9 25%, #dedfd9 50%, #eceee9 75%);
          background-size: 200% 100%;
          animation: cart-sk-shimmer 1.5s infinite;
          border-radius: 4px;
        }

        @keyframes cart-sk-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .cart-sk-page {
          min-height: 100vh;
          padding: 2.5rem 1.5rem 5rem;
          box-sizing: border-box;
        }

        .cart-sk-inner {
          max-width: 1120px;
          margin: 0 auto;
        }

        /* Header Skeleton */
        .cart-sk-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #E3E1DA;
        }

        /* Layout */
        .cart-sk-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2.5rem;
          margin-top: 1.75rem;
          align-items: start;
        }

        .cart-sk-items {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Item Row */
        .cart-sk-item {
          display: grid;
          grid-template-areas: "image body qty total remove";
          grid-template-columns: 92px 1fr auto auto 36px;
          align-items: center;
          gap: 1.25rem;
          background: #FFFFFF;
          border: 1px solid #E3E1DA;
          border-radius: 6px;
          padding: 1.25rem;
          box-sizing: border-box;
        }

        .cart-sk-img {
          grid-area: image;
          width: 92px;
          height: 92px;
          border-radius: 4px;
        }

        .cart-sk-body {
          grid-area: body;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .cart-sk-qty {
          grid-area: qty;
          width: 92px;
          height: 30px;
          border-radius: 5px;
        }

        .cart-sk-total {
          grid-area: total;
          width: 75px;
          height: 20px;
        }

        .cart-sk-remove {
          grid-area: remove;
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        /* Order Summary Box */
        .cart-sk-summary {
          background: #FFFFFF;
          border: 1px solid #E3E1DA;
          border-radius: 6px;
          padding: 1.75rem;
          box-sizing: border-box;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .cart-sk-layout {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .cart-sk-page {
            padding: 1.5rem 1rem 4rem;
          }

          .cart-sk-item {
            grid-template-areas:
              "image body body"
              "footer footer footer";
            grid-template-columns: 72px 1fr auto;
            row-gap: 0.9rem;
          }

          .cart-sk-img {
            width: 72px;
            height: 72px;
          }

          .cart-sk-mobile-footer {
            grid-area: footer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid #E3E1DA;
            padding-top: 0.85rem;
          }
        }
      `}</style>

      <div className="cart-sk-page" aria-hidden="true">
        <div className="cart-sk-inner">
          
          {/* Header Skeleton */}
          <div className="cart-sk-header">
            <div className="cart-sk-pulse" style={{ width: '220px', height: '36px' }} />
            <div className="cart-sk-pulse" style={{ width: '130px', height: '18px' }} />
          </div>

          {/* Main Cart Grid */}
          <div className="cart-sk-layout">
            
            {/* Left: 3 Cart Item Skeletons */}
            <div className="cart-sk-items">
              {[1, 2, 3].map((key) => (
                <div key={key} className="cart-sk-item">
                  {/* Thumbnail */}
                  <div className="cart-sk-pulse cart-sk-img" />

                  {/* Body (Title, Category, Price) */}
                  <div className="cart-sk-body">
                    <div className="cart-sk-pulse" style={{ width: '75%', height: '18px' }} />
                    <div className="cart-sk-pulse" style={{ width: '40%', height: '14px' }} />
                    <div className="cart-sk-pulse" style={{ width: '30%', height: '16px', marginTop: '4px' }} />
                  </div>

                  {/* Quantity Counter */}
                  <div className="cart-sk-pulse cart-sk-qty" />

                  {/* Total Price */}
                  <div className="cart-sk-pulse cart-sk-total" />

                  {/* Remove Button */}
                  <div className="cart-sk-pulse cart-sk-remove" />
                </div>
              ))}
            </div>

            {/* Right: Order Summary Skeleton */}
            <aside className="cart-sk-summary">
              {/* Title */}
              <div className="cart-sk-pulse" style={{ width: '150px', height: '24px', marginBottom: '1.5rem' }} />

              {/* Rows */}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0' }}>
                <div className="cart-sk-pulse" style={{ width: '60px', height: '16px' }} />
                <div className="cart-sk-pulse" style={{ width: '70px', height: '16px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0' }}>
                <div className="cart-sk-pulse" style={{ width: '120px', height: '16px' }} />
                <div className="cart-sk-pulse" style={{ width: '45px', height: '16px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0' }}>
                <div className="cart-sk-pulse" style={{ width: '90px', height: '16px' }} />
                <div className="cart-sk-pulse" style={{ width: '65px', height: '16px' }} />
              </div>

              {/* Promo input & btn */}
              <div style={{ display: 'flex', gap: '0.5rem', margin: '1.2rem 0' }}>
                <div className="cart-sk-pulse" style={{ flex: 1, height: '38px', borderRadius: '4px' }} />
                <div className="cart-sk-pulse" style={{ width: '80px', height: '38px', borderRadius: '4px' }} />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid #E3E1DA', margin: '0.75rem 0 1rem' }} />

              {/* Total row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div className="cart-sk-pulse" style={{ width: '50px', height: '26px' }} />
                <div className="cart-sk-pulse" style={{ width: '90px', height: '26px' }} />
              </div>

              {/* Checkout Button */}
              <div className="cart-sk-pulse" style={{ width: '100%', height: '48px', borderRadius: '5px' }} />
            </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default CartPageSkeleton;