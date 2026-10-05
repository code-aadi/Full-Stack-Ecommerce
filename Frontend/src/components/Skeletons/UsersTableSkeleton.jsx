import React from 'react';

const UsersTableSkeleton = ({ rows = 6 }) => {
  return (
    <>
      <style>{`
        .users-sk-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: usersSkShimmer 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes usersSkShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="table-scroll" aria-hidden="true">
        <table className="custom-table" style={{ minWidth: "700px" }}>
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
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                {/* 1. Serial Number (#) */}
                <td style={{ width: "60px" }}>
                  <div
                    className="users-sk-pulse"
                    style={{ width: "16px", height: "14px" }}
                  />
                </td>

                {/* 2. Customer Name */}
                <td>
                  <div
                    className="users-sk-pulse"
                    style={{ width: index % 2 === 0 ? "110px" : "130px", height: "15px" }}
                  />
                </td>

                {/* 3. Email */}
                <td>
                  <div
                    className="users-sk-pulse"
                    style={{ width: index % 2 === 0 ? "170px" : "150px", height: "14px" }}
                  />
                </td>

                {/* 4. Role Badge */}
                <td>
                  <div
                    className="users-sk-pulse"
                    style={{ width: "65px", height: "22px", borderRadius: "12px" }}
                  />
                </td>

                {/* 5. Orders Count */}
                <td>
                  <div
                    className="users-sk-pulse"
                    style={{ width: "24px", height: "15px" }}
                  />
                </td>

                {/* 6. Action (View Button) */}
                <td style={{ width: "100px" }}>
                  <div
                    className="users-sk-pulse"
                    style={{ width: "50px", height: "28px", borderRadius: "6px" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersTableSkeleton;