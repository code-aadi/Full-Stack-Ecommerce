import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';



const CategoryProductsPage = () => {
 const [products, setProducts] = useState([])
 const [loading, setLoading] = useState(false)
 const [error, setError] = useState(null);
  const { categoryName } = useParams();

 useEffect(()=>{
async function getCategoriesData() {
try {
  setLoading(true)
  setError(null)
    const response = await fetch(`http://localhost:2310/api/products/category/${categoryName}`)
  
  const data = await response.json()

    if (data.success) {
  
      setProducts(data.products); 
    } else {
     
      setError(data.message || "Something Went Wrong!");
    }
} catch (error) {
  setError("Internal Server Error. Please Check Your Internet")
  console.log(error)
}finally{
  setLoading(false)
}
  
}
getCategoriesData()
 },[categoryName])
  if (loading) {
    return <div className="loading">Loading items for {categoryName}...</div>;
  }

  // 5. Error state handle karein
  if (error) {
    return <div className="error">Error: {error}</div>;
  }
  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
      
      {/* Breadcrumb Navigation */}
      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>
        <Link to="/" style={{ color: '#4f46e5', textDecoration: 'none' }}>Home</Link>
        {' '}/ Categories /{' '}
        <span style={{ textTransform: 'capitalize', fontWeight: 600, color: '#111827' }}>
          {categoryName}
        </span>
      </div>

      {/* Heading Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'capitalize', color: '#111827' }}>
          {categoryName}
        </h1>
        <span style={{ color: '#6b7280', fontSize: '0.95rem' }}>
          Showing {products?.length} Products
        </span>
      </div>

      {/* Product Grid View */}
      {products?.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {products?.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      ) : (
        /* Empty State if No Products Found */
        <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6b7280' }}>
          <h3>No products found in "{categoryName}" category</h3>
          <p style={{ marginTop: '0.5rem' }}>Try exploring other categories from Home Page.</p>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-block', 
              marginTop: '1rem', 
              background: '#4f46e5', 
              color: 'white', 
              padding: '10px 20px', 
              borderRadius: '8px', 
              textDecoration: 'none',
              fontWeight: 600 
            }}
          >
            Back to Home
          </Link>
        </div>
      )}

    </div>
  );
};

export default CategoryProductsPage;