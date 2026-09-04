import React, { useContext, useEffect, useState } from 'react';
import { 
  MapPin, 
  User, 
  Phone, 
  Home, 
  Building2, 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import fetchApi from '../../utils/fetchApi';
import { AuthContext } from '../../Context/AuthContext';

const AddressPage = ({ onSaveAddress }) => {
  const {accessToken, setAccessToken} = useContext(AuthContext)
  const [addressType, setAddressType] = useState('home');
  const [isDefault, setIsDefault] = useState(() => {
    const savedChecked = sessionStorage.getItem('myCheckboxStatus');
    return savedChecked ? JSON.parse(savedChecked) : false;
  });
  const [addressLoading, setAddressLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()





  const [formData, setFormData] = useState(()=>{
    const savedData = sessionStorage.getItem('myFormDetails');
    return savedData ? JSON.parse(savedData) : {
    fullName: '',
    phone: '',
    pincode: '',
    flatNo: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
  }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 useEffect(() => {
    sessionStorage.setItem('myFormDetails', JSON.stringify(formData));
  }, [formData]);


  useEffect(() => {
    sessionStorage.setItem('myCheckboxStatus', JSON.stringify(isDefault));
  }, [isDefault]);

  const handleSubmit = async(e) => {
    e.preventDefault();
const newError = {}
if(!formData.fullName.trim()){
  newError.fullName = "Name is required"
}
if(!formData.phone.trim() || formData.phone.length < 10){
  newError.phone = "Phone number is required"
}
if(!formData.pincode.trim() || formData.pincode.length < 6 || formData.pincode.length > 6 ){
  newError.pincode = "6 Digit pincode is required"
}
if(!formData.flatNo.trim() || formData.flatNo < 0){
  newError.flat = "Flat, House no. is required"
}
if(!formData.street.trim()){
  newError.street = "Area, Street or Colony is required"
}
if(!formData.city.trim() || formData.city.length < 3){
  newError.city = "City is required"
}
if(!formData.state.trim() || formData.state.length < 3){
  newError.state = "State is required"
}

setErrors(newError)
if(Object.keys(newError).length > 0) return
    
    const finalAddress = {
      ...formData,
      addressType,
      isDefault
    };
    setAddressLoading(true)
   try {
     const result = await SubmitUserAddress(finalAddress)
     const checkoutData = {
      totalAmount : result.totalAmount,
      shippingAddress : result.shippingAddress,
      items : result.items
     }
     localStorage.setItem('checkout_details', JSON.stringify(checkoutData))
   navigate('/payment');

} catch (error) {
    console.log(error)
    alert(error.message || "Something went wrong")
   }finally{
    setAddressLoading(false)
   }
    
  };

async function SubmitUserAddress(finalAddress) {
  const response = await fetchApi('http://localhost:2310/api/checkout',{
    method : 'POST',
    headers : {
      "Content-Type" : "application/json",
      Authorization : `Bearer ${accessToken}`,
    },
    body : JSON.stringify({address : finalAddress})
  },setAccessToken)
  const data = await response.json()
  if(!response.ok){
     throw new Error(data.message || 'Something Went Wrong! Please Try Again')
  }
  if (data.success === false) {
    throw new Error(data.message || 'Validation failed on backend'); 
  }
  return data
}

  return (
    <>
      <style>{`
        .address-page {
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 2.5rem 1rem;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .address-container {
          max-width: 780px;
          margin: 0 auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
          overflow: hidden;
        }

        .address-header {
          padding: 1.8rem 2rem;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .header-icon-box {
          width: 44px;
          height: 44px;
          background: #eef2ff;
          color: #4f46e5;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .address-header h1 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0;
        }

        .address-header p {
          font-size: 0.88rem;
          color: #64748b;
          margin: 3px 0 0 0;
        }

        .address-form {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .section-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #334155;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.4rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.2rem;
        }

        @media (max-width: 640px) {
          .form-grid-2, .form-grid-3 {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .address-form {
            padding: 1.25rem;
          }
          .address-header {
            padding: 1.25rem;
          }
        }

        .input-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-box label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1e293b;
        }

        .input-field-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-field-wrapper input,
        .input-field-wrapper textarea,
        .input-field-wrapper select {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 0.92rem;
          color: #0f172a;
          outline: none;
          background: #ffffff;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .input-field-wrapper.no-icon input,
        .input-field-wrapper.no-icon textarea,
        .input-field-wrapper.no-icon select {
          padding-left: 14px;
        }

        .input-field-wrapper input:focus,
        .input-field-wrapper textarea:focus,
        .input-field-wrapper select:focus {
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.12);
        }

        .field-icon {
          position: absolute;
          left: 13px;
          color: #94a3b8;
        }

        /* Type Selection (Home / Work) */
        .type-selector-row {
          display: flex;
          gap: 1rem;
        }

        .type-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #ffffff;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          transition: all 0.2s ease;
        }

        .type-btn.active {
          border-color: #4f46e5;
          background: #eef2ff;
          color: #4f46e5;
        }

        /* Checkbox Box */
        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 0.9rem;
          color: #334155;
          user-select: none;
        }

        .checkbox-container input {
          width: 18px;
          height: 18px;
          accent-color: #4f46e5;
          cursor: pointer;
        }

        /* Submit Button */
        .submit-address-btn {
          background: #4f46e5;
          color: #ffffff;
          border: none;
          padding: 15px 24px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
          transition: all 0.2s ease;
          margin-top: 0.5rem;
        }

        .submit-address-btn:hover {
          background: #4338ca;
          transform: translateY(-1px);
        }

        .secure-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #64748b;
          margin-top: -0.5rem;
        }
          .address-error{
          font-size : 12px;
          color : red;
          }
      `}</style>

      <div className="address-page">
        <div className="address-container">

          {/* Header */}
          <div className="address-header">
            <div className="header-icon-box">
              <MapPin size={22} />
            </div>
            <div>
              <h1>Add Delivery Address</h1>
              <p>Please enter your exact location for fast and smooth delivery</p>
            </div>
          </div>

          {/* Form */}
          <form className="address-form" onSubmit={handleSubmit}>
            
            {/* 1. Contact Information */}
            <div>
              <div className="section-title">
                <User size={16} /> Contact Details
              </div>
              <div className="form-grid-2">
                <div className="input-box">
                  <label htmlFor="fullName">Full Name *</label>
                  <div className="input-field-wrapper">
                    <User size={17} className="field-icon" />
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
               {errors.fullName &&  <p className = 'address-error'>{errors.fullName}</p>}
                </div>

                <div className="input-box">
                  <label htmlFor="phone">Mobile Number *</label>
                  <div className="input-field-wrapper">
                    <Phone size={17} className="field-icon" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                                 {errors.phone &&  <p className = 'address-error'>{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* 2. Address Details */}
            <div>
              <div className="section-title">
                <Home size={16} /> Address Details
              </div>

              <div className="form-grid-2" style={{ marginBottom: '1.2rem' }}>
                <div className="input-box">
                  <label htmlFor="pincode">Pincode *</label>
                  <div className="input-field-wrapper no-icon">
                    <input
                      type="number"
                      id="pincode"
                      name="pincode"
                      placeholder="e.g. 487551"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                {errors.pincode &&  <p className = 'address-error'>{errors.pincode}</p>}
                </div>

                <div className="input-box">
                  <label htmlFor="flatNo">Flat, House No., Building *</label>
                  <div className="input-field-wrapper no-icon">
                    <input
                      type="text"
                      id="flatNo"
                      name="flatNo"
                      placeholder="e.g. Flat 302, Royal Residency"
                      value={formData.flatNo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                    {errors.flat &&  <p className = 'address-error'>{errors.flat}</p>}
                </div>
              </div>

              <div className="input-box" style={{ marginBottom: '1.2rem' }}>
                <label htmlFor="street">Area, Colony, Street, Sector *</label>
                <div className="input-field-wrapper no-icon">
                  <input
                    type="text"
                    id="street"
                    name="street"
                    placeholder="e.g. Main Market, Station Road"
                    value={formData.street}
                    onChange={handleChange}
                    required
                  />
                </div>
                  {errors.street &&  <p className = 'address-error'>{errors.street}</p>}
              </div>

              <div className="form-grid-3">
                <div className="input-box">
                  <label htmlFor="landmark">Landmark (Optional)</label>
                  <div className="input-field-wrapper">
                    <Compass size={17} className="field-icon" />
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      placeholder="e.g. Near City Hospital"
                      value={formData.landmark}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="input-box">
                  <label htmlFor="city">City / District *</label>
                  <div className="input-field-wrapper no-icon">
                    <input
                      type="text"
                      id="city"
                      name="city"
                      placeholder="e.g. Gadarwara"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                    {errors.city &&  <p className = 'address-error'>{errors.city}</p>}
                </div>

                <div className="input-box">
                  <label htmlFor="state">State *</label>
                  <div className="input-field-wrapper no-icon">
                    <input
                      type="text"
                      id="state"
                      name="state"
                      placeholder="e.g. Madhya Pradesh"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                    {errors.state &&  <p className = 'address-error'>{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* 3. Address Type (Home / Work) */}
            <div>
              <div className="section-title">Address Type</div>
              <div className="type-selector-row">
                <button
                  type="button"
                  className={`type-btn ${addressType === 'home' ? 'active' : ''}`}
                  onClick={() => setAddressType('home')}
                >
                  <Home size={18} />
                  <span>Home (All Day Delivery)</span>
                </button>

                <button
                  type="button"
                  className={`type-btn ${addressType === 'work' ? 'active' : ''}`}
                  onClick={() => setAddressType('work')}
                >
                  <Building2 size={18} />
                  <span>Work (10 AM - 6 PM)</span>
                </button>
              </div>
            </div>

            {/* 4. Default Checkbox */}
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
              />
              <span>Make this my default delivery address</span>
            </label>

            {/* Submit Action */}
            <button disabled = {addressLoading} type="submit" className="submit-address-btn">
              <span>Save & Deliver Here</span>
              <ArrowRight size={18} />
            </button>

            <div className="secure-badge">
              <ShieldCheck size={16} color="#059669" />
              <span>Your personal details are encrypted and safe</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressPage;