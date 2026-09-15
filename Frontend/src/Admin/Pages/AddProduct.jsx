import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../../utils/fetchApi";
import { AuthContext } from "../../../Context/AuthContext";
import Toast from "../../components/Toast";
import validateForm from "../../../helper/productValidate";

const AddProduct = () => {
  const navigate = useNavigate();
  const {accessToken, setAccessToken} = useContext(AuthContext)
const [loading, setLoading] = useState(false)
const [toast, setToast] = useState({
    isOpen: false,
    type: 'add',
    message: ''
  });


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    subcategory: "",
    url: "",
    stock: 50,
    rating: 0,
    totalRatings: 0,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({})

const [categories, setCategories] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

   useEffect(() => {
     
     getCategories()
    }, []);

    const handleCloseToast = () => {
    setToast(prev => ({ ...prev, isOpen: false }));
  };

   const getCategories= async()=>{
    try {
    const response = await fetchApi("http://localhost:2310/api/admin/product/categories",{
      method : "GET",
    headers : {
        Authorization : `Bearer ${accessToken}`
    }
    },setAccessToken)
      const data = await response.json()
      if(data.success){
        setCategories(data.categories)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };



  const handleSubmit = async(e) => {
    e.preventDefault();

       const validationErrors = validateForm(formData, imageFile);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

    setErrors({});

    
    const data = new FormData();
    data.append("image", imageFile); 
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", Number(formData.price));
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
   if(formData.url) data.append("url", formData.url);
    data.append("stock", Number(formData.stock));
    data.append("rating", Number(formData.rating));
    data.append("totalRatings", Number(formData.totalRatings));

    try {
    setLoading(true)

      const response = await fetchApi("http://localhost:2310/api/admin/product",{
        method : "POST",
        headers : {
           Authorization : `Bearer ${accessToken}`,
        },
        body : data
      },setAccessToken)
      const responseData = await response.json()
      if(!response.ok && responseData.errors){
        setErrors(responseData.errors)
        return
      }
      
      if(response.ok){
        setToast({
      isOpen: true,
      type: 'add',
      message: responseData.message
    });
      }
   // navigate("/admin/products");
        


    } catch (error) {
      alert(error.message)
    }finally{
      setLoading(false)
    }
  
  };

  return (
    <>
      <style>{`
        .add-product-container {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
        }

        .back-btn {
          background-color: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .back-btn:hover {
          background-color: #f1f5f9;
        }

        .form-card {
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group label {
          font-size: 0.88rem;
          font-weight: 600;
          color: #334155;
        }

        .required-star {
          color: #ef4444;
          margin-left: 2px;
        }

        .input-field, .textarea-field, .select-field {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 6px;
          outline: none;
          font-size: 0.92rem;
          background-color: #ffffff;
          color: #0f172a;
          box-sizing: border-box;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          font-family: inherit;
        }

        .input-field:focus, .textarea-field:focus, .select-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .textarea-field {
          min-height: 100px;
          resize: vertical;
        }

        .helper-text {
          font-size: 0.78rem;
          color: #64748b;
        }

        /* File Upload Styles */
        .upload-dropzone {
          border: 2px dashed #cbd5e1;
          border-radius: 8px;
          padding: 24px;
          text-align: center;
          cursor: pointer;
          background-color: #f8fafc;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .upload-dropzone:hover {
          border-color: #3b82f6;
          background-color: #eff6ff;
        }

        .upload-icon {
          font-size: 2rem;
        }

        .upload-text {
          font-size: 0.9rem;
          color: #334155;
          font-weight: 500;
        }

        .upload-hint {
          font-size: 0.78rem;
          color: #94a3b8;
        }

        .hidden-file-input {
          display: none;
        }

        .preview-container {
          position: relative;
          width: 160px;
          height: 160px;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          margin-top: 8px;
        }

        .preview-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
    
        .remove-image-btn {
          position: absolute;
          top: 6px;
          right: 6px;
          background: rgba(15, 23, 42, 0.75);
          color: #ffffff;
          border: none;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          transition: background 0.2s ease;
        }

        .remove-image-btn:hover {
          background: #ef4444;
        }

        .actions-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .cancel-button {
          background-color: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
        }

        .cancel-button:hover {
          background-color: #e2e8f0;
        }

        .submit-button {
          background-color: #3b82f6;
          border: none;
          color: #ffffff;
          padding: 10px 24px;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .submit-button:hover {
          background-color: #2563eb;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="add-product-container">
        <div className="header-section">
          <h2 className="page-title">Add New Product</h2>
          <button className="back-btn" onClick={() => navigate("/admin/products")}>
            ← Back to Products
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-grid">
            {/* Product Name */}
            <div className="input-group full-width">
              <label>
                Product Name <span className="required-star">*</span>
              </label>
              <input
                type="text"
                name="name"
                
                placeholder="e.g. Wireless Noise Cancelling Headphones"
                className="input-field"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="admin-error">{errors.name}</p>}
            </div>

            {/* Description */}
            <div className="input-group full-width">
              <label>
                Description <span className="required-star">*</span>
              </label>
              <textarea
                name="description"
                required
                placeholder="Write detailed product features, specs..."
                className="textarea-field"
                value={formData.description}
                onChange={handleChange}
              />
             {errors.description && <p className="admin-error">{errors.description}</p>}
            </div>

            {/* Category */}
            <div className="input-group">
              <label>
                Category <span className="required-star">*</span>
              </label>
              <select
                name="category"
                required
                className="select-field"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && <p className="admin-error">{errors.category}</p>}
            </div>

            {/* Subcategory */}
            <div className="input-group">
              <label>Subcategory</label>
              <input
                type="text"
                name="subcategory"
                placeholder="e.g. Audio, Men Casuals"
                className="input-field"
                value={formData.subcategory}
                onChange={handleChange}
              />
              {errors.subcategory && <p className="admin-error">{errors.subcategory}</p>}
            </div>

            {/* Price */}
            <div className="input-group">
              <label>
                Price (₹) <span className="required-star">*</span>
              </label>
              <input
                type="number"
                name="price"
                min="0"
                required
                placeholder="999"
                className="input-field"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="admin-error">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div className="input-group">
              <label>Initial Stock</label>
              <input
                type="number"
                name="stock"
                min="0"
                placeholder="50"
                className="input-field"
                value={formData.stock}
                onChange={handleChange}
              />
              {errors.stock && <p className="admin-error">{errors.stock}</p>}
            </div>

            {/* Device Image Upload Area */}
            <div className="input-group full-width">
              <label>
                Product Image <span className="required-star">*</span>
              </label>

              {!imagePreview ? (
                <label className="upload-dropzone">
                  <span className="upload-icon">📁</span>
                  <span className="upload-text">
                    Click to browse or choose an image from device
                  </span>
                  <span className="upload-hint">PNG, JPG, JPEG, WEBP accepted</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden-file-input"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="preview-container">
                  <img src={imagePreview} alt="Selected preview" className="preview-image" />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={handleRemoveImage}
                    title="Remove Image"
                  >
                    ✕
                  </button>
                </div>
              )}
            {errors.image && <p className="admin-error">{errors.image}</p>}
            </div>

            {/* External URL */}
            <div className="input-group full-width">
              <label>Affiliate / External Link (Optional)</label>
              <input
                type="url"
                name="url"
                placeholder="https://amazon.in/dp/example or Flipkart link"
                className="input-field"
                value={formData.url}
                onChange={handleChange}
              />
              <span className="helper-text">Add link if item redirects externally.</span>
            </div>

            {/* Rating */}
            <div className="input-group">
              <label>Initial Rating (0 - 5)</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                placeholder="0"
                className="input-field"
                value={formData.rating}
                onChange={handleChange}
              />
              {errors.rating && <p className="admin-error">{errors.rating}</p>}
            </div>

            {/* Total Ratings Count */}
            <div className="input-group">
              <label>Total Ratings Count</label>
              <input
                type="number"
                name="totalRatings"
                min="0"
                placeholder="0"
                className="input-field"
                value={formData.totalRatings}
                onChange={handleChange}
              />
              {errors.totalRating && <p className="admin-error">{errors.totalRating}</p>}
            </div>
          </div>

          <div className="actions-bar">
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/admin/products")}
            >
              Cancel
            </button>
            <button type="submit" disabled = {loading} className="submit-button">
              Save Product
            </button>
          </div>
        </form>

        <Toast
        isOpen={toast.isOpen}
        type={toast.type}
        message={toast.message}
        onClose={handleCloseToast}
      />
      </div>
    </>
  );
};

export default AddProduct;