import React, { useState, useEffect } from "react";
import validateForm from "../../../helper/productValidate";

const EditProductModal = ({ isOpen, onClose, product, onUpdate , categories, backendErrors, loading}) => {
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
  const [errors, setErrors] = useState({})

 
 useEffect(() => {
        if (backendErrors && Object.keys(backendErrors).length > 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                ...backendErrors 
            }));
        }
    }, [backendErrors]);




  useEffect(() => {
    setErrors({})
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

  const validationErrors = validateForm(formData, newImageFile || existingImage);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

setErrors({})
const updatedData = new FormData()
updatedData.append("name" , formData.name)
updatedData.append("description" , formData.description)
updatedData.append("price" , formData.price)
updatedData.append("category" , formData.category)
updatedData.append("subcategory" , formData.category)
if(formData.url) {
  updatedData.append("url" , formData.url)
}
updatedData.append("stock" , formData.stock)
updatedData.append("rating" , formData.rating)
updatedData.append("totalRatings" , formData.totalRatings)
if(newImageFile){
  updatedData.append("image" , newImageFile)
}else{
  updatedData.append("image" , existingImage)
}
if(product.imagePublicId) {
  updatedData.append("imagePublicId", product.imagePublicId)
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
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          overflow-y: scroll;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .modal-header {
          padding: 18px 24px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        }

        .modal-body {
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-grid-modal {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .span-2 {
          grid-column: 1 / -1;
        }

        .field-box {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field-box label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #334155;
        }

        .modal-input, .modal-textarea, .modal-select {
          padding: 9px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          font-size: 0.9rem;
          font-family: inherit;
        }

        .modal-input:focus, .modal-textarea:focus, .modal-select:focus {
          border-color: #3b82f6;
        }

        .modal-textarea {
          min-height: 80px;
          resize: vertical;
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
          border-radius: 6px;
          object-fit: cover;
          border: 1px solid #cbd5e1;
        }

        .change-file-label {
          padding: 6px 12px;
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          color: #334155;
        }

        .modal-footer {
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
      `}</style>

      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Edit Product</h3>
            <button className="close-icon-btn" onClick={onClose}>✕</button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Image Preview & Replacement */}
              <div className="field-box">
                <label>Product Image</label>
                <div className="image-edit-section">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="thumb-preview" />
                  ) : (
                    <div className="thumb-preview" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      🖼
                    </div>
                  )}
                  <div>
                    <label className="change-file-label">
                      Choose New Image
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </label>
                    <span style={{ fontSize: "0.78rem", color: "#64748b", marginLeft: "10px" }}>
                      {newImageFile ? newImageFile.name : "Keep current image or select replacement"}
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
                  {errors.description && <p className="admin-error">{errors.description}</p>}
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
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {errors.category && <p className="admin-error">{errors.category}</p>}
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
                  {errors.subcategory && <p className="admin-error">{errors.subcategory}</p>}
                </div>

                <div className="field-box">
                  <label>Price (₹)</label>
                  <input
                    type="text"
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
                    step="0.1"
                    name="rating"
                    min="0"
                    max="5"
                    className="modal-input"
                    value={formData.rating}
                    onChange={handleChange}
                  />
                  {errors.rating && <p className="admin-error">{errors.rating}</p>}
                </div>

                <div className="field-box">
                  <label>Total Ratings</label>
                  <input
                    type="number"
                    name="totalRatings"
                    min="0"
                    className="modal-input"
                    value={formData.totalRatings}
                    onChange={handleChange}
                  />
                  {errors.totalRatings && <p className="admin-error">{errors.totalRatings}</p>}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn-cancel" onClick={onClose} disabled = {loading}>
                Cancel
              </button>
              <button type="submit" className="btn-update" disabled = {loading}>
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;