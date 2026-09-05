import React, { useState } from "react";

const initialOrders = [
  {
    id: "#ORD001",
    customer: {
      name: "Rahul",
      email: "rahul@example.com",
      phone: "9876543210",
      address: "Indore, Madhya Pradesh",
    },
    date: "04 Sep 2026",
    amount: "₹2,499",
    status: "Pending",
    paymentMethod: "Razorpay",
    paymentStatus: "Paid",
    items: [
      { name: "T-Shirt", qty: 2, price: "₹1,198" },
      { name: "Shoes", qty: 1, price: "₹1,299" },
    ],
  },
  {
    id: "#ORD002",
    customer: {
      name: "Amit",
      email: "amit@example.com",
      phone: "9812345678",
      address: "Bhopal, Madhya Pradesh",
    },
    date: "03 Sep 2026",
    amount: "₹1,299",
    status: "Shipped",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    items: [{ name: "Shoes", qty: 1, price: "₹1,299" }],
  },
  {
    id: "#ORD003",
    customer: {
      name: "Neha",
      email: "neha@example.com",
      phone: "9988776655",
      address: "Mumbai, Maharashtra",
    },
    date: "02 Sep 2026",
    amount: "₹3,499",
    status: "Delivered",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    items: [
      { name: "Smart Watch", qty: 1, price: "₹2,499" },
      { name: "T-Shirt", qty: 1, price: "₹1,000" },
    ],
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [currentStatus, setCurrentStatus] = useState("");

  const handleView = (order) => {
    setSelectedOrder(order);
    setCurrentStatus(order.status);
  };

  const handleUpdateStatus = () => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === selectedOrder.id ? { ...ord, status: currentStatus } : ord
      )
    );
    setSelectedOrder((prev) => ({ ...prev, status: currentStatus }));
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchesPayment =
      paymentFilter === "All" || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status) => {
    if (status === "Pending") return { bg: "#fef3c7", color: "#d97706" };
    if (status === "Shipped") return { bg: "#e0f2fe", color: "#0284c7" };
    if (status === "Delivered") return { bg: "#dcfce7", color: "#16a34a" };
    return { bg: "#f1f5f9", color: "#475569" };
  };

  return (
    <>
      <style>{`
        .orders-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
        }

        .filters-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-input, .filter-select {
          padding: 9px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          font-size: 0.9rem;
          background-color: #ffffff;
        }

        .filter-input {
          width: 240px;
        }

        .filter-input:focus, .filter-select:focus {
          border-color: #3b82f6;
        }

        .table-card {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }

        .orders-table th {
          background-color: #f8fafc;
          color: #475569;
          font-weight: 600;
          padding: 14px 18px;
          border-bottom: 1px solid #e2e8f0;
        }

        .orders-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .orders-table tr:last-child td {
          border-bottom: none;
        }

        .status-pill {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
        }

        .view-btn {
          background-color: #f1f5f9;
          color: #2563eb;
          border: 1px solid #cbd5e1;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .view-btn:hover {
          background-color: #e2e8f0;
        }

        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding: 8px 0;
        }

        .page-btn {
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #334155;
          min-width: 34px;
          height: 34px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 0.85rem;
        }

        .page-btn.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: #ffffff;
          font-weight: 600;
        }

        /* Order Details View */
        .back-btn {
          align-self: flex-start;
          background: none;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
          color: #475569;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          margin-bottom: 12px;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .detail-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .detail-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid #e2e8f0;
        }

        .detail-row {
          font-size: 0.9rem;
          color: #334155;
          margin: 6px 0;
        }

        .items-mini-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
          margin-top: 6px;
        }

        .items-mini-table th {
          text-align: left;
          color: #64748b;
          padding: 6px 0;
          border-bottom: 1px solid #f1f5f9;
        }

        .items-mini-table td {
          padding: 8px 0;
          border-bottom: 1px solid #f8fafc;
        }

        .update-btn {
          background-color: #3b82f6;
          color: #ffffff;
          border: none;
          padding: 9px 18px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 12px;
        }

        .update-btn:hover {
          background-color: #2563eb;
        }
      `}</style>

      <div className="orders-container">
        {!selectedOrder ? (
          <>
            <h2 className="page-title">Orders</h2>

            <div className="filters-row">
              <input
                type="text"
                className="filter-input"
                placeholder="Search order..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">Status ▼</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <select
                className="filter-select"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="All">Payment ▼</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
              <select className="filter-select">
                <option value="All">Date ▼</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="table-card">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => {
                    const badge = getStatusBadge(ord.status);
                    return (
                      <tr key={ord.id}>
                        <td style={{ fontWeight: "600", color: "#0f172a" }}>
                          {ord.id}
                        </td>
                        <td>{ord.customer.name}</td>
                        <td>{ord.date}</td>
                        <td style={{ fontWeight: "600" }}>{ord.amount}</td>
                        <td>
                          <span
                            className="status-pill"
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.color,
                            }}
                          >
                            {ord.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="view-btn"
                            onClick={() => handleView(ord)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="pagination-container">
              <button className="page-btn">‹</button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">›</button>
            </div>
          </>
        ) : (
          <div>
            <button className="back-btn" onClick={() => setSelectedOrder(null)}>
              ← Back to Orders
            </button>

            <h2 className="page-title" style={{ marginBottom: "20px" }}>
              Order {selectedOrder.id}
            </h2>

            <div className="details-grid">
              <div className="detail-card">
                <h3 className="detail-card-title">Customer</h3>
                <p className="detail-row">
                  <strong>Name:</strong> {selectedOrder.customer.name}
                </p>
                <p className="detail-row">
                  <strong>Email:</strong> {selectedOrder.customer.email}
                </p>
                <p className="detail-row">
                  <strong>Phone:</strong> {selectedOrder.customer.phone}
                </p>
              </div>

              <div className="detail-card">
                <h3 className="detail-card-title">Order Items</h3>
                <table className="items-mini-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((it, idx) => (
                      <tr key={idx}>
                        <td>{it.name}</td>
                        <td>{it.qty}</td>
                        <td>{it.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="detail-card">
                <h3 className="detail-card-title">Payment</h3>
                <p className="detail-row">
                  <strong>Method:</strong> {selectedOrder.paymentMethod}
                </p>
                <p className="detail-row">
                  <strong>Status:</strong> {selectedOrder.paymentStatus}
                </p>
              </div>

              <div className="detail-card">
                <h3 className="detail-card-title">Delivery Address</h3>
                <p className="detail-row">{selectedOrder.customer.address}</p>
              </div>

              <div className="detail-card" style={{ gridColumn: "1 / -1" }}>
                <h3 className="detail-card-title">Order Status</h3>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <select
                    className="filter-select"
                    value={currentStatus}
                    onChange={(e) => setCurrentStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <button className="update-btn" onClick={handleUpdateStatus}>
                    Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;