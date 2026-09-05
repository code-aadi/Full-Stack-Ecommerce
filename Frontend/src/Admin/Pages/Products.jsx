import React, { useState } from "react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [products, setProducts] = useState([
    { id: 1, name: "T-Shirt", category: "Clothes", price: 599, img: "👕" },
    { id: 2, name: "Running Shoes", category: "Footwear", price: 1999, img: "👟" },
    { id: 3, name: "Smart Watch", category: "Electronics", price: 2499, img: "⌚" },
    { id: 4, name: "Denim Jeans", category: "Clothes", price: 1299, img: "👖" },
    { id: 5, name: "Casual Sneakers", category: "Footwear", price: 1499, img: "👞" },
  ]);

  const categories = ["All", "Clothes", "Footwear", "Electronics"];

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <>
      <style>{`
        .products-page {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
        }

        .add-btn {
          background-color: #3b82f6;
          color: #ffffff;
          border: none;
          padding: 10px 18px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .add-btn:hover {
          background-color: #2563eb;
        }

        .filters-bar {
          display: flex;
          gap: 12px;
        }

        .search-input {
          padding: 9px 14px;
          width: 260px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          font-size: 0.9rem;
          background-color: #ffffff;
        }

        .search-input:focus {
          border-color: #3b82f6;
        }

        .category-select {
          padding: 9px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          font-size: 0.9rem;
          background-color: #ffffff;
          cursor: pointer;
        }

        .category-select:focus {
          border-color: #3b82f6;
        }

        .table-card {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .product-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }

        .product-table th {
          background-color: #f8fafc;
          color: #475569;
          font-weight: 600;
          padding: 14px 18px;
          border-bottom: 1px solid #e2e8f0;
        }

        .product-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .product-table tr:last-child td {
          border-bottom: none;
        }

        .img-cell {
          width: 42px;
          height: 42px;
          background-color: #f1f5f9;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }

        .category-pill {
          background-color: #eff6ff;
          color: #2563eb;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          display: inline-block;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .edit-btn, .delete-btn {
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .edit-btn {
          background-color: #e2e8f0;
          color: #334155;
        }

        .delete-btn {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .edit-btn:hover, .delete-btn:hover {
          opacity: 0.8;
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
          transition: all 0.2s ease;
        }

        .page-btn:hover {
          background-color: #f8fafc;
        }

        .page-btn.active {
          background-color: #3b82f6;
          border-color: #3b82f6;
          color: #ffffff;
          font-weight: 600;
        }
      `}</style>

      <div className="products-page">
        <div className="page-header">
          <h2 className="page-title">Products</h2>
          <button className="add-btn">+ Add Product</button>
        </div>

        <div className="filters-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "Category" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="table-card">
          <table className="product-table">
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
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="img-cell">{product.img}</div>
                  </td>
                  <td style={{ fontWeight: "500" }}>{product.name}</td>
                  <td>
                    <span className="category-pill">{product.category}</span>
                  </td>
                  <td style={{ fontWeight: "600", color: "#0f172a" }}>₹{product.price}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="edit-btn">Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-container">
          <button className="page-btn">‹</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="page-btn">›</button>
        </div>
      </div>
    </>
  );
};

export default Products;