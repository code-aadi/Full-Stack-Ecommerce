import React, { useState } from 'react';

const AdminNavbar = ({ onMenuClick, isSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <style>{`
        .admin-navbar {
          height: 64px;
          background-color: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: sticky;
          top: 0;
          z-index: 500;
          gap: 12px;
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .menu-toggle-btn {
          display: none;
          background: none;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          cursor: pointer;
          flex-shrink: 0;
          color: #334155;
          transition: background-color 0.2s ease;
        }

        .menu-toggle-btn:hover {
          background-color: #f1f5f9;
        }

        .navbar-title {
          font-size: 1.15rem;
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-shrink: 0;
        }

        .notify-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 6px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease;
        }

        .notify-btn:hover {
          background-color: #f1f5f9;
        }

        .badge-dot {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
        }

        .profile-container {
          position: relative;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 8px;
          transition: background-color 0.2s ease;
        }

        .profile-trigger:hover {
          background-color: #f1f5f9;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #3b82f6;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: 600;
          flex-shrink: 0;
        }

        .admin-name {
          font-size: 0.95rem;
          font-weight: 500;
          color: #334155;
          white-space: nowrap;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: calc(100% + 8px);
          width: 170px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.08);
          padding: 6px 0;
          display: flex;
          flex-direction: column;
          z-index: 600;
        }

        .dropdown-item {
          padding: 10px 16px;
          text-align: left;
          background: none;
          border: none;
          font-size: 0.9rem;
          color: #475569;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .dropdown-item:hover {
          background-color: #f8fafc;
          color: #0f172a;
        }

        .dropdown-item.danger {
          color: #ef4444;
          border-top: 1px solid #f1f5f9;
        }

        /* ---------------- Responsive ---------------- */
        @media (max-width: 768px) {
          .menu-toggle-btn {
            display: flex;
          }

          .admin-navbar {
            padding: 0 16px;
          }

          .navbar-title {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .admin-navbar {
            padding: 0 12px;
            gap: 8px;
          }

          .navbar-actions {
            gap: 10px;
          }

          .admin-name {
            display: none;
          }

          .profile-trigger {
            padding: 6px;
          }

          .navbar-title {
            font-size: 0.95rem;
          }
        }
      `}</style>

      <header className="admin-navbar">
        <div className="navbar-left">
          <button
            type="button"
            className="menu-toggle-btn"
            onClick={onMenuClick}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? '✕' : '☰'}
          </button>
          <div className="navbar-title">Admin Panel</div>
        </div>

        <div className="navbar-actions">
          <button className="notify-btn" aria-label="Notifications">
            <span>🔔</span>
            <span className="badge-dot"></span>
          </button>

          <div className="profile-container">
            <button
              className="profile-trigger"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="avatar">A</div>
              <span className="admin-name">Admin ▾</span>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">My Profile</button>
                <button className="dropdown-item">Account Settings</button>
                <button className="dropdown-item danger">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminNavbar;