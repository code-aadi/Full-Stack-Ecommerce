import React, { useState } from "react";

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", products: 24, description: "Gadgets, phones and tech items" },
    { id: 2, name: "Clothing", products: 18, description: "Men and women casual wear" },
    { id: 3, name: "Shoes", products: 12, description: "Footwear, sneakers and formals" },
  ]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setEditId(null);
    setFormData({ name: "", description: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditId(cat.id);
    setFormData({ name: cat.name, description: cat.description || "" });
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editId) {
      setCategories(
        categories.map((c) =>
          c.id === editId ? { ...c, name: formData.name, description: formData.description } : c
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        name: formData.name,
        products: 0,
        description: formData.description,
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <>
      <style>{`
        .categories-page {
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

        .table-card {
          background-color: #ffffff;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .category-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.92rem;
        }

        .category-table th {
          background-color: #f8fafc;
          color: #475569;
          font-weight: 600;
          padding: 14px 18px;
          border-bottom: 1px solid #e2e8f0;
        }

        .category-table td {
          padding: 14px 18px;
          border-bottom: 1px solid #f1f5f9;
          color: #334155;
          vertical-align: middle;
        }

        .category-table tr:last-child td {
          border-bottom: none;
        }

        .badge-count {
          background-color: #f1f5f9;
          color: #475569;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 0.85rem;
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

        /* Modal Overlay & Form */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(15, 23, 42, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
        }

        .modal-box {
          background-color: #ffffff;
          width: 100%;
          max-width: 440px;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 0.88rem;
          font-weight: 600;
          color: #475569;
        }

        .form-input, .form-textarea {
          width: 100%;
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          font-size: 0.9rem;
          box-sizing: border-box;
          font-family: inherit;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: #3b82f6;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 10px;
        }

        .cancel-btn {
          background-color: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          cursor: pointer;
          font-weight: 500;
        }

        .cancel-btn:hover {
          background-color: #e2e8f0;
        }

        .save-btn {
          background-color: #3b82f6;
          border: none;
          color: #ffffff;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          cursor: pointer;
          font-weight: 600;
        }

        .save-btn:hover {
          background-color: #2563eb;
        }
      `}</style>

      <div className="categories-page">
        <div className="page-header">
          <h2 className="page-title">Categories</h2>
          <button className="add-btn" onClick={openAddModal}>
            + Add Category
          </button>
        </div>

        <div>
          <input
            type="text"
            className="search-input"
            placeholder="Search category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-card">
          <table className="category-table">
            <thead>
              <tr>
                <th style={{ width: "60px" }}>#</th>
                <th>Category Name</th>
                <th>Products</th>
                <th style={{ width: "160px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr key={category.id}>
                  <td style={{ color: "#64748b" }}>{index + 1}</td>
                  <td style={{ fontWeight: "500", color: "#0f172a" }}>{category.name}</td>
                  <td>
                    <span className="badge-count">{category.products}</span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button className="edit-btn" onClick={() => openEditModal(category)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(category.id)}>
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
          <button className="page-btn">›</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editId ? "Edit Category" : "Add Category"}</h3>
            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="form-group">
                <label>Category Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter category description..."
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminCategories;