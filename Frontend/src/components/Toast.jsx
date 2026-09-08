import React, { useEffect } from 'react';
import '../styles/Toast.css';

const typeConfig = {
  add: {
    title: 'Product Added!',
    symbol: '✓'
  },
  update: {
    title: 'Product Updated!',
    symbol: '✎'
  },
  delete: {
    title: 'Product Removed!',
    symbol: '✕'
  }
};

const Toast = ({ type = 'add', message, isOpen, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  const current = typeConfig[type] || typeConfig.add;

  return (
    <div className="toast-container">
      <div className={`toast-card ${type}`}>
        <div className="toast-icon-box">
          {current.symbol}
        </div>

        <div className="toast-content">
          <h4 className="toast-title">{current.title}</h4>
          <p className="toast-message">{message}</p>
        </div>

        <button className="toast-close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;