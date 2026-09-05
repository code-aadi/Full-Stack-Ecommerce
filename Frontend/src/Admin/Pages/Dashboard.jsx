import React from "react";

const Dashboard = () => {
  const stats = [
    { title: "Total Sales", value: "₹1,24,500", icon: "💰", color: "#10b981" },
    { title: "Total Orders", value: "248", icon: "🛍️", color: "#3b82f6" },
    { title: "Total Users", value: "1,240", icon: "👥", color: "#8b5cf6" },
    { title: "Total Products", value: "86", icon: "📦", color: "#f59e0b" },
  ];

  const recentOrders = [
    { id: "#ORD101", customer: "Rahul", amount: "₹2,499", status: "Delivered" },
    { id: "#ORD102", customer: "Amit", amount: "₹1,299", status: "Pending" },
    { id: "#ORD103", customer: "Neha", amount: "₹3,499", status: "Shipped" },
  ];

  const lowStockProducts = [
    { name: "Nike Shoes", stock: 3 },
    { name: "T-Shirt", stock: 2 },
    { name: "Smart Watch", stock: 4 },
  ];

  const getStatusBadge = (status) => {
    if (status === "Delivered") return { bg: "#dcfce7", color: "#16a34a" };
    if (status === "Shipped") return { bg: "#e0f2fe", color: "#0284c7" };
    return { bg: "#fef3c7", color: "#d97706" };
  };

  return (
    <>
      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .stat-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .stat-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: #64748b;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
        }

        .stat-icon {
          font-size: 1.8rem;
          padding: 10px;
          border-radius: 8px;
          background-color: #f8fafc;
        }

        .section-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 12px;
        }

        .dashboard-tables-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .dashboard-tables-grid {
            grid-template-columns: 1fr;
          }
        }

        .table-card {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .dash-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }

        .dash-table th {
          background-color: #f8fafc;
          color: #475569;
          font-weight: 600;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .dash-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .dash-table tr:last-child td {
          border-bottom: none;
        }

        .badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
        }

        .stock-badge {
          background-color: #fee2e2;
          color: #dc2626;
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.85rem;
          display: inline-block;
        }

        .view-btn {
          background-color: #f1f5f9;
          color: #2563eb;
          border: 1px solid #cbd5e1;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .view-btn:hover {
          background-color: #e2e8f0;
        }
      `}</style>

      <div className="dashboard-container">
        <h2 className="page-title">Dashboard</h2>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-info">
                <span className="stat-title">{item.title}</span>
                <span className="stat-value">{item.value}</span>
              </div>
              <div className="stat-icon">{item.icon}</div>
            </div>
          ))}
        </div>

        <div className="dashboard-tables-grid">
          <div>
            <h3 className="section-title">Recent Orders</h3>
            <div className="table-card">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((ord) => {
                    const badge = getStatusBadge(ord.status);
                    return (
                      <tr key={ord.id}>
                        <td style={{ fontWeight: "600", color: "#0f172a" }}>{ord.id}</td>
                        <td>{ord.customer}</td>
                        <td style={{ fontWeight: "600" }}>{ord.amount}</td>
                        <td>
                          <span
                            className="badge"
                            style={{ backgroundColor: badge.bg, color: badge.color }}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td>
                          <button className="view-btn">View</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="section-title">Low Stock Products</h3>
            <div className="table-card">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((p, index) => (
                    <tr key={index}>
                      <td style={{ fontWeight: "500", color: "#0f172a" }}>{p.name}</td>
                      <td>
                        <span className="stock-badge">{p.stock}</span>
                      </td>
                      <td>
                        <button className="view-btn">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;