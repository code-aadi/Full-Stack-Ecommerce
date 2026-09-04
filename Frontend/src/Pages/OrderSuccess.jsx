import React, { useContext } from 'react';
import { replace, useLocation, useNavigate, useParams } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

const OrderSuccess = () => {
  const location = useLocation()
  const isOnline = location.state.paymentMethod === 'online';
const {orderId} = useParams()
const navigate = useNavigate()
const {setCartItems} = useContext(cartContext)
setCartItems([])
  const paymentMessage = isOnline
    ? "Payment received successfully."
    : "Your order has been placed. Payment will be collected on delivery.";

  return (
    <div className="order-success-wrapper">
      <style>{`
        .order-success-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          padding: 20px;
          background-color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .order-card {
          background: #ffffff;
          max-width: 480px;
          width: 100%;
          border-radius: 16px;
          padding: 40px 32px;
          text-align: center;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
          border: 1px solid #e2e8f0;
        }

        .icon-circle {
          width: 72px;
          height: 72px;
          margin: 0 auto 24px;
          background-color: #ecfdf5;
          color: #10b981;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-circle svg {
          width: 36px;
          height: 36px;
        }

        .order-title {
          font-size: 24px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }

        .payment-status-message {
          font-size: 15px;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .order-details-box {
          background-color: #f1f5f9;
          border-radius: 10px;
          padding: 14px 18px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }

        .details-label {
          font-size: 14px;
          color: #64748b;
          font-weight: 500;
        }

        .details-id {
          font-size: 14px;
          color: #0f172a;
          font-weight: 700;
          font-family: monospace;
          letter-spacing: 0.5px;
        }

        .btn-home {
          display: inline-block;
          width: 100%;
          padding: 12px 0;
          background-color: #0f172a;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .btn-home:hover {
          background-color: #334155;
        }
      `}</style>

      <div className="order-card">
        {/* Success Icon */}
        <div className="icon-circle">
          <svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="order-title">Thank you for your order!</h1>
        <p className="payment-status-message">{paymentMessage}</p>

        {/* Order Info */}
        <div className="order-details-box">
          <span className="details-label">Order ID</span>
          <span className="details-id">#{orderId}</span>
        </div>

        {/* Action Button */}
        <button className="btn-home" onClick={() => navigate("/",{
          replace : true
        })}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;