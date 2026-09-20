import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [checkingToken, setCheckingToken] = useState(true);
  const [isValid, setIsValid] = useState(false);

  // Form States
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await fetch(`http://localhost:2310/api/auth/verify-token/${token}`);
        const data = await res.json();
        
        if (data.isValid) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (err) {
        setIsValid(false);
      } finally {
        setCheckingToken(false);
      }
    };

    if (token) {
      checkToken();
    } else {
      setIsValid(false);
      setCheckingToken(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Both passwords are not matching!');
      return;
    }

    if (password.length < 6) {
      setMessage('The password must be at least 6 characters long.');
      return;
    }

    setSubmitLoading(true);

    try {
      const response = await fetch(`http://localhost:2310/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Password successfully change ho gaya! Redirecting...');
        setTimeout(() => {
          navigate('/login');
        }, 2200);
      } else {
        setMessage(data.message || 'Token expire ho chuka hai ya koi error aayi.');
        setIsSuccess(false);
      }
    } catch (err) {
      setMessage('Server se connect nahi ho paya. Kripya firse koshish karein.');
      setIsSuccess(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  
  if (checkingToken) {
    return (
      <div className="reset-wrapper">
        <div className="reset-card token-status-box">
          <div className="spinner token-spinner"></div>
          <h3>Verifying reset link...</h3>
          <p>Please wait a moment; the link is being verified..</p>
        </div>
      </div>
    );
  }

  
  if (!isValid) {
    return (
      <div className="reset-wrapper">
        <div className="reset-card token-status-box">
          <div className="icon-badge error-badge">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>
          <h2>Invalid or Expired Link</h2>
          <p className="token-error-desc">
           This link has expired or has already been used. Please request a new reset link.
          </p>
          <Link to="/forgot-password" className="submit-btn full-btn">
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  // Case C: Token valid hai - Tabhi Form dikhega
  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        {!isSuccess ? (
          <>
            <div className="card-header">
              <div className="icon-badge">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 2l-2 2m-1.5 1.5L16 7l-1.5-1.5-1.5 1.5-1.5-1.5-1.5 1.5L9 7l-1.5-1.5-4.5 4.5a3 3 0 0 0 4.24 4.24L8 15l2-2"></path>
                  <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                </svg>
              </div>
              <h2>Set New Password</h2>
              <p>The password must be at least 6 characters long.</p>
            </div>

            <form onSubmit={handleSubmit} className="reset-form">
              {/* New Password */}
              <div className="input-field">
                <label>New Password</label>
                <div className="input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="input-field">
                <label>Confirm Password</label>
                <div className="input-container">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex="-1"
                  >
                    {showConfirmPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {message && !isSuccess && (
                <div className="error-alert">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{message}</span>
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={submitLoading}>
                {submitLoading ? (
                  <span className="btn-loader">
                    <span className="spinner"></span> Updating...
                  </span>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="success-state">
            <div className="icon-badge success-badge">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2>Password Updated!</h2>
            <p className="success-message">{message}</p>
            <div className="redirect-hint">Redirecting to login in a moment...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;