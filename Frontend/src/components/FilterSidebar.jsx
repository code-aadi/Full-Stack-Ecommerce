import React, { useEffect, useState } from 'react';
import '../styles/FilterSidebar.css';
import { useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilterState = {
    minPrice: '',
    maxPrice: '',
    rating: '',
    inStock: false
  };

  const [filters, setFilters] = useState(initialFilterState);

 
  const ratings = [
    { label: '4★ & above', value: '4' },
    { label: '3★ & above', value: '3' },
    { label: '2★ & above', value: '2' }
  ];

  useEffect(() => {
  setFilters({
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || '',
    inStock: searchParams.get('inStock') === 'true'
  });
}, [searchParams]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (val) => {
    setFilters((prev) => ({ ...prev, rating: val }));
  };

  const handleStockChange = (e) => {
    setFilters((prev) => ({ ...prev, inStock: e.target.checked }));
  };

  const handleApply = (e) => {
    e.preventDefault();
     if(filters.maxPrice || filters.minPrice){
         if(Number(filters.maxPrice) < Number(filters.minPrice) || Number(filters.minPrice) <= 0 || Number(filters.maxPrice) <=0){

      alert("please Enter a Valid Price Range")
      return
    }
     }
    
    const currentParams = Object.fromEntries(searchParams.entries())
    const properParam = {...currentParams}

      
     
    const objectIntoArray = Object.entries(filters)

     objectIntoArray.forEach(([key,value])=>{
    if(value !== "" && value !== false){
      properParam[key] = value
    }
    else{
      delete properParam[key] 
    }
   })
   
 setSearchParams(properParam)
  }

  const handleClear = () => {
    const currentQuery = searchParams.get("q")
    if(currentQuery){
      setSearchParams({"q" : currentQuery})
    }
    setFilters(initialFilterState);
    
  };

  return (
    <aside className="filter-sidebar">
      {/* Header */}
      <div className="filter-header">
        <h3 className="filter-title">Filters</h3>
      </div>

      <form onSubmit={handleApply}>
        {/* Category Section */}
        

        {/* Price Section */}
        <div className="filter-section">
          <h4 className="filter-section-title">Price</h4>
          <div className="filter-price-inputs">
            <div className="filter-price-field">
              <span className="filter-currency-symbol">₹</span>
              <input
                type="number"
                name="minPrice"
                placeholder="Min"
                value={filters.minPrice}
                onChange={handlePriceChange}
                min="0"
                className="filter-price-input"
              />
            </div>
            <div className="filter-price-field">
              <span className="filter-currency-symbol">₹</span>
              <input
                type="number"
                name="maxPrice"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={handlePriceChange}
                min="0"
                className="filter-price-input"
              />
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="filter-section">
          <h4 className="filter-section-title">Rating</h4>
          <div className="filter-options-group">
            {ratings.map((rate) => (
              <label key={rate.value} className="filter-radio-label">
                <input
                  type="radio"
                  name="rating"
                  value={rate.value}
                  checked={filters.rating === rate.value}
                  onChange={() => handleRatingChange(rate.value)}
                  className="filter-radio-input"
                />
                <span className="filter-option-text">{rate.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* In Stock Section */}
        <div className="filter-section">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              name="inStock"
              checked={filters.inStock}
              onChange={handleStockChange}
              className="filter-checkbox-input"
            />
            <span className="filter-option-text">In Stock</span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="filter-actions">
          <button type="submit" className="filter-btn filter-btn-apply">
            Apply Filters
          </button>
          <button
            type="button"
            className="filter-btn filter-btn-clear"
            onClick={handleClear}
          >
            Clear All
          </button>
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;