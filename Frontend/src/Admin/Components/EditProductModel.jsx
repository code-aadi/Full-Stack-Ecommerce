import React, { useState, useEffect } from "react";
import validateForm from "../../../helper/productValidate";

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  onUpdate,
  categories = [],
  backendErrors,
  loading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    url: "",
    stock: 0,
    rating: 0,
    totalRatings: 0,
  });

  const [existingImage, setExistingImage] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (backendErrors && Object.keys(backendErrors).length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, ...backendErrors }));
    }
  }, [backendErrors]);

  useEffect(() => {
    setErrors({});
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category || "",
        subcategory: product.subcategory || "",
        url: product.url || "",
        stock: product.stock ?? 50,
        rating: product.rating ?? 0,
        totalRatings: product.totalRatings ?? 0,
      });
      setExistingImage(product.image || "");
      setImagePreview(product.image || "");
      setNewImageFile(null);
    }
  }, [product]);

  // Modal khula ho to background page scroll na ho + Esc se close
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, loading]);

  // Naya preview URL banne par purana memory se hata do
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm(
      formData,
      newImageFile || existingImage
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("description", formData.description);
    updatedData.append("price", formData.price);
    updatedData.append("category", formData.category);
    // NOTE: pehle yaha formData.category jaa raha tha (bug) — ab subcategory
    updatedData.append("subcategory", formData.subcategory);
    if (formData.url) {
      updatedData.append("url", formData.url);
    }
    updatedData.append("stock", formData.stock);
    updatedData.append("rating", formData.rating);
    updatedData.append("totalRatings", formData.totalRatings);
    if (newImageFile) {
      updatedData.append("image", newImageFile);
    } else {
      updatedData.append("image", existingImage);
    }
    if (product.imagePublicId) {
      updatedData.append("imagePublicId", product.imagePublicId);
    }

    onUpdate(product.id || product._id, updatedData);
  };

  return (
    <>
      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background-color: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 16px;
        }

        .modal-card {
          background-color: #ffffff;
          width: 100%;
          max-width: 760px;
          max-height: 95vh;
          max-height: 95dvh;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Form poora card bharta hai: header/footer fixed, sirf body scroll hoti hai */
        .modal-form {
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;
          min-height: 0;
        }

        .modal-header {
          flex: 0 0 auto;
          padding: 18px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #0f172a;
        }

        .close-icon-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          color: #64748b;
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .close-icon-btn:hover {
          background-color: #f1f5f9;
        }

        .modal-body {
          flex: 1 1 auto;
          min-height: 0;
          padding: 24px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-grid-modal {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .span-2 {
          grid-column: 1 / -1;
        }

        .field-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .field-box label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
        }

        .modal-input, .modal-textarea, .modal-select {
          width: 100%;
          box-sizing: border-box;
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          font-size: 0.9rem;
          font-family: inherit;
          background-color: #ffffff;
        }

        .modal-input:focus, .modal-textarea:focus, .modal-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .modal-textarea {
          min-height: 80px;
          resize: vertical;
        }

        .admin-error {
          margin: 0;
          font-size: 0.78rem;
          color: #dc2626;
        }

        /* Image Change Box */
        .image-edit-section {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        .thumb-preview {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid #cbd5e1;
          background-color: #ffffff;
        }

        .image-edit-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 10px;
          min-width: 0;
        }

        .change-file-label {
          display: inline-block;
          padding: 6px 12px;
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          color: #334155;
          white-space: nowrap;
        }

        .change-file-label:hover {
          background-color: #f1f5f9;
        }

        .file-hint {
          font-size: 0.78rem;
          color: #64748b;
          overflow-wrap: anywhere;
          min-width: 0;
        }

        .modal-footer {
          flex: 0 0 auto;
          padding: 16px 24px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          background-color: #f8fafc;
        }

        .btn-cancel {
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-update {
          background-color: #3b82f6;
          border: none;
          color: #ffffff;
          padding: 8px 20px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-update:hover {
          background-color: #2563eb;
        }

        .btn-cancel:disabled,
        .btn-update:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-cancel:focus-visible,
        .btn-update:focus-visible,
        .close-icon-btn:focus-visible,
        .change-file-label:focus-within {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }

        /* ---------- Tablet ---------- */
        @media (max-width: 768px) {
          .modal-header { padding: 16px 20px; }
          .modal-body { padding: 20px; }
          .modal-footer { padding: 14px 20px; }
        }

        /* ---------- Mobile: bottom-sheet style ---------- */
        @media (max-width: 600px) {
          .modal-backdrop {
            padding: 0;
            align-items: flex-end;
          }

          .modal-card {
            max-width: 100%;
            max-height: 92vh;
            max-height: 92dvh;
            border-radius: 16px 16px 0 0;
          }

          .modal-header { padding: 14px 16px; }
          .modal-header h3 { font-size: 1.1rem; }

          .modal-body {
            padding: 16px;
            gap: 14px;
          }

          /* Sab fields ek column mein */
          .form-grid-modal {
            grid-template-columns: minmax(0, 1fr);
            gap: 14px;
          }

          /* iOS par focus karne se zoom na ho (16px+ zaroori) */
          .modal-input, .modal-textarea, .modal-select {
            font-size: 16px;
            padding: 11px 12px;
          }

          .image-edit-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .thumb-preview {
            width: 88px;
            height: 88px;
          }

          .image-edit-actions {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }

          .change-file-label {
            padding: 10px 14px;
            font-size: 0.9rem;
          }

          /* Footer: full-width buttons, Update upar (primary), safe-area ka dhyan */
          .modal-footer {
            flex-direction: column-reverse;
            gap: 10px;
            padding: 12px 16px;
            padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          }

          .btn-cancel,
          .btn-update {
            width: 100%;
            padding: 12px 16px;
            font-size: 1rem;
          }
        }

        /* ---------- Chhoti screens / landscape phones ---------- */
        @media (max-height: 480px) {
          .modal-card { max-height: 100vh; max-height: 100dvh; border-radius: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .modal-card, .modal-backdrop { transition: none; animation: none; }
        }
      `}</style>

      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="modal-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-product-title"
          onClick={(e) => e.stopPropagation()}
        >
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h3 id="edit-product-title">Edit Product</h3>
              <button
                type="button"
                className="close-icon-btn"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {/* Image Preview & Replacement */}
              <div className="field-box">
                <label>Product Image</label>
                <div className="image-edit-section">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="thumb-preview"
                    />
                  ) : (
                    <div
                      className="thumb-preview"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      🖼
                    </div>
                  )}
                  <div className="image-edit-actions">
                    <label className="change-file-label">
                      Choose New Image
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </label>
                    <span className="file-hint">
                      {newImageFile
                        ? newImageFile.name
                        : "Keep current image or select replacement"}
                    </span>
                  </div>
                </div>
                {errors.image && <p className="admin-error">{errors.image}</p>}
              </div>

              <div className="form-grid-modal">
                <div className="field-box span-2">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="modal-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <p className="admin-error">{errors.name}</p>}
                </div>

                <div className="field-box span-2">
                  <label>Description</label>
                  <textarea
                    name="description"
                    required
                    className="modal-textarea"
                    value={formData.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <p className="admin-error">{errors.description}</p>
                  )}
                </div>

                <div className="field-box">
                  <label>Category</label>
                  <select
                    name="category"
                    required
                    className="modal-select"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="admin-error">{errors.category}</p>
                  )}
                </div>

                <div className="field-box">
                  <label>Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    className="modal-input"
                    value={formData.subcategory}
                    onChange={handleChange}
                  />
                  {errors.subcategory && (
                    <p className="admin-error">{errors.subcategory}</p>
                  )}
                </div>

                <div className="field-box">
                  <label>Price (₹)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    name="price"
                    required
                    className="modal-input"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {errors.price && <p className="admin-error">{errors.price}</p>}
                </div>

                <div className="field-box">
                  <label>Stock</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    name="stock"
                    min="0"
                    className="modal-input"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                  {errors.stock && <p className="admin-error">{errors.stock}</p>}
                </div>

                <div className="field-box span-2">
                  <label>External Affiliate URL</label>
                  <input
                    type="url"
                    name="url"
                    className="modal-input"
                    value={formData.url}
                    onChange={handleChange}
                  />
                </div>

                <div className="field-box">
                  <label>Rating (0-5)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    name="rating"
                    min="0"
                    max="5"
                    className="modal-input"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                  {errors.rating && (
                    <p className="admin-error">{errors.rating}</p>
                  )}
                </div>

                <div className="field-box">
                  <label>Total Ratings</label>
                  <input
                    type="number"
                    inputMode="numeric"
                    name="totalRatings"
                    min="0"
                    className="modal-input"
                    value={formData.totalRatings}
                    onChange={handleChange}
                  />
                  {errors.totalRatings && (
                    <p className="admin-error">{errors.totalRatings}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-cancel"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </button>
              <button type="submit" className="btn-update" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;