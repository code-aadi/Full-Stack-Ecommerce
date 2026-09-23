import React, { useState, useEffect } from 'react';
import {  Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/SearchPage.css';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { useAlert } from '../../Context/AlertContext';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("")
  const [isLimitCrossed, setIsLimitCrossed] = useState(false)
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
const navigate = useNavigate()
 const url = new URL("http://localhost:2310/api/products/search")
const {showAlert} = useAlert()
 const [searchParams] = useSearchParams()


  const query = searchParams.get('q') || '';
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const rating = searchParams.get("rating") || ""
  const inStock = searchParams.get("inStock") || ""
  const page = searchParams.get("page") || 1
  const limit = searchParams.get('limit') || 40
 
const min = Number(minPrice);
const max = Number(maxPrice);
 const ratingNum = Number(rating)
  useEffect(() => {
    if(!query){
      navigate("/")
      return
    }
    if(min || max){
      if(max < min || min <= 0 || min <=0){
      alert("Please Enter Valid Price Range")
      return
    }
    }
if(rating){
  if (ratingNum < 1 || ratingNum > 5 || isNaN(ratingNum)) {
    alert("Please Enter a Valid Rating between 1 and 5");
    return; 
  }
}
   
    url.searchParams.set("q", query)
   url.searchParams.set("minPrice", minPrice)
   url.searchParams.set("maxPrice", maxPrice)
   url.searchParams.set("rating", rating)
   url.searchParams.set("inStock", inStock)
   url.searchParams.set("page", page)
   url.searchParams.set("limit", limit)
    setSearchTerm(query);
    if (query.trim()) {
      fetchSearchResults();
    } else {
      setProducts([]);
    }
  }, [searchParams]);

  // Search API Call
  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
       setTotalPages(data.totalPages)
       setTotalProducts(data.totalProducts)
       if(response.status === 429){
       setIsLimitCrossed(true)
       }
    } catch (error) {
      showAlert("Error fetching search results", "error")
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };


  
 

  return (
    <div className="search-page-container">
      
      {query && (
       
        <div className="search-meta">
          <p className="search-meta-text">
            Showing results for: <span className="query-highlight">"{query}"</span>
          </p>
          {!loading && (
              <span className="results-count">
              {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} found
            </span>
          )}
        </div>
          
      )}
{isLimitCrossed && (<div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', padding: '10px 16px', borderRadius: '6px', textAlign: 'center', margin: '10px 0' }}>
      ⚠️ Search limit exceeded! Please try again after a while.
    </div>)}
      {/* Main Content Area */}
      <div className="search-content">
        {loading ? (
          <div className="search-loader">
            <div className="spinner"></div>
            <p className = 'address-error'>Searching products...</p>
          </div>
        ) : products?.length > 0 ? (
            <div className='filter-products'>
             <FilterSidebar />
          <div className="product-grid">
            {products.map((product) => (
                <ProductCard key={product._id} item={product} />
            ))}
          </div>
                  
            </div>
        ) : (
          query && (
            <EmptyState type='search' message={`No results found for the "${searchTerm}".`} buttonText="Home"
      buttonLink="/"/>
          )
        )}

        {!query && !loading && (
          <div className="search-placeholder">
            <p className = 'address-error'>Type something in the search bar to find products.</p>
          </div>
        )}
      </div>
     {!loading &&  <Pagination page={page} totalPages={totalPages} limit={40}/>}
    </div>
  );
};

export default SearchPage;