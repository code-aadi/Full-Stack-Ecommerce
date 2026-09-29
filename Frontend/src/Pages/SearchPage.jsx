import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/SearchPage.css';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { useAlert } from '../../Context/AlertContext';
import Loader from '../components/Loader';
const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLimitCrossed, setIsLimitCrossed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const rating = searchParams.get('rating') || '';
  const inStock = searchParams.get('inStock') || '';
  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 40;

  const min = Number(minPrice);
  const max = Number(maxPrice);
  const ratingNum = Number(rating);

  const hasActiveFilters = Boolean(minPrice || maxPrice || rating || inStock);


  const handleRemoveFilter = (paramKey) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(paramKey);
    newParams.set('page', '1'); 
    setSearchParams(newParams);
  };

  
  const handleClearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (query) newParams.set('q', query);
    setSearchParams(newParams);
  };

  useEffect(() => {
    if (!query) {
      navigate('/');
      return;
    }
    if (min || max) {
      if (max < min || min < 0 || max < 0) {
        alert('Please Enter Valid Price Range');
        return;
      }
    }
    if (rating) {
      if (ratingNum < 1 || ratingNum > 5 || isNaN(ratingNum)) {
        alert('Please Enter a Valid Rating between 1 and 5');
        return;
      }
    }

    setSearchTerm(query);
    if (query.trim()) {
      fetchSearchResults();
    } else {
      setProducts([]);
    }
    setIsFilterOpen(false);
  }, [searchParams]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const url = new URL(`${import.meta.env.VITE_API_BASE_URL}/api/products/search`);
      url.searchParams.set('q', query);
      url.searchParams.set('minPrice', minPrice);
      url.searchParams.set('maxPrice', maxPrice);
      url.searchParams.set('rating', rating);
      url.searchParams.set('inStock', inStock);
      url.searchParams.set('page', page);
      url.searchParams.set('limit', limit);

      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 0);
      setTotalProducts(data.totalProducts || 0);
      if (response.status === 429) {
        setIsLimitCrossed(true);
      }
    } catch (error) {
      showAlert('Error fetching search results', 'error');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page-container">
      {query && (
        <div className="search-meta-wrapper">
          <div className="search-meta">
            <div className="search-meta-left">
              <p className="search-meta-text">
                Showing results for: <span className="query-highlight">"{query}"</span>
              </p>
              {!loading && (
                <span className="results-count">
                  {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} found
                </span>
              )}
            </div>

            <button
              type="button"
              className="mobile-filter-trigger"
              onClick={() => setIsFilterOpen(true)}
              aria-label="Open Filters"
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
                <line x1="1" y1="14" x2="7" y2="14" />
                <line x1="9" y1="8" x2="15" y2="8" />
                <line x1="17" y1="16" x2="23" y2="16" />
              </svg>
              <span>Filters</span>
            </button>
          </div>

          {/* ACTIVE FILTER BADGES STRIP (Sirf tabhi dikhega jab filters applied ho) */}
          {hasActiveFilters && (
            <div className="active-filters-strip">
              <span className="active-filters-label">Applied Filters:</span>

              {/* Price: Min Filter */}
              {minPrice && (
                <button
                  type="button"
                  className="filter-pill"
                  onClick={() => handleRemoveFilter('minPrice')}
                  title="Remove min price"
                >
                  Min: ₹{minPrice}
                  <span className="filter-pill-close">✕</span>
                </button>
              )}

              {/* Price: Max Filter */}
              {maxPrice && (
                <button
                  type="button"
                  className="filter-pill"
                  onClick={() => handleRemoveFilter('maxPrice')}
                  title="Remove max price"
                >
                  Max: ₹{maxPrice}
                  <span className="filter-pill-close">✕</span>
                </button>
              )}

              {/* Rating Filter */}
              {rating && (
                <button
                  type="button"
                  className="filter-pill"
                  onClick={() => handleRemoveFilter('rating')}
                  title="Remove rating filter"
                >
                  ★ {rating} & above
                  <span className="filter-pill-close">✕</span>
                </button>
              )}

              {/* In-Stock Filter */}
              {inStock && (
                <button
                  type="button"
                  className="filter-pill"
                  onClick={() => handleRemoveFilter('inStock')}
                  title="Remove in stock filter"
                >
                  In Stock Only
                  <span className="filter-pill-close">✕</span>
                </button>
              )}

              {/* Clear All Button */}
              <button
                type="button"
                className="clear-all-pill-btn"
                onClick={handleClearAllFilters}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}

      {isLimitCrossed && (
        <div className="search-limit-warning">
          ⚠️ Search limit exceeded! Please try again after a while.
        </div>
      )}

      {/* Main Content Area */}
      <div className="search-content">
        {loading ? (
         <Loader text={`Loading Product For "${searchTerm}`}/>
        ) : products?.length > 0 ? (
          <div className="filter-products">
            <div
              className={`filter-drawer-backdrop ${isFilterOpen ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(false)}
            />

            <aside className={`filter-sidebar-wrapper ${isFilterOpen ? 'open' : ''}`}>
              <div className="mobile-drawer-header">
                <h3>Filters</h3>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  onClick={() => setIsFilterOpen(false)}
                  aria-label="Close Filters"
                >
                  ✕
                </button>
              </div>
              <FilterSidebar />
            </aside>

            <div className="product-grid">
              {products.map((product) => (
                <ProductCard key={product._id} item={product} />
              ))}
            </div>
          </div>
        ) : (
          query && (
            <EmptyState
              type="search"
              message={`No results found for "${searchTerm}".`}
              buttonText="Home"
              buttonLink="/"
            />
          )
        )}

        {!query && !loading && (
          <div className="search-placeholder">
            <p className="address-error">Type something in the search bar to find products.</p>
          </div>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="search-pagination-wrapper">
          <Pagination page={page} totalPages={totalPages} limit={40} />
        </div>
      )}
    </div>
  );
};

export default SearchPage;