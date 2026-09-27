import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <style>{`
        .admin-main-content {
          flex: 1;
          padding: 24px;
          background-color: #f8fafc;
          overflow-y: auto;
          box-sizing: border-box;
          min-width: 0;
        }

        @media (max-width: 768px) {
          .admin-main-content {
            padding: 16px;
          }
        }

        @media (max-width: 480px) {
          .admin-main-content {
            padding: 12px;
          }
        }
      `}</style>

      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminNavbar />
        <main className="admin-main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;