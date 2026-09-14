import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDetail = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(false)
  const [totalOrders, setTotalOrders] = useState(0);

const {userId} = useParams()

  useEffect(() => {
   const fetchUser = async () => {
    if(!userId) return
    setLoading(true)
      try {
        const response = await fetch(`http://localhost:2310/api/admin/users/${userId}`)
        const data = await response.json()
        setUser(data.userData)
        console.log(data.userData)
        setTotalOrders(data.userData.orderCount)
      } catch (error) {
        alert(error.message)
      }finally{
        setLoading(false)
      }
    }
fetchUser()
   
   
    
  }, [userId]);

  const handleToggleRole = async() => {
    if (!user) return;
    const newRole = user.role === "admin" ? "user" : "admin";
    
    const confirmChange = window.confirm(
      `Kya aap sach me ${user.name} ka role badalkar "${newRole.toUpperCase()}" karna chahte hain?`
    );

    if (confirmChange) {
     setRoleLoading(true)
      try {
        const response = await fetch(`http://localhost:2310/api/admin/users/${userId}`,{
          method : "PATCH",
          headers : {
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({newRole})
        })
        const data = await response.json()
        if(!response.ok){
          alert(data.message || "something went wrong")
        }else{
              setUser((prev) => ({ ...prev, role: newRole }));
      alert(data.message || "role changed successfully")
        }
      } catch (error) {
        alert(error.message)
      }finally{
        setRoleLoading(false)
      }
      
    }
  };

  if (loading) return <div className="loading-box">Loading user details...</div>;
  if (!user) return <div className="loading-box">User Not Found!</div>;

  
  const hasDefaultAddress =
    user.defaultAddress &&
    (user.defaultAddress.flatNo ||
      user.defaultAddress.city ||
      user.defaultAddress.phone);

  return (
    <>
      <style>{`
        .user-detail-container {
          padding: 24px;
          max-width: 1000px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #0f172a;
        }

        .back-btn {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 16px;
        }

        .back-btn:hover {
          background: #f1f5f9;
        }

        .user-header-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .user-identity {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .user-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #e0f2fe;
          color: #0369a1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .user-identity h2 {
          margin: 0;
          font-size: 1.3rem;
          color: #0f172a;
        }

        .user-identity p {
          margin: 4px 0 0 0;
          color: #64748b;
          font-size: 0.9rem;
        }

        .role-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: capitalize;
          margin-left: 8px;
        }

        .role-badge.user {
          background: #e0f2fe;
          color: #0284c7;
        }

        .role-badge.admin {
          background: #fef3c7;
          color: #d97706;
        }

        .role-action-btn {
          padding: 9px 16px;
          border-radius: 6px;
          border: none;
          font-weight: 600;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .make-admin-btn {
          background: #2563eb;
          color: #ffffff;
        }

        .make-admin-btn:hover {
          background: #1d4ed8;
        }

        .revoke-admin-btn {
          background: #fee2e2;
          color: #dc2626;
        }

        .revoke-admin-btn:hover {
          background: #fecaca;
        }

        /* 2-column details layout */
        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        .info-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .info-card h3 {
          margin: 0 0 16px 0;
          font-size: 1rem;
          color: #0f172a;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .row-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          font-size: 0.9rem;
        }

        .row-item .label {
          color: #64748b;
        }

        .row-item .val {
          color: #1e293b;
          font-weight: 500;
          text-align: right;
        }

        /* Address formatting */
        .address-box {
          line-height: 1.6;
          font-size: 0.9rem;
          color: #334155;
        }

        .address-tag {
          display: inline-block;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
        }

        .empty-state {
          padding: 30px 10px;
          text-align: center;
          color: #94a3b8;
          font-size: 0.9rem;
        }

        .security-note {
          background: #f8fafc;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 14px;
          border: 1px dashed #cbd5e1;
        }

        .loading-box {
          padding: 40px;
          text-align: center;
          font-size: 1rem;
          color: #64748b;
        }
      `}</style>

      <div className="user-detail-container">
        {onBack && (
          <button className="back-btn" onClick={onBack}>
            ← Back to Users
          </button>
        )}

        {/* Top Header Card */}
        <div className="user-header-card">
          <div className="user-identity">
            <div className="user-avatar">{user?.name.charAt(0).toUpperCase()}</div>
            <div>
              <h2>
                {user?.name}
                <span className={`role-badge ${user?.role}`}>{user?.role}</span>
              </h2>
              <p>{user?.email}</p>
            </div>
          </div>

          {/* Admin Role Toggle Button */}
         {user.isSuperAdmin && (
           <div>
            {user?.role === "user" ? (
              <button
                            disabled = {roleLoading}

                className="role-action-btn make-admin-btn"
                onClick={handleToggleRole}
              >
                + Make Admin
              </button>
            ) : (
              <button
              disabled = {roleLoading}
                className="role-action-btn revoke-admin-btn"
                onClick={handleToggleRole}
              >
                Demote to User
              </button>
            )}
          </div>
         )}
        </div>

        {/* Details Grid */}
        <div className="details-grid">
          {/* Account & Activity Info */}
          <div className="info-card">
            <h3>Account Overview</h3>

            <div className="row-item">
              <span className="label">User ID:</span>
              <span className="val" style={{ fontFamily: "monospace" }}>
                {user?._id}
              </span>
            </div>

            <div className="row-item">
              <span className="label">Full Name:</span>
              <span className="val">{user?.name}</span>
            </div>

            <div className="row-item">
              <span className="label">Email Address:</span>
              <span className="val">{user?.email}</span>
            </div>

            <div className="row-item">
              <span className="label">Total Orders Placed:</span>
              <span className="val" style={{ fontWeight: "700", color: "#2563eb" }}>
                {totalOrders} Orders
              </span>
            </div>

            <div className="row-item">
              <span className="label">Joined Date:</span>
              <span className="val">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="security-note">
              🔒 <strong>Password:</strong> Encrypted (bcrypt hash stored securely in DB).
            </div>
          </div>

          {/* Default Address Section */}
          <div className="info-card">
            <h3>
              <span>Default Shipping Address</span>
              {hasDefaultAddress && user?.defaultAddress.addressType && (
                <span className="address-tag">
                  {user?.defaultAddress.addressType}
                </span>
              )}
            </h3>

            {hasDefaultAddress ? (
              <div className="address-box">
                <p style={{ margin: "0 0 6px 0", fontWeight: "600", color: "#0f172a" }}>
                  {user?.defaultAddress.name || user?.name}
                </p>
                <p style={{ margin: "0 0 4px 0" }}>
                  📞 {user.defaultAddress.phone || "No phone provided"}
                </p>
                <p style={{ margin: "0 0 4px 0" }}>
                  {user.defaultAddress.flatNo}
                  {user.defaultAddress.street ? `, ${user.defaultAddress.street}` : ""}
                </p>
                {user.defaultAddress.landmark && (
                  <p style={{ margin: "0 0 4px 0", color: "#64748b" }}>
                    Landmark: {user.defaultAddress.landmark}
                  </p>
                )}
                <p style={{ margin: "0 0 4px 0" }}>
                  {user.defaultAddress.city}, {user.defaultAddress.state} -{" "}
                  <strong>{user.defaultAddress.pincode}</strong>
                </p>
              </div>
            ) : (
              <div className="empty-state">
                <p style={{ margin: "0 0 6px 0", fontSize: "1.5rem" }}>📍</p>
                <p style={{ margin: 0 }}>No default address saved by this user.</p>
                <small style={{ color: "#94a3b8" }}>
                  (Addresses are added when a user selects 'Save as default' at checkout)
                </small>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;