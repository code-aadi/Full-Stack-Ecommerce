import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // URL query parameter se query nikalna (?q=...)
  const query = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    setSearchTerm(query);
    if (query.trim()) {
      fetchSearchResults(query);
    } else {
      setProducts([]);
    }
  }, [query]);

  // Search API Call
  const fetchSearchResults = async (searchQuery) => {
    setLoading(true);
    try {
      
      const response = await fetch(`http://localhost:2310/api/products/search?q=${encodeURIComponent(searchQuery)}`);
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
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} item={product} />
            ))}
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