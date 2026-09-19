import React, { useEffect } from 'react';
import '../styles/AlertModal.css';

const AlertModal = ({ message, type = "success", onClose, duration = 200 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isError = type === 'error';

  return (
    <div className="meesho-alert-wrap">
      <div className={`meesho-alert-pill ${isError ? 'meesho-error' : 'meesho-success'}`}>
        <span className="meesho-icon">
          {isError ? '✕' : '✓'}
        </span>
        <span className="meesho-text">{message}</span>
      </div>
    </div>
  );
};

export default AlertModal;