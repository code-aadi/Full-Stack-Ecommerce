import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/userOrderDetails.css"
import fetchApi from "../../utils/fetchApi";
import { AuthContext } from "../../Context/AuthContext";
import EmptyState from "../components/EmptyState";

const statusSteps = ["pending", "confirmed", "shipped", "delivered"];

const UserOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
const {accessToken, setAccessToken} = useContext(AuthContext)
 useEffect(()=>{
  if (!accessToken) return;
  async function fetchOrderDetails() {
    if(!id) return
    try {
      const response = await fetchApi(`http://localhost:2310/api/order/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },setAccessToken)
      const data = await response.json()
      setOrder(data.userOrder)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  fetchOrderDetails()
 },[id, accessToken])

  const handleDownloadInvoice = () => {
    window.print();
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!order) return <EmptyState type="orderdetail" />;

  const currentStep = statusSteps.indexOf(order.orderStatus?.toLowerCase());

  return (
    <div className="order-detail-page">
      <div className="detail-header no-print">
        <div className="header-text">
          <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
          <h2>Order Details</h2>
          <span className="order-tag">Order #{order._id}</span>
          <span className="order-subtext">Placed on {formatDate(order.createdAt)}</span>
        </div>
        <button className="btn-invoice" onClick={handleDownloadInvoice}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Download Invoice
        </button>
      </div>

      {/* Tracking Stepper */}
      {order.orderStatus !== "cancelled" ? (
        <div className="card tracker-card">
          <div className="tracker-status-heading">
            <span className="status-highlight">Status: {order.orderStatus.toUpperCase()}</span>
          </div>
          <div className="progress-tracker">
            {statusSteps.map((step, index) => (
              <div
                key={step}
                className={`tracker-step ${index <= currentStep ? "completed" : ""} ${
                  index === currentStep ? "current" : ""
                }`}
              >
                <div className="circle">{index + 1}</div>
                <span className="step-name">{step.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="card cancelled-card">
          <h3>Order Cancelled</h3>
        </div>
      )}

      <div className="detail-layout">
        {/* Left Column: Items & Shipping Address */}
        <div className="left-column">
          <div className="card">
            <h3 className="section-title">Items in this Order ({order.items?.length})</h3>
            <div className="items-list">
              {order.items?.map((item) => (
                <div key={item._id || item.productId} className="item-row">
                  <div className="item-meta">
                    <h4>{item.name}</h4>
                    <p className="qty">Quantity: {item.quantity}</p>
                    <p className="unit-price">Price: ₹{item.price?.toLocaleString("en-IN")}</p>
                  </div>
                  <div className="item-total-price">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">
              Shipping Address 
              {order.shippingAddress?.addressType && (
                <span className="address-tag">({order.shippingAddress.addressType})</span>
              )}
            </h3>
            <div className="address-box">
              <p className="receiver-name">{order.shippingAddress?.fullName}</p>
              <p className="address-line">
                {[
                  order.shippingAddress?.flatNo,
                  order.shippingAddress?.street,
                  order.shippingAddress?.address,
                  order.shippingAddress?.lankmark ? `Near ${order.shippingAddress.lankmark}` : "",
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
              <p className="address-line">
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
              </p>
              <p className="receiver-phone">
                <strong>Phone:</strong> {order.shippingAddress?.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Payment & Price Summary */}
        <div className="right-column">
          <div className="card">
            <h3 className="section-title">Payment Information</h3>
            <div className="payment-box">
              <div className="payment-row">
                <span>Method:</span>
                <strong>{order.paymentMethod?.toUpperCase()}</strong>
              </div>
              <div className="payment-row">
                <span>Status:</span>
                <span className={`payment-badge badge-${order.paymentStatus}`}>
                  {order.paymentStatus?.toUpperCase()}
                </span>
              </div>
              {order.paymentId && (
                <div className="payment-row">
                  <span>Payment ID:</span>
                  <code>{order.paymentId}</code>
                </div>
              )}
            </div>
          </div>

          <div className="card summary-card">
            <h3 className="section-title">Order Summary</h3>
            <div className="summary-row">
              <span>Items Subtotal</span>
              <span>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span className="free-tag">FREE</span>
            </div>
            <hr className="divider" />
            <div className="summary-row total-row">
              <span>Total Paid / Payable</span>
              <span>₹{order.totalAmount?.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetail;