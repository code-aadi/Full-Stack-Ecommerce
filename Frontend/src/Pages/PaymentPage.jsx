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
import { useAlert } from '../../Context/AlertContext';

const PaymentPage = () => {
  const [selectedMethod, setSelectedMethod] = useState('online');
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPaymentButtonDisable, setIsPaymentButtonDisable] = useState(false)
  const [shippingAddress, setShippingAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const { accessToken, setAccessToken } = useContext(AuthContext);
const navigate = useNavigate()
const {showAlert} = useAlert()
  useEffect(() => {
    const savedData = localStorage.getItem("checkout_details");
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setCartData(parsedData.items || []);
        setTotalAmount(parsedData.totalAmount || 0);
        setShippingAddress(parsedData.shippingAddress || null);
      } catch (error) {
        showAlert("Failed to parse checkout details", "error")
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
   setIsLoading(true)
    try {
      const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/order`, {
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
}else{
  showAlert(data.message || "Something went wrong", "error")
}
    } catch (error) {
      showAlert("Something went wrong")
    }finally{
      setIsLoading(false)
    }
  };

   const handlePayOnline = async () => {
  
    
    const paymentData = {
      method: "online", 
      address: shippingAddress
    };
setIsLoading(true)
    try {
      const response = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/payment/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(paymentData)
      }, setAccessToken);
      const data = await response.json();
     if(response.status === 429){
      setIsPaymentButtonDisable(true)
      return
     }
     if (!response.ok || data.success === false) {
        
        showAlert(data.message || "Failed to create payment order", "error");
        return; 
      }
      const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: data.amount,
  currency: data.currency,
  name: "My Store",
  description: "Order Payment",
  order_id: data.razorpayOrderId,

 handler: async function (response) {
try {
  
  const verifyResponse = await fetchApi(`${import.meta.env.VITE_API_BASE_URL}/api/payment/verify`, {
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
   if (!verifyResponse.ok || verifyData.success === false) {
              showAlert(verifyData.message || "Payment verification failed!", "error");
              return;
            }
if(data.success){
  navigate(`/order-success/${data.orderId}`,{
    state : {
      paymentMethod : "online"
    },
    replace : true
  })
}
} catch (verifyError) {
  showAlert("Verification process failed. Your stock is secured.", "error");
}
}
};

const razorpay = new window.Razorpay(options);
 razorpay.on('payment.failed', function (failResponse) {
          showAlert(`Payment Failed: ${failResponse.error.description}`, "error");
      });
razorpay.open();
    } catch (error) {
      showAlert("Something went wrong", "error")
    }finally{
      setIsLoading(false)
    }
  };

 
  return (
    <>
   <style>{`
  /* --- PAGE BASE WRAPPER --- */
  .payment-page {
    min-height: 100vh;
    background-color: #f8fafc;
    padding: 2rem 1rem 4rem 1rem;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    box-sizing: border-box;
  }

  .payment-container {
    max-width: 1080px;
    margin: 0 auto;
    width: 100%;
  }

  /* --- HEADER --- */
  .payment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;
  }

  .header-title-wrap h1 {
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.02em;
    margin: 0;
  }

  .header-title-wrap p {
    font-size: 0.88rem;
    color: #64748b;
    margin: 4px 0 0 0;
  }

  .back-to-address {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: #4f46e5;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    white-space: nowrap;
    padding: 6px 12px;
    border-radius: 8px;
    background-color: #eef2ff;
    transition: background-color 0.2s, transform 0.15s;
  }

  .back-to-address:hover {
    background-color: #e0e7ff;
    transform: translateX(-2px);
  }

  /* --- MAIN TWO-COLUMN LAYOUT --- */
  .payment-layout-grid {
    display: grid;
    grid-template-columns: 1fr 370px;
    gap: 1.75rem;
    align-items: start;
  }

  @media (max-width: 960px) {
    .payment-layout-grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  }

  /* --- PAYMENT METHODS CARD --- */
  .payment-methods-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 380px;
    margin-bottom: 1.5rem;
  }

  /* Sidebar Tabs */
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
    padding: 16px 18px;
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
    user-select: none;
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
    padding: 2px 7px;
    border-radius: 6px;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  /* Tab Body & Info Boxes */
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
    border-radius: 12px;
    padding: 1.25rem;
    color: #166534;
    font-size: 0.9rem;
    line-height: 1.55;
    margin-bottom: 1.5rem;
  }

  .cod-notice-box {
    background: #fffbeb;
    border: 1px solid #fef3c7;
    border-radius: 12px;
    padding: 1.25rem;
    color: #92400e;
    font-size: 0.9rem;
    line-height: 1.55;
    margin-bottom: 1.5rem;
  }

  .pay-now-btn {
    width: 100%;
    background: #4f46e5;
    color: #ffffff;
    border: none;
    padding: 14px 20px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
  }

  .pay-now-btn:hover {
    background: #4338ca;
    transform: translateY(-1px);
  }

  .pay-now-btn:active {
    transform: translateY(0);
  }

  /* --- DELIVERY ADDRESS CARD --- */
  .delivery-address-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 1.25rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1.25rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
  }

  .address-left {
    display: flex;
    gap: 14px;
    flex: 1;
    min-width: 0;
  }

  .address-pin-icon {
    color: #4f46e5;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .address-info {
    flex: 1;
    min-width: 0;
  }

  .address-info h4 {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 700;
    color: #0f172a;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    text-transform: capitalize;
  }

  .address-tag {
    font-size: 0.68rem;
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
    word-break: break-word;
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
    font-weight: 600;
  }

  .edit-address-btn {
    display: inline-flex;
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
    white-space: nowrap;
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

  /* --- ORDER SUMMARY CARD --- */
  .order-summary-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03);
    position: sticky;
    top: 90px;
  }

  .order-summary-card h3 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 1.2rem 0;
  }

  .summary-subtitle {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
    margin-bottom: 0.85rem;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .products-mini-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 1.25rem;
    max-height: 220px;
    overflow-y: auto;
    padding-right: 4px;
  }

  /* Custom Slim Scrollbar for Mini List */
  .products-mini-list::-webkit-scrollbar {
    width: 4px;
  }
  .products-mini-list::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
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
    min-width: 0;
  }

  .product-mini-name {
    font-weight: 600;
    color: #1e293b;
    line-height: 1.35;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    border: 1px solid #f1f5f9;
    padding: 12px;
    border-radius: 10px;
    font-size: 0.8rem;
    color: #475569;
    line-height: 1.4;
  }

  /* --- RESPONSIVE MEDIA QUERIES --- */

  /* Mobile Screens (<= 680px) */
  @media (max-width: 680px) {
    .payment-page {
      padding: 1rem 0.75rem 2.5rem 0.75rem;
    }

    .payment-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      margin-bottom: 1.5rem;
    }

    /* Convert vertical sidebar tabs to horizontal top selector */
    .payment-methods-card {
      grid-template-columns: 1fr;
      min-height: auto;
    }

    .methods-sidebar {
      flex-direction: row;
      border-right: none;
      border-bottom: 1px solid #e2e8f0;
      overflow-x: auto;
    }

    .method-tab {
      flex: 1;
      padding: 12px 14px;
      border-bottom: none;
      justify-content: center;
      white-space: nowrap;
      font-size: 0.86rem;
    }

    /* Tab indicator moves from left edge to bottom edge */
    .method-tab.active::before {
      left: 0;
      right: 0;
      top: auto;
      bottom: 0;
      width: 100%;
      height: 3px;
    }

    .methods-body {
      padding: 1.25rem;
    }

    .delivery-address-card {
      flex-direction: column;
      align-items: stretch;
      padding: 1.25rem;
    }

    .edit-address-btn {
      align-self: flex-start;
      margin-top: 6px;
    }

    .order-summary-card {
      position: static;
      padding: 1.25rem;
    }
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
                   <button 
  type="submit" 
  className="pay-now-btn" 
  disabled={isPaymentButtonDisable || isLoading} 
>
  <Lock size={16} />
  <span>
    {isPaymentButtonDisable ? "Blocked" : 
     
     isLoading ? "Processing..." : 
     
     selectedMethod === 'cod' 
        ? 'Place Order (Pay on Delivery)' 
        : `Pay ₹${totalAmount.toLocaleString('en-IN')} Online`
    }
  </span>
</button>
{isPaymentButtonDisable && (<div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', padding: '10px 16px', borderRadius: '6px', textAlign: 'center', margin: '10px 0' }}>
      ⚠️ Payment request limited. Please wait a moment
    </div>)}
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