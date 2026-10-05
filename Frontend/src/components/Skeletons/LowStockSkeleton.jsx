import React from 'react';

const LowStockSkeleton = ({ rows = 5 }) => {
  return (
    <>
      <style>{`
        .low-stock-sk-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: lowStockShimmer 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes lowStockShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="table-card" aria-hidden="true">
        <div className="table-scroll">
          <table className="dash-table" style={{ minWidth: "320px" }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, index) => (
                <tr key={index}>
                  {/* Product Name placeholder (max-width: 160px match) */}
                  <td style={{ maxWidth: "160px" }}>
                    <div
                      className="low-stock-sk-pulse"
                      style={{ width: index % 2 === 0 ? "130px" : "100px", height: "14px" }}
                    />
                  </td>

                  {/* Stock Badge placeholder */}
                  <td style={{ whiteSpace: "nowrap" }}>
                    <div
                      className="low-stock-sk-pulse"
                      style={{ width: "55px", height: "22px", borderRadius: "12px" }}
                    />
                  </td>

                  {/* Action View Button placeholder */}
                  <td style={{ whiteSpace: "nowrap" }}>
                    <div
                      className="low-stock-sk-pulse"
                      style={{ width: "48px", height: "26px", borderRadius: "6px" }}
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

export default LowStockSkeleton;