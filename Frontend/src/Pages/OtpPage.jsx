import React, { useState, useRef, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useAlert } from '../../Context/AlertContext';
import { useNavigate } from 'react-router-dom';
import { ThreeDotsLoader } from '../components/ThreeDots';


const OTP_LENGTH = 6;

export default function OtpPage() {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const {verifyOtp, otpLoading, resendOtp} = useContext(AuthContext)
  const {showAlert} = useAlert()
  const inputRefs = useRef([]);
const navigate = useNavigate()
  const email = sessionStorage.getItem("verifyEmail")

  useEffect(()=>{
    if(!email){
      return navigate("/register")
    }
  })
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) return;

    const newOtp = [...otp];
    
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, OTP_LENGTH).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
      if (inputRefs.current[i]) {
        inputRefs.current[i].value = digit;
      }
    });

    setOtp(newOtp);

    
    const nextFocusIndex = Math.min(digits.length, OTP_LENGTH - 1);
    if (inputRefs.current[nextFocusIndex]) {
      inputRefs.current[nextFocusIndex].focus();
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');

    if (enteredOtp.length < OTP_LENGTH) {
      setMessage({ text: 'Please enter 6 digits OTP', type: 'error' });
      return;
    }

   const otpResult = await verifyOtp(enteredOtp, email)
   if(otpResult.success){
     setMessage({ text: otpResult.message, type: 'success' });
     showAlert(otpResult.message, "success")
     navigate("/")

   }else{
        setMessage({ text: otpResult.message, type: 'error' });
 
   }
  };

  const handleResend = async() => {
    if (!canResend) return;
    setOtp(new Array(OTP_LENGTH).fill(''));
    setCanResend(false);
    setTimer(60);
    const resendResult = await resendOtp(email)
    if(resendResult.success){
        showAlert("New OTP has been sent to your email", "success")
    }else{
      setMessage({text : resendResult.message, type : "error"})
      setTimer(0)
      setCanResend(true)
    }
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  return (
    <>
    <style>
      {`
    /* Page background aur center alignment */
.otp-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f5f7;
  font-family: Arial, sans-serif;
  padding: 16px;
  box-sizing: border-box;
}

/* Card layout */
.otp-card {
  background-color: #ffffff;
  padding: 32px 24px;
  border-radius: 8px;
  border: 1px solid #e1e4e8;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.otp-card h2 {
  margin: 0 0 8px 0;
  font-size: 22px;
  color: #222222;
}

.subtitle {
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
  line-height: 1.4;
}

/* Input boxes styling */
.otp-inputs {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 20px;
}

.otp-box {
  width: 44px;
  height: 48px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: 1.5px solid #cccccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fafafa;
}

.otp-box:focus {
  border-color: #0066cc;
  background-color: #ffffff;
}

/* Submit button */
.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #0066cc;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #0052a3;
}

/* Message states */
.message-box {
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 16px;
}

.message-box.error {
  background-color: #fde8e8;
  color: #c81e1e;
  border: 1px solid #f8b4b4;
}

.message-box.success {
  background-color: #def7ec;
  color: #03543f;
  border: 1px solid #84e1bc;
}

.message-box.info {
  background-color: #e1effe;
  color: #1e429f;
  border: 1px solid #b3c5ff;
}

/* Resend section */
.resend-section {
  margin-top: 20px;
  font-size: 13px;
  color: #555555;
}

.timer-text {
  color: #888888;
  margin: 0;
}

.resend-btn {
  background: none;
  border: none;
  color: #0066cc;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.resend-btn:hover {
  color: #004499;
}
      
      `}
    </style>
    <div className="otp-container">
      <div className="otp-card">
        <h2>OTP Verification</h2>
        <p className="subtitle">
    We have sent a 6-digit OTP to your registered email.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="otp-inputs" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-box"
              />
            ))}
          </div>

          {message.text && (
            <div className={`message-box ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" className="submit-btn" disabled = {otpLoading}>
           {otpLoading ? <ThreeDotsLoader /> : "Verify OTP"}
          </button>
        </form>

        <div className="resend-section">
          {canResend ? (
            <p>
              OTP nahi mila?{' '}
              <button type="button" onClick={handleResend} className="resend-btn">
                Resend OTP
              </button>
            </p>
          ) : (
            <p className="timer-text">Resend OTP in {timer}s</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
}