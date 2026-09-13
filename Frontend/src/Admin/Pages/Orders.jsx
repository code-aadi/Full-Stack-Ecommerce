import React, { useEffect, useState } from "react";
import getStatusBadge from "../Components/StatusBadge";
import Pagination from "../../components/Pagination";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../../../Hooks/useDebounce";



const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
const [searchParam] = useSearchParams()
    const [totalPages, setTotalPages] = useState(10);
    const page = searchParam.get("page") || 1;
    const limit = searchParam.get("limit") || 10;
const [dateFilter, setDateFilter] = useState("All")
  const debounceValue = useDebounce(searchTerm, 300)


const navigate = useNavigate()
const formatDate = (dateString) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
 
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short", 
    year: "numeric"
  });
};
  const handleView = (orderId) => {
  navigate(`/admin/orders/${orderId}`)
  };


useEffect(()=>{
  async function fetchOrders(){
      const url = new URL("http://localhost:2310/api/admin/orders")
    url.searchParams.set("page", page)
    url.searchParams.set("limit", limit)
      url.searchParams.set("search", debounceValue)
   url.searchParams.set("orderStatus" , statusFilter)
   url.searchParams.set("paymentStatus" , paymentFilter)
   url.searchParams.set("dateFilter" , dateFilter)
    try {
      const response = await fetch(url)
      const data = await response.json()
      setOrders(data?.orders)
      console.log(dateFilter)
      setTotalPages(data.totalPages)
     
    } catch (error) {
      
    }
  }
fetchOrders()
},[page, limit,debounceValue, statusFilter, paymentFilter, dateFilter])

 

 

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
      `}</style>

      <div className="orders-container">
        <h2 className="page-title">Orders</h2>

        <div className="filters-row">
          <input
            type="text"
            className="filter-input"
            placeholder="order id / customer name"
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
            <option value="Failed">Failed</option>
          </select>
          <select className="filter-select"
          value={dateFilter}
          onChange={(e)=> setDateFilter(e.target.value)}
          >
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
              {orders?.map((ord) => {
               
                const badge = getStatusBadge(ord?.orderStatus);
                const formattedId = ord._id && ord._id.length > 8 
    ? `#...${ord._id.slice(-6)}` 
    : ord._id;
                return (
                  <tr key={ord?._id}>
                    <td style={{ fontWeight: "600", color: "#0f172a" }}>
                      {formattedId}
                    </td>
                    <td>{ord?.shippingAddress?.fullName?.split(" ")[0]}</td>
                    <td>{formatDate(ord?.createdAt)}</td>
                    <td style={{ fontWeight: "600" }}>₹{ord?.totalAmount?.toFixed(2)}</td>
                    <td>
                      <span
                        className="status-pill"
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {ord.orderStatus}
                      </span>
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => handleView(ord._id)}
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

        
      <Pagination page={page} totalPages={totalPages} limit={limit} />
      </div>
    </>
  );
};

export default Orders;