import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContext';
import { useAlert } from '../../../Context/AlertContext';

const Sidebar = () => {
  const {showAlert} = useAlert()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Orders', path: '/admin/orders', icon: '🛍' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];
    const {logout, logoutLoading} = useContext(AuthContext)
const navigate = useNavigate()

  const closeMobileMenu = () => setIsMobileOpen(false)
  const toggleMobileMenu = () => setIsMobileOpen(prev => !prev)

  const handleLogout = async() => {
   const result = await logout()
   if(result.success){
  showAlert(result.message, "success")
  navigate("/")
   }else{
    showAlert(result.message, "error")
   }
   closeMobileMenu()
  };

  return (
    <>
      <style>{`
        .admin-sidebar {
          width: 250px;
          height: 100vh;
          background-color: #1e293b;
          color: #e2e8f0;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          position: sticky;
          top: 0;
          left: 0;
          flex-shrink: 0;
        }

        .sidebar-brand {
          padding: 20px 24px;
          font-size: 1.25rem;
          font-weight: 700;
          border-bottom: 1px solid #334155;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #ffffff;
        }

        .sidebar-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 16px 12px;
          gap: 6px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .nav-item:hover {
          background-color: #334155;
          color: #f8fafc;
        }

        .nav-item.active {
          background-color: #3b82f6;
          color: #ffffff;
        }

        .sidebar-bottom {
          padding: 16px 12px;
          border-top: 1px solid #334155;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .logout-btn {
          width: 100%;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }

        .logout-btn:hover {
          background-color: #ef4444;
          color: #ffffff;
        }

        /* ---- Mobile hamburger toggle ---- */
        .mobile-toggle-btn {
          display: none;
          position: fixed;
          top: 14px;
          left: 14px;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          background-color: #1e293b;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          cursor: pointer;
          z-index: 1100;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }

        .sidebar-overlay {
          display: none;
        }

        /* ---- Mobile / tablet behaviour ---- */
        @media (max-width: 768px) {
          .mobile-toggle-btn {
            display: flex;
          }

          .admin-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            z-index: 1050;
            box-shadow: 4px 0 16px rgba(0,0,0,0.2);
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          .sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 1040;
          }
        }

        @media (max-width: 360px) {
          .admin-sidebar {
            width: 220px;
          }
        }
      `}</style>

      <button
        type="button"
        className="mobile-toggle-btn"
        onClick={toggleMobileMenu}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? '✕' : '☰'}
      </button>

      {isMobileOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu}></div>
      )}

      <aside className={`admin-sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span>🛒</span> MyStore
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                isActive ? 'nav-item active' : 'nav-item'
              }
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <NavLink
            to="/admin/dashboard"
            onClick={()=>{
              closeMobileMenu()
              showAlert("Work on the Admin Panel Setting is in progress", "error")
            }
            }
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span>⚙</span>
            <span>Settings</span>
          </NavLink>

          <button onClick={handleLogout} disabled={logoutLoading} className="nav-item logout-btn">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;