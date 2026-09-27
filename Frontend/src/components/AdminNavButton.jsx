import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .admin-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: #1e293b;
          color: #ffffff;
          border: 1px solid #334155;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .admin-btn:hover {
          background-color: #0f172a;
          border-color: #475569;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .admin-btn:active {
          transform: translateY(0);
        }

        .admin-btn-icon {
          font-size: 1rem;
          line-height: 1;
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .admin-btn {
            padding: 8px 12px;
            font-size: 0.85rem;
          }
        }
      `}</style>

      <button 
        className="admin-btn" 
        onClick={() => navigate("/admin/dashboard")}
        title="Go to Admin Panel"
      >
        <span className="admin-btn-icon">⚡</span>
        <span>Admin Panel</span>
      </button>
    </>
  );
};

export default AdminNavButton;