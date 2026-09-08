import React from 'react';

const Loader = ({ text = "Loading data" }) => {
  return (
    <div className="loader-container">
      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .spinner-wrapper {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 4px solid transparent;
          border-top-color: #6366f1;
          animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }

        .spinner-ring:nth-child(1) {
          animation-delay: -0.45s;
        }
        .spinner-ring:nth-child(2) {
          animation-delay: -0.3s;
          border-top-color: #a855f7;
        }
        .spinner-ring:nth-child(3) {
          animation-delay: -0.15s;
          border-top-color: #ec4899;
        }

        .spinner-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          background: #6366f1;
          border-radius: 50%;
          animation: pulse 1.2s ease-in-out infinite;
        }

        .loader-text {
          margin-top: 1.25rem;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: #4b5563;
          text-transform: uppercase;
          display: flex;
          align-items: center;
        }

        .dots::after {
          content: '';
          display: inline-block;
          animation: ellipsis 1.5s infinite;
          width: 1.2em;
          text-align: left;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
        }

        @keyframes ellipsis {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }
      `}</style>

      <div className="spinner-wrapper">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-core"></div>
      </div>

      <p className="loader-text">
        {text}<span className="dots"></span>
      </p>
    </div>
  );
};

export default Loader;