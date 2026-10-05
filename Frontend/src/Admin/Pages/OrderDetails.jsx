import React, { useState, useEffect, useContext } from "react";
import "../../styles/OrderDetails.css";
import { data, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import fetchApi from "../../../utils/fetchApi";
import { useAlert } from "../../../Context/AlertContext";
import Loader from "../../components/Loader";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const {showAlert} = useAlert()
  const [loading, setLoading] = useState(true);
  const [statusLoading , setStatusLoading] = useState(false)
  const [status, setStatus] = useState("");
const navigate = useNavigate()
const orderStatus = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
const {accessToken, setAccessToken} = useContext(AuthContext)
  function onBack(){
navigate(-1)
  }
 
 const {orderId} = useParams()

  useEffect(() => {
   

   async function getOrderDetails(){
    if(!orderId){
        alert("order id missing")
        return
    }
       setLoading(true)
       
   try {
     const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${orderId}`,{
      method : "GET",
    headers : {
        Authorization : `Bearer ${accessToken}`
    }
     },setAccessToken)
    const data = await response.json()
    
   setOrder(data?.order)
   setStatus(data?.order.orderStatus)
   } catch (error) {
    showAlert("Something went wrong", "error")
   }finally{
    setLoading(false)
   }
   }
getOrderDetails()
   
  }, [orderId]);

  const handleStatusChange = async(e) => {
    const newStatus = e.target.value;
       
    if(!orderId){
           alert("order id missing")
           return
        }
       setStatusLoading(true)
    try {
        const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${orderId}`,{
            method : "PATCH",
            headers : {
            "Content-Type" : "application/json",
          Authorization : `Bearer ${accessToken}`

            },
            body : JSON.stringify({status : newStatus})
        },setAccessToken)
        const data = await response.json()
       if(response.ok){
         setStatus(newStatus);
        showAlert(data.message, "success")
       }
    } catch (error) {
      showAlert("Something went wrong", "error")
    }finally{
      setStatusLoading(false)  
    }
   
  };


  if (loading) return <div style={{height: "80vh", display : "flex", justifyContent : "center"}}><Loader text="Loading User Order" /></div>;
  if (!order) {
  return (
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "75vh",
        padding: "40px 24px",
        textAlign: "center",
        backgroundColor: "#ffffff",
        borderRadius: "20px",
        // Soft layered shadow jo card ko modern depth deta hai
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        border: "1px solid #f1f5f9",
        maxWidth: "500px",
        margin: "40px auto"
      }}
    >
      {/* Soft Glow Background for Icon */}
      <div 
        style={{ 
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100px",
          height: "100px",
          backgroundColor: "#f8fafc",
          borderRadius: "50%",
          marginBottom: "24px",
          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          border: "1px solid #f1f5f9",
          fontSize: "44px"
        }}
      >
        📦
      </div>
      
      {/* Title with Gradient Text Style Feel */}
      <h2 
        style={{ 
          color: "#0f172a", 
          fontSize: "24px", 
          fontWeight: "700", 
          marginBottom: "12px",
          letterSpacing: "-0.02em"
        }}
      >
        Order Not Found
      </h2>
      
      {/* Balanced and Readable Subtext */}
      <p 
        style={{ 
          color: "#64748b", 
          fontSize: "15px", 
          maxWidth: "380px", 
          marginBottom: "32px", 
          lineHeight: "1.6",
          fontWeight: "400"
        }}
      >
        The order details you are trying to view do not exist, may have been archived, or deleted by the customer.
      </p>

      {/* Modern Action Buttons Layout */}
      <div style={{ display: "flex", gap: "12px", width: "100%", justifyContent: "center" }}>
        
        {/* Secondary Clean Button (Optional Dashboard Link) */}
        <button 
          onClick={() => navigate('/admin/dashboard')}
          style={{
            backgroundColor: "#ffffff",
            color: "#475569",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: "600",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#f8fafc";
            e.target.style.borderColor = "#94a3b8";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#ffffff";
            e.target.style.borderColor = "#cbd5e1";
          }}
        >
          Dashboard
        </button>

        {/* Primary Interactive Button */}
        <button 
          onClick={() => navigate('/admin/orders')}
          style={{
            backgroundColor: "#4f46e5", // Modern Indigo
            color: "#ffffff",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: "600",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)", // Button soft shadow
            transition: "all 0.2s ease-in-out"
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#4338ca";
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 6px 16px rgba(79, 70, 229, 0.35)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#4f46e5";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(79, 70, 229, 0.25)";
          }}
        >
          Go Back to Orders
        </button>

      </div>
    </div>
  );
}


  return (
    <div className="order-detail-container">
      {/* Top Header */}
      <div className="detail-header">
        <div>
          {onBack && (
            <button className="back-btn" onClick={onBack}>
              ← Back to Orders
            </button>
          )}
          <h2>Order #{order._id}</h2>
          <span className="order-date">
            Placed on: {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>

        {/* Status Controller */}
        <div className="status-controller">
          <label>Update Status: </label>
          <select value={status} onChange={handleStatusChange} disabled = {statusLoading} className={`status-badge ${status}`}>
           {orderStatus.map(stat =>(
            <option value={stat}>{stat}</option>
            
           ))}
          </select>
        </div>
      </div>

      <div className="detail-grid">
        {/* Left Side: Items & Pricing */}
        <div className="left-panel">
          <div className="card">
            <h3>Items in Order ({order.items.length})</h3>
            <div className="table-responsive">
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="total-summary">
              <div className="summary-row">
                <span>Total Amount Paid/Due:</span>
                <strong>₹{order.totalAmount.toFixed(2)}</strong>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="card payment-card">
            <h3>Payment Information</h3>
            <div className="info-grid">
              <div>
                <p className="label">Method</p>
                <p className="value uppercase">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="label">Status</p>
                <span className={`badge pay-${order.paymentStatus}`}>
                  {order.paymentStatus}
                </span>
              </div>
              {order.paymentOrderId && (
                <div>
                  <p className="label">Order Gateway ID</p>
                  <p className="value code">{order.paymentOrderId}</p>
                </div>
              )}
              {order.paymentId && (
                <div>
                  <p className="label">Transaction ID</p>
                  <p className="value code">{order.paymentId}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Shipping & Customer Details */}
        <div className="right-panel">
          <div className="card">
            <h3>Shipping Address</h3>
            <div className="address-box">
              <p className="customer-name">{order.shippingAddress.fullName}</p>
              <p>📞 {order.shippingAddress.phone}</p>
              <p>
                {order.shippingAddress.flatNo}, {order.shippingAddress.street}
              </p>
              {order.shippingAddress.lankmark && (
                <p>Landmark: {order.shippingAddress.lankmark}</p>
              )}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
              </p>
              <span className="address-type-tag">
                {order.shippingAddress.addressType || "Delivery Address"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;