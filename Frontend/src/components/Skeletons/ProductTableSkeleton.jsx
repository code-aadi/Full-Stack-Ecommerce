import React from 'react';

const ProductTableSkeleton = ({ rows = 6 }) => {
  return (
    <>
      <style>{`
        .table-sk-pulse {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: tableSkShimmer 1.5s infinite;
          border-radius: 4px;
          display: inline-block;
        }

        @keyframes tableSkShimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="table-card" aria-hidden="true">
        <div className="table-scroll">
          <table className="product-table" style={{ minWidth: "650px" }}>
            <thead>
              <tr>
                <th style={{ width: "80px" }}>Img</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th style={{ width: "160px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rows }).map((_, index) => (
                <tr key={index}>
                  {/* Product Image Thumbnail */}
                  <td style={{ width: "80px" }}>
                    <div
                      className="table-sk-pulse"
                      style={{ width: "42px", height: "42px", borderRadius: "6px", display: "block" }}
                    />
                  </td>

                  {/* Product Name (Thoda random width realistic look ke liye) */}
                  <td>
                    <div
                      className="table-sk-pulse"
                      style={{ width: index % 2 === 0 ? "70%" : "50%", height: "15px" }}
                    />
                  </td>

                  {/* Category Pill */}
                  <td>
                    <div
                      className="table-sk-pulse"
                      style={{ width: "75px", height: "22px", borderRadius: "12px" }}
                    />
                  </td>

                  {/* Price */}
                  <td>
                    <div
                      className="table-sk-pulse"
                      style={{ width: "60px", height: "16px" }}
                    />
                  </td>

                  {/* Actions (Edit & Delete Buttons) */}
                  <td style={{ width: "160px" }}>
                    <div className="actions-cell" style={{ display: "flex", gap: "8px" }}>
                      <div
                        className="table-sk-pulse"
                        style={{ width: "52px", height: "28px", borderRadius: "6px" }}
                      />
                      <div
                        className="table-sk-pulse"
                        style={{ width: "58px", height: "28px", borderRadius: "6px" }}
                      />
                    </div>
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

export default ProductTableSkeleton;