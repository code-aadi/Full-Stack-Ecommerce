import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/SearchPage.css';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false);
const navigate = useNavigate()
 const url = new URL("http://localhost:2310/api/products/search")

 const [searchParams] = useSearchParams()


  const query = searchParams.get('q') || '';
  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""
  const rating = searchParams.get("rating") || ""
  const inStock = searchParams.get("inStock") || ""
 
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

    } catch (error) {
      console.error('Error fetching search results:', error);
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
              {products?.length} {products?.length === 1 ? 'Product' : 'Products'} found
            </span>
          )}
        </div>
          
      )}

      {/* Main Content Area */}
      <div className="search-content">
        {loading ? (
          <div className="search-loader">
            <div className="spinner"></div>
            <p>Searching products...</p>
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
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try searching with different keywords or check spelling.</p>
            </div>
          )
        )}

        {!query && !loading && (
          <div className="search-placeholder">
            <p>Type something in the search bar to find products.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;