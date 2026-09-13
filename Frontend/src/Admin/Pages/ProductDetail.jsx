import React, { useState, useEffect } from "react";
import "../../styles/AdminProductDetail.css"
import { useParams } from "react-router-dom";

const ProductDetail = ({ onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newStock, setNewStock] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false)
 const {productId} = useParams()

  useEffect(() => {
  
async function getProductDetails(){
   try {
     const response = await fetch(`http://localhost:2310/api/admin/product/${productId}`)
    const data = await response.json()
   if(response.ok){
         setProduct(data?.product);
    setIsActive(data?.product.isActive);
    console.log(data.product)
   }
   } catch (error) {
    alert(error.message)
   }
}
getProductDetails()
   
    setLoading(false);
  }, [productId]);

  const handleUpdateStock = async(e) => {
    e.preventDefault();
    if (!newStock || Number(newStock) < 0) return alert("Valid quantity enter karein");
    
    const updatedStock = product.stock + Number(newStock);
   setUpdateLoading(true)
    try {
        const response = await fetch(`http://localhost:2310/api/admin/product/${productId}/stock`, {
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body :JSON.stringify({stock : updatedStock})
        })
        const data = await response.json()
        if(response.ok){
              setProduct((prev) => ({ ...prev, stock: updatedStock }));
    setNewStock("");
    alert("Stock successfully updated!");
        }else{
            alert(data.message || "failed to update stock")
        }
    } catch (error) {
       alert("something went wrong") 
    }finally{
        setUpdateLoading(false)
    }
    
  
  };

  
  const handleToggleStatus = async() => {
    const updatedStatus = !isActive;
   setUpdateLoading(true)
    try {
        const response = await fetch(`http://localhost:2310/api/admin/product/${productId}/status`,{
            method : "PATCH",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({status : updatedStatus})
        })
        const data = await response.json()
        if(response.ok){
      setIsActive(updatedStatus);
      alert(data.message)
        }else{
            alert("unable to update stock")
        }
    } catch (error) {
        alert(data.message || "something went wrong")
    }finally{
        setUpdateLoading(false)
    }
    
  };

  if (loading) return <div className="prod-loading">Loading Product Details...</div>;
  if (!product) return <div>Product Not Found!</div>;

  return (
    <div className="product-view-container">
      {/* Header */}
      <div className="product-view-header">
        <div>
          {onBack && (
            <button className="back-link-btn" onClick={onBack}>
              ← Back to Dashboard
            </button>
          )}
          <h2>Product Overview</h2>
          <span className="prod-id">Product ID: {product._id}</span>
        </div>

        {/* Visibility Switch */}
        <div className="action-toggle-box">
          <span>Status: </span>
          <button
          disabled = {updateLoading}
            className={`status-pill ${isActive ? "active" : "inactive"}`}
            onClick={handleToggleStatus}
          >
            {isActive ? "Active (Listed)" : "Inactive (Hidden)"}
          </button>
        </div>
      </div>

      <div className="product-layout-grid">
        {/* Left Column: Image & Direct Link */}
        <div className="product-visual-card">
          <div className="image-wrapper">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="image-meta">
            <span className="tag">Cloudinary ID: {product.imagePublicId}</span>
          </div>

          {product.url && (
            <div className="external-link-box">
              <a href={product.url} target="_blank" rel="noopener noreferrer" className="external-btn">
                View on Supplier/Amazon Link ↗
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Info & Restock Panel */}
        <div className="product-details-content">
          <div className="detail-card main-info">
            <div className="category-breadcrumbs">
              <span>{product.category}</span>
              {product.subcategory && <span> / {product.subcategory}</span>}
            </div>

            <h1 className="product-title">{product.name}</h1>
            
            <div className="rating-price-row">
              <div className="price-tag">₹{product.price.toFixed(2)}</div>
              <div className="rating-badge">
                ★ {product.rating} <span className="reviews-count">({product.totalRatings} ratings)</span>
              </div>
            </div>

            <div className="description-section">
              <h4>Description</h4>
              <p>{product.description}</p>
            </div>
          </div>

          {/* Quick Restock Action Card */}
          <div className="detail-card restock-card">
            <div className="stock-info-header">
              <div>
                <h4>Inventory Status</h4>
                <p className="subtitle">Current available items for sale</p>
              </div>
              <span className={`stock-badge ${product.stock < 10 ? "low" : "good"}`}>
                {product.stock} left in stock
              </span>
            </div>

            <form onSubmit={handleUpdateStock} className="restock-form">
              <input
                type="number"
                placeholder="Add more stock (e.g. 50)"
                value={newStock}
                min="1"
                onChange={(e) => setNewStock(e.target.value)}
                required
              />
              <button type="submit" className="restock-btn" disabled = {updateLoading}>
                Restock Inventory
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;