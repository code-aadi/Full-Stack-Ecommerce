import React from 'react';

const RecentOrdersSkeleton = ({ rows = 5 }) => {
  return (
    <>
      <style>{`
        /* Reusable Shimmer Pulse */
        .table-sk-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: table-sk-shimmer 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes table-sk-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="table-card" aria-hidden="true">
        <div className="table-scroll">
          <table className="dash-table" style={{ minWidth: "480px" }}>
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
              {Array.from({ length: rows }).map((_, index) => (
                <tr key={index}>
                  {/* Order ID placeholder */}
                  <td>
                    <div className="table-sk-pulse" style={{ width: '75px', height: '14px' }} />
                  </td>

                  {/* Customer Name placeholder */}
                  <td>
                    <div className="table-sk-pulse" style={{ width: '110px', height: '14px' }} />
                  </td>

                  {/* Amount placeholder */}
                  <td>
                    <div className="table-sk-pulse" style={{ width: '65px', height: '14px' }} />
                  </td>

                  {/* Status Badge placeholder */}
                  <td>
                    <div
                      className="table-sk-pulse"
                      style={{ width: '70px', height: '22px', borderRadius: '12px' }}
                    />
                  </td>

                  {/* Action Button placeholder */}
                  <td>
                    <div
                      className="table-sk-pulse"
                      style={{ width: '52px', height: '28px', borderRadius: '6px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecentOrdersSkeleton;