import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";
import fetchApi from "../../utils/fetchApi";
import { AuthContext } from "../../Context/AuthContext";
import { useAlert } from "../../Context/AlertContext";
import EmptyState from "../components/EmptyState";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { accessToken, setAccessToken } = useContext(AuthContext);

  useEffect(() => {
    if (!accessToken) return;

    async function fetchUserOrders() {
      try {
        setLoading(true);
        const response = await fetchApi(
          "http://localhost:2310/api/order/userOrder",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
          setAccessToken
        );

        const data = await response.json();

        if (response.ok) {
       setOrders(data.orders || []);
        } else {
          showAlert(data.message || "Failed to load orders", "error");
        }
      } catch (error) {
        showAlert("Something went wrong. Please check your network.", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchUserOrders();
  }, [accessToken]);

  const filteredOrders =
    activeFilter === "All"
      ? orders
      : orders.filter(
          (order) =>
            order.orderStatus?.toLowerCase() === activeFilter.toLowerCase()
        );

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="orders-wrapper">
      <div className="orders-header-section">
        <div>
          <h1 className="orders-main-title">My Orders</h1>
          <p className="orders-subtitle">Track and review all your purchases</p>
        </div>

        {/* Filter Tabs */}
        <div className="orders-nav-tabs">
          {["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`nav-tab-item ${activeFilter === tab ? "tab-selected" : ""}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="orders-loading-wrap">
          <div className="ui-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <EmptyState
          type="orders"
          status={activeFilter}
          onActionClick={
            activeFilter !== 'All' ? () => setActiveFilter('All') : undefined
          }
        />
      ) : (
        <div className="orders-cards-stack">
          {filteredOrders.map((order) => (
            <div key={order._id} className="store-order-card">
              {/* Order Info Bar */}
              <div className="card-top-bar">
                <div className="top-meta-col">
                  <span className="order-code">
                    ORDER #{order._id.slice(-8).toUpperCase()}
                  </span>
                  <span className="order-timestamp">Placed on {formatDate(order.createdAt)}</span>
                </div>

                <div className="top-status-col">
                  <span className={`status-badge-chip status-${order.orderStatus?.toLowerCase()}`}>
                    {order.orderStatus}
                  </span>
                  <span className="order-price-bold">
                    ₹{order.totalAmount?.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Scrollable Products Area */}
              <div className="card-products-scrollable">
                {order.items?.map((item, idx) => (
                  <div key={item._id || item.productId || idx} className="product-item-row">
                    <div className="product-media">
                      <img
                        src={item.image || item.productId?.image || "https://placehold.co/100x100?text=Product"}
                        alt={item.name}
                        className="product-img"
                        onError={(e) => {
                          e.target.src = "https://placehold.co/100x100?text=No+Image";
                        }}
                      />
                    </div>

                    <div className="product-summary">
                      <h4
                        className="product-heading"
                        onClick={() => navigate(`/orders/${order._id}`)}
                      >
                        {item.name}
                      </h4>
                      <div className="product-specs">
                        <span>Quantity: <strong>{item.quantity}</strong></span>
                        <span className="spec-dot">•</span>
                        <span>Price: <strong>₹{item.price?.toLocaleString("en-IN")}</strong></span>
                      </div>
                    </div>

                    <div className="product-line-total">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="card-action-footer">
                <div className="action-meta">
                  <span className="pay-mode">
                    Payment: <strong>{order.paymentMethod?.toUpperCase()}</strong>
                  </span>
                  <span className={`pay-status-pill pill-${order.paymentStatus?.toLowerCase()}`}>
                    {order.paymentStatus}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn-primary-action"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  View Order Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;