import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Categories', path: '/admin/categories', icon: '🗂' },
    { name: 'Orders', path: '/admin/orders', icon: '🛍' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
  ];

  const handleLogout = () => {
    // Logout logic yahan add karein (clear token/localStorage)
    console.log('User logged out');
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
      `}</style>

      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span>🛒</span> MyStore
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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
            to="/admin/settings"
            className={({ isActive }) =>
              isActive ? 'nav-item active' : 'nav-item'
            }
          >
            <span>⚙</span>
            <span>Settings</span>
          </NavLink>

          <button onClick={handleLogout} className="nav-item logout-btn">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;