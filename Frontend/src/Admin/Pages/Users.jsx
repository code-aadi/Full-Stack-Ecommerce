import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../../../Hooks/useDebounce";
import Pagination from "../../components/Pagination";



const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [searhParams] = useSearchParams()
  const page = searhParams.get("page") || 1
  const limit = searhParams.get("limit") || 10
const [totalPages, setTotalPages] = useState(0)
const debounceValue = useDebounce(searchTerm, 300)
  useEffect(()=>{
 async function fetchUsers() {
  const url = new URL("http://localhost:2310/api/admin/users")
  url.searchParams.set("search", debounceValue)
  url.searchParams.set("roleFilter", roleFilter)
  url.searchParams.set("page", page)
  url.searchParams.set("limit", limit)
  try {
    const response = await fetch(url)
    const data = await response.json()
   setUsers(data.users)
   setTotalPages(data.totalPages)
  } catch (error) {
    console.log(error)
  }
 }
 fetchUsers()
  },[debounceValue, roleFilter, page, limit])

  const getRoleBadge = (role) => {
    if (role === "admin") return { bg: "#fef3c7", color: "#b45309" };
    return { bg: "#e0f2fe", color: "#0369a1" };
  };

  const navigate = useNavigate()
  

  return (
    <>
      <style>{`
        .users-container {
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
          width: 250px;
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

        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }

        .custom-table th {
          background-color: #f8fafc;
          color: #475569;
          font-weight: 600;
          padding: 14px 18px;
          border-bottom: 1px solid #e2e8f0;
        }

        .custom-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .custom-table tr:last-child td {
          border-bottom: none;
        }

        .badge {
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

        .back-btn {
          align-self: flex-start;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .back-btn:hover {
          background-color: #f8fafc;
        }

        .details-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .profile-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .profile-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f1f5f9;
        }

        .profile-fields-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .profile-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .field-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .field-value {
          font-size: 0.95rem;
          color: #0f172a;
          font-weight: 500;
        }

        .section-subtitle {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
        }
      `}</style>

      <div className="users-container">

          <>
            <h2 className="page-title">Users</h2>

            <div className="filters-row">
              <input
                type="text"
                className="filter-input"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="filter-select"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="All">Role ▼</option>
                <option value="User">User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="table-card">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ width: "60px" }}>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Orders</th>
                    <th style={{ width: "100px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, index) => {
                    const roleBadge = getRoleBadge(u.role);
                    return (
                      <tr key={u.id}>
                        <td style={{ color: "#64748b" }}>{index + 1}</td>
                        <td style={{ fontWeight: "500", color: "#0f172a" }}>{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <span
                            className="badge"
                            style={{
                              backgroundColor: roleBadge.bg,
                              color: roleBadge.color,
                            }}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td style={{ fontWeight: "600" }}>{u.orderCount}</td>
                        <td>
                          <button
                            className="view-btn"
                            onClick={() => navigate(`/admin/users/${u._id}`)}
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

         <Pagination totalPages={totalPages} limit={limit} page={page}/>
          </>
        
      </div>
    </>
  );
};

export default Users;