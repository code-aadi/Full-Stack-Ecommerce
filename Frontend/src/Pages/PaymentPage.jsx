import React, { useContext, useEffect, useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  Lock, 
  ArrowLeft,
  MapPin,
  Edit3,
  ShoppingBag,
  Zap
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import fetchApi from '../../utils/fetchApi';
import { AuthContext } from '../../Context/AuthContext';

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('online');
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingAddress, setShippingAddress] = useState(null);
  const { accessToken, setAccessToken } = useContext(AuthContext);
const navigate = useNavigate()
  useEffect(() => {
    const savedData = localStorage.getItem("checkout_details");
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setCartData(parsedData.items || []);
        setTotalAmount(parsedData.totalAmount || 0);
        setShippingAddress(parsedData.shippingAddress || null);
      } catch (error) {
        console.error("Failed to parse checkout details from localStorage:", error);
      }
    }
  }, []);

const handleButtonClick = (e) =>{
      e.preventDefault();
  if(selectedMethod === "cod"){
    handlePay()
  }else{
    handlePayOnline()
  }
}

 const handlePay = async () => {
    
    const paymentData = {
      method: "cod", 
      address: shippingAddress
    };

    try {
      const response = await fetchApi("http://localhost:2310/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(paymentData)
      }, setAccessToken);
      const data = await response.json();
    
      if(data.success){
  navigate(`/order-success/${data.orderId}`,{
    state : {
      paymentMethod : "cash on delivery"
    },
    replace : true
  })
}
    } catch (error) {
      alert(error.message);
    }
  };

   const handlePayOnline = async () => {
  
    
    const paymentData = {
      method: "online", 
      address: shippingAddress
    };

    try {
      const response = await fetchApi("http://localhost:2310/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(paymentData)
      }, setAccessToken);
      const data = await response.json();
      
      const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: data.amount,
  currency: data.currency,
  name: "My Store",
  description: "Order Payment",
  order_id: data.razorpayOrderId,

 handler: async function (response) {

  const verifyResponse = await fetchApi("http://localhost:2310/api/payment/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_order_id: response.razorpay_order_id,
      razorpay_signature: response.razorpay_signature
    })
  },setAccessToken);

  const data = await verifyResponse.json();
if(data.success){
  navigate(`/order-success/${data.orderId}`,{
    state : {
      paymentMethod : "online"
    },
    replace : true
  })
}
}
};

const razorpay = new window.Razorpay(options);

razorpay.open();
    } catch (error) {
      alert(error.message);
    }
  };

 
  return (
    <>
      <style>{`
        .payment-page {
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 2.5rem 1rem;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .payment-container {
          max-width: 1080px;
          margin: 0 auto;
        }

        .payment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header-title-wrap h1 {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .header-title-wrap p {
          font-size: 0.88rem;
          color: #64748b;
          margin: 4px 0 0 0;
        }

        .back-to-address {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #4f46e5;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .payment-layout-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 2rem;
          align-items: start;
        }

        @media (max-width: 900px) {
          .payment-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Payment Methods Card */
        .payment-methods-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: 380px;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 680px) {
          .payment-methods-card {
            grid-template-columns: 1fr;
          }
        }

        .methods-sidebar {
          background: #f8fafc;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .method-tab {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px;
          background: transparent;
          border: none;
          border-bottom: 1px solid #f1f5f9;
          text-align: left;
          cursor: pointer;
          font-size: 0.92rem;
          font-weight: 600;
          color: #475569;
          transition: all 0.2s ease;
          position: relative;
        }

        .method-tab:hover {
          background: #f1f5f9;
          color: #1e293b;
        }

        .method-tab.active {
          background: #ffffff;
          color: #4f46e5;
          font-weight: 700;
        }

        .method-tab.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: #4f46e5;
        }

        .method-badge {
          margin-left: auto;
          font-size: 0.68rem;
          background: #dcfce7;
          color: #15803d;
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 700;
        }

        .methods-body {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .method-content-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .online-info-box {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 10px;
          padding: 1.2rem;
          color: #166534;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .cod-notice-box {
          background: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: 10px;
          padding: 1.2rem;
          color: #92400e;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .pay-now-btn {
          width: 100%;
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 14px;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
        }

        .pay-now-btn:hover {
          background: #4338ca;
        }

        /* Delivery Address Card */
        .delivery-address-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .address-left {
          display: flex;
          gap: 14px;
        }

        .address-pin-icon {
          color: #4f46e5;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .address-info h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 8px;
          text-transform: capitalize;
        }

        .address-tag {
          font-size: 0.7rem;
          background: #eef2ff;
          color: #4f46e5;
          padding: 2px 8px;
          border-radius: 999px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .address-details {
          margin: 6px 0 0 0;
          font-size: 0.88rem;
          color: #475569;
          line-height: 1.5;
          text-transform: capitalize;
        }

        .address-landmark {
          margin: 4px 0 0 0;
          font-size: 0.84rem;
          color: #64748b;
        }

        .address-phone {
          margin: 5px 0 0 0;
          font-size: 0.84rem;
          color: #334155;
          font-weight: 500;
        }

        .edit-address-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 7px 14px;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid #cbd5e1;
          color: #334155;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .edit-address-btn:hover {
          background: #eef2ff;
          border-color: #c7d2fe;
          color: #4f46e5;
        }

        .no-address-state {
          font-size: 0.9rem;
          color: #ef4444;
          font-weight: 600;
        }

        /* Order Summary Card */
        .order-summary-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        .order-summary-card h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 1.2rem 0;
        }

        .summary-subtitle {
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #94a3b8;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .products-mini-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 1.2rem;
        }

        .product-mini-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.88rem;
        }

        .product-mini-left {
          flex: 1;
        }

        .product-mini-name {
          font-weight: 600;
          color: #1e293b;
          line-height: 1.35;
          margin: 0;
        }

        .product-mini-qty {
          font-size: 0.78rem;
          color: #64748b;
          margin-top: 2px;
        }

        .product-mini-price {
          font-weight: 700;
          color: #0f172a;
          white-space: nowrap;
        }

        .price-line {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 10px;
        }

        .price-line span:last-child {
          color: #1e293b;
          font-weight: 600;
        }

        .price-divider {
          border: none;
          border-top: 1px dashed #e2e8f0;
          margin: 14px 0;
        }

        .total-price-line {
          display: flex;
          justify-content: space-between;
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 1.5rem;
        }

        .total-price-line span:last-child {
          color: #4f46e5;
        }

        .security-guarantee {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f8fafc;
          padding: 12px;
          border-radius: 10px;
          font-size: 0.8rem;
          color: #475569;
          line-height: 1.4;
        }
      `}</style>

      <div className="payment-page">
        <div className="payment-container">
          
          <header className="payment-header">
            <div className="header-title-wrap">
              <h1>Select Payment Method</h1>
              <p>All transactions are 100% secure and encrypted</p>
            </div>
            <Link to="/userAddress" className="back-to-address">
              <ArrowLeft size={16} /> Back to Address
            </Link>
          </header>

          <div className="payment-layout-grid">
            
            {/* Left Column */}
            <div className="payment-left-col">
              
              {/* 1. Payment Methods */}
              <div className="payment-methods-card">
                <nav className="methods-sidebar">
                  <button 
                    type="button"
                    className={`method-tab ${selectedMethod === 'online' ? 'active' : ''}`}
                    onClick={() => setSelectedMethod('online')}
                  >
                    <CreditCard size={18} />
                    <span>Pay Online</span>
                    <span className="method-badge">Instant</span>
                  </button>

                  <button 
                    type="button"
                    className={`method-tab ${selectedMethod === 'cod' ? 'active' : ''}`}
                    onClick={() => setSelectedMethod('cod')}
                  >
                    <Banknote size={18} />
                    <span>Cash on Delivery</span>
                  </button>
                </nav>

                <div className="methods-body">
                  <form onSubmit={handleButtonClick}>

                    {/* Pay Online */}
                    {selectedMethod === 'online' && (
                      <div>
                        <div className="method-content-title">
                          <Zap size={20} color="#4f46e5" />
                          <span>Pay Online via Razorpay</span>
                        </div>

                        <div className="online-info-box">
                          You will be redirected to complete your payment securely using <b>UPI, Cards, Net Banking, or Wallets</b> via Razorpay.
                        </div>
                      </div>
                    )}

                    {/* COD */}
                    {selectedMethod === 'cod' && (
                      <div>
                        <div className="method-content-title">
                          <Banknote size={20} color="#4f46e5" />
                          <span>Cash on Delivery</span>
                        </div>

                        <div className="cod-notice-box">
                          Pay cash or scan QR at the time of delivery. Please keep the exact amount ready.
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="pay-now-btn">
                      <Lock size={16} />
                      <span>
                        {selectedMethod === 'cod' 
                          ? 'Place Order (Pay on Delivery)' 
                          : `Pay ₹${totalAmount.toLocaleString('en-IN')} Online`}
                      </span>
                    </button>
                  </form>
                </div>
              </div>

              {/* 2. Delivery Address Card */}
              <div className="delivery-address-card">
                {shippingAddress ? (
                  <>
                    <div className="address-left">
                      <MapPin size={22} className="address-pin-icon" />
                      <div className="address-info">
                        <h4>
                          {shippingAddress.fullName}
                          {shippingAddress.addressType && (
                            <span className="address-tag">{shippingAddress.addressType}</span>
                          )}
                        </h4>
                        
                        <p className="address-details">
                          {shippingAddress.flatNo && `Flat/House: ${shippingAddress.flatNo}, `}
                          {shippingAddress.street}
                          <br />
                          {shippingAddress.city}, {shippingAddress.state} - <b>{shippingAddress.pincode}</b>
                        </p>

                        {shippingAddress.landmark && shippingAddress.landmark.trim() !== "" && (
                          <p className="address-landmark">
                            <b>Landmark:</b> {shippingAddress.landmark}
                          </p>
                        )}

                        {shippingAddress.phone && (
                          <p className="address-phone">
                            <b>Phone:</b> {shippingAddress.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <Link to="/userAddress" className="edit-address-btn">
                      <Edit3 size={14} /> Edit Address
                    </Link>
                  </>
                ) : (
                  <div className="no-address-state">
                    No shipping address selected. <Link to="/userAddress">Add an Address</Link>
                  </div>
                )}
              </div>

            </div>

            {/* Right Column: Order Summary + Products */}
            <aside className="order-summary-card">
              <h3>Order Summary</h3>

              <div className="summary-subtitle">
                <ShoppingBag size={14} />
                <span>Items in Order ({cartData.length})</span>
              </div>

              <div className="products-mini-list">
                {cartData.map((item, index) => (
                  <div key={item.id || index} className="product-mini-item">
                    <div className="product-mini-left">
                      <p className="product-mini-name">{item.name || item.title}</p>
                      <span className="product-mini-qty">Qty: {item.quantity || 1}</span>
                    </div>
                    <div className="product-mini-price">
                      ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <hr className="price-divider" />

              <div className="price-line">
                <span>Items Subtotal</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="price-line">
                <span>Delivery Charges</span>
                <span style={{ color: '#16a34a', fontWeight: 700 }}>FREE</span>
              </div>
              <div className="price-line">
                <span>Platform Fee</span>
                <span>₹0</span>
              </div>

              <hr className="price-divider" />

              <div className="total-price-line">
                <span>Total Payable</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className="security-guarantee">
                <ShieldCheck size={28} color="#4f46e5" />
                <span>Safe and Secure Payments. 100% Authentic products guaranteed.</span>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;