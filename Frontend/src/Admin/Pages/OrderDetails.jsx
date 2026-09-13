import React, { useState, useEffect } from "react";
import "../../styles/OrderDetails.css";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading , setStatusLoading] = useState(false)
  const [status, setStatus] = useState("");
const navigate = useNavigate()
const orderStatus = ["pending", "confirmed", "shipped", "delivered", "cancelled"]

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
     const response = await fetch(`http://localhost:2310/api/admin/orders/${orderId}`)
    const data = await response.json()
    
   setOrder(data?.order)
   setStatus(data?.order.orderStatus)
   } catch (error) {
    alert(error.message)
   }finally{
    setLoading(false)
   }
   }
getOrderDetails()
   
  }, [orderId]);

  const handleStatusChange = async(e) => {
    const newStatus = e.target.value;
        setStatus(newStatus);
console.log(status)
    if(!orderId){
           alert("order id missing")
           return
        }
       setStatusLoading(true)
    try {
        const response = await fetch(`http://localhost:2310/api/admin/orders/${orderId}`,{
            method : "PATCH",
            headers : {
            "Content-Type" : "application/json"
            },
            body : JSON.stringify({status : newStatus})
        })
        const data = await response.json()
       
    } catch (error) {
        alert(error.message)
    }finally{
      setStatusLoading(false)  
    }
   
  };


  if (loading) return <div className="loading">Loading Order Details...</div>;
  if (!order) return <div>Order Not Found!</div>;

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