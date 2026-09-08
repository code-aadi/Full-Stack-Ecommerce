import React, { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import fetchApi from "../../../utils/fetchApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDebounce from "../../../Hooks/useDebounce";
import EditProductModal from "../Components/EditProductModel";
import Toast from "../../components/Toast";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchParam] = useSearchParams();
  const [totalPages, setTotalPages] = useState(30);
  const page = searchParam.get("page") || 1;
  const limit = searchParam.get("limit") || 20;
  const [productLoading, setProductLoading] = useState(false);
const [totalProducts, setTotalProducts] = useState(0)
  const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([])
const [totalCateogires, setTotalCategories] = useState([])
const [isEditOpen, setIsEditOpen] = useState(false)
const [selectedProduct, setSelectedProduct] = useState(null)
const [backendErrors, setBackendErrors] = useState({})
const [editLoading, setEditLoading] = useState(false)
const [toast, setToast] = useState({
 isOpen: false,
      type: 'add',
      message: ""
})
const navigate = useNavigate()
const debounceValue = useDebounce(searchTerm, 500)

  const handleCloseToast = () => {
    setToast(prev => ({ ...prev, isOpen: false }));
  };

function modelOnClose(){
  setIsEditOpen(false)
  setSelectedProduct(null)
}

function handleEdit(product){
 setIsEditOpen(true)
 setSelectedProduct(product)
}

const updateProduct = async (productId, product)=>{
 try {
  setEditLoading(true)
  setBackendErrors({})
   const response = await fetch(`http://localhost:2310/api/admin/product/${productId}`,{
    method : "PUT",
    body : product
  })
  const data = await response.json()
  if(!response.ok && data.errors){
    setBackendErrors(data.errors)
    return
  }
  console.log(data)
  if(response.ok){
    modelOnClose()
      setToast({
      isOpen: true,
      type: 'update',
      message: data.message
    });
  }
 } catch (error) {
  alert(error.message)
 }finally{
  setEditLoading(false)
 }
}

  useEffect(() => {
   
   getCategories()
  }, []);

useEffect(()=>{
  getProducts()
},[debounceValue, selectedCategory, page])
  
  const getProducts = async () => {
    try {
      setProductLoading(true);
      const response = await fetchApi(`http://localhost:2310/api/admin/product?page=${page}&limit=${limit}&search=${debounceValue}&category=${selectedCategory}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setTotalProducts(data.totalProducts)
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setProductLoading(false);
    }
  };

  const getCategories= async()=>{
    try {
    const response = await fetchApi("http://localhost:2310/api/admin/product/categories")
      const data = await response.json()
      if(data.success){
        setCategories(["All", ...data.categories])
        setTotalCategories(data.categories)
      }
      console.log(data)
    } catch (error) {
      alert(error.message)
    }
  }
  const handleDelete = async(id) => {
   
    try {
      const response = await fetch(`http://localhost:2310/api/admin/product/${id}`,{
        method : "DELETE"
      })
      const data = await response.json()
      console.log(data)
      if(!response.ok){
        alert(data.message)
        return
      }
      setToast({
        isOpen : true,
        message : data.message,
        type : "delete"
      })
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      alert("something went wrong")
    }
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

        .total-products-badge {
          display: inline-flex;
          align-items: center;
          background-color: #f1f5f9;
          color: #475569;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
          margin-left: 10px;
          vertical-align: middle;
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
          <h2 className="page-title">
            Products 
            <span className="total-products-badge">
              Total: {totalProducts}
            </span>
          </h2>
          <button className="add-btn" onClick={()=> navigate("/admin/products/add")}>+ Add Product</button>
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
              {cat}
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
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                   <a href={product.image} target="_blank"> <img src={product.image} alt="" className="img-cell" /></a>
                  </td>
                  <td style={{ fontWeight: "500" }}>{product.name}</td>
                  <td>
                    <span className="category-pill">{product.category}</span>
                  </td>
                  <td style={{ fontWeight: "600", color: "#0f172a" }}>₹{product.price}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="edit-btn" onClick={()=> handleEdit(product)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(product._id)}>
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
          <Pagination page={page} totalPages={totalPages} limit={20} />
        </div>
        <EditProductModal isOpen={isEditOpen} onClose={modelOnClose} product={selectedProduct} onUpdate={updateProduct} categories={totalCateogires} backendErrors={backendErrors} loading = {editLoading}/>

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

export default Products;