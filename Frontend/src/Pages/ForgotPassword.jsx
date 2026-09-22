import React, { useState } from 'react';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
    const [isButtonDisable, setIsButtonDisable] = useState(false)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:2310/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        
        setMessage(data.message || 'Password reset link aapke email par bhej diya gaya hai.');
        setIsSuccess(true);
      } else {
        if(response.status === 429){
          setIsButtonDisable(true)
        }
        setMessage(data.message || 'Kuch gadbad hui, kripya firse koshish karein.');
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage('Server se connect nahi ho paya. Kripya baad me try karein.');
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-card">
        {!isSuccess ? (
         
          <>
            <div className="card-header">
              <div className="icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h2>Forgot Password?</h2>
              <p>Enter your registered email address to receive a password reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="forgot-form">
              <div className="input-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {message && !isSuccess && (
                <div className="error-alert-forgot">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{message}</span>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={loading || isButtonDisable}>
                {loading ? (
                  <span className="btn-loader">
                    <span className="spinner"></span> sending email...
                  </span>
                ) : (
                  <> { isButtonDisable ? 'Blocked 🔒' : 'Send Resent Link'}</>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="success-state">
            <div className="icon-badge success-badge">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 17H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <h2>Check Your Inbox</h2>
            <p className="success-message">{message}</p>

            <button 
              type="button" 
              className="outline-btn"
              onClick={() => {
                setIsSuccess(false);
                setMessage('');
              }}
            >
              Try another email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;