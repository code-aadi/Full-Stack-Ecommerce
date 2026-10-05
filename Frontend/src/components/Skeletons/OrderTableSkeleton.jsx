import React from 'react';

const OrdersTableSkeleton = ({ rows = 6 }) => {
  return (
    <>
      <style>{`
        .orders-sk-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: ordersSkShimmer 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes ordersSkShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="table-scroll" aria-hidden="true">
        <table className="orders-table" style={{ minWidth: "700px" }}>
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
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                {/* 1. Order ID (e.g. #...482910) */}
                <td>
                  <div
                    className="orders-sk-pulse"
                    style={{ width: "80px", height: "15px" }}
                  />
                </td>

                {/* 2. Customer First Name */}
                <td>
                  <div
                    className="orders-sk-pulse"
                    style={{ width: index % 2 === 0 ? "75px" : "90px", height: "14px" }}
                  />
                </td>

                {/* 3. Date (e.g. 12 Oct 2024) */}
                <td>
                  <div
                    className="orders-sk-pulse"
                    style={{ width: "85px", height: "14px" }}
                  />
                </td>

                {/* 4. Total Amount (e.g. ₹1,499.00) */}
                <td>
                  <div
                    className="orders-sk-pulse"
                    style={{ width: "70px", height: "15px" }}
                  />
                </td>

                {/* 5. Status Pill */}
                <td>
                  <div
                    className="orders-sk-pulse"
                    style={{ width: "75px", height: "24px", borderRadius: "14px" }}
                  />
                </td>

                {/* 6. Action Button */}
                <td>
                  <div
                    className="orders-sk-pulse"
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

export default OrdersTableSkeleton;