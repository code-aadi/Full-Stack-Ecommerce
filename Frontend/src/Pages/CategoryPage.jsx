import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { useAlert } from '../../Context/AlertContext';
import EmptyState from '../components/EmptyState';
import '../styles/CategoryPage.css';
import ProductCardSkeleton from '../components/Skeletons/ProductCardSkeleton';

const CategoryProductsPage = () => {
  const [searchParams] = useSearchParams();
  const { showAlert } = useAlert();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { categoryName } = useParams();
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 40;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function getCategoriesData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/products/category/${categoryName}?page=${page}&limit=${limit}`
        );
        const data = await response.json();
        if (data.success) {
          setTotalPages(data.totalPages);
          setProducts(data.products);
        } else {
          setError(data.message || 'Something Went Wrong!');
        }
      } catch (error) {
        setError('Internal Server Error. Please Check Your Internet');
        showAlert('Something went wrong', 'error');
      } finally {
        setLoading(false);
      }
    }
    getCategoriesData();
  }, [categoryName, page, limit]);

 

  
  if (error) {
    return <EmptyState type="category" />;
  }

  return (
    <div className="category-page-container">
      {/* Breadcrumb Navigation */}
      <nav className="category-breadcrumb" aria-label="Breadcrumb">
        <Link to="/" className="category-breadcrumb-link">Home</Link>
        <span className="category-breadcrumb-separator">/</span>
        <span className="category-breadcrumb-parent">Categories</span>
        <span className="category-breadcrumb-separator">/</span>
        <span className="category-breadcrumb-current">{categoryName}</span>
      </nav>

      {/* Heading Header */}
      <div className="category-page-header">
        <div className="category-title-group">
          <h1 className="category-page-title">{categoryName}</h1>
          <span className="category-product-count-badge">
            {products?.length} {products?.length === 1 ? 'Product' : 'Products'}
          </span>
        </div>
      </div>

      {/* Product Grid View */}
     {loading ? (
        <div className="category-products-grid">
    {Array.from({ length: 8 }).map((_, index) => (
      <ProductCardSkeleton key={index} />
    ))}
  </div>
     ) : (
       products?.length > 0 ? (
        <div className="category-products-grid">
          {products?.map((product) => (
            <ProductCard key={product._id} item={product} />
          ))}
        </div>
      ) : (
        /* Empty State if No Products Found */
        <div className="category-no-products">
          <h3 className="category-no-products-title">
            No products found in "{categoryName}" category
          </h3>
          <p className="category-no-products-desc">
            Try exploring other categories from Home Page.
          </p>
          <Link to="/" className="category-back-btn">
            Back to Home
          </Link>
        </div>
      )
     )}

      {totalPages > 1 && (
        <div className="category-pagination-wrapper">
          <Pagination page={page} totalPages={totalPages} limit={40} />
        </div>
      )}
    </div>
  );
};

export default CategoryProductsPage;