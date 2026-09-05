import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminNavbar />
        <main style={{ flex: 1, padding: "24px", backgroundColor: '#f8fafc', overflowY: 'auto' }}>
          <Outlet />
        </main> 
      </div>
    </div>
  );
}

export default AdminLayout;