import React, { useState } from 'react';
import ShowAllButton from './ShowAllButton';
import { Link } from 'react-router-dom';

// Sabhi 28 Unique Categories high-resolution images ke saath
const categories = [
  { id: 1, name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80' },
  { id: 2, name: 'Beauty & Personal Care', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80' },
  { id: 3, name: 'Footwear', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id: 4, name: 'Furniture', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
  { id: 5, name: 'Sports & Outdoors', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80' },
  { id: 6, name: 'Books', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80' },
  { id: 7, name: 'Toys', image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&q=80' },
  { id: 8, name: 'Healthcare & Wellness', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80' },
  { id: 9, name: 'Home Appliances', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&q=80' },
  { id: 10, name: 'Arts & Crafts', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80' },
  { id: 11, name: 'Art Supplies', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80' },
  { id: 12, name: 'Automotive', image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=400&q=80' },
  { id: 13, name: 'Baby Products', image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&q=80' },
  { id: 14, name: 'Camping & Hiking', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80' },
  { id: 15, name: 'Gaming & Accessories', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&q=80' },
  { id: 16, name: 'Gardening & Outdoor', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
  { id: 17, name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80' },
  { id: 18, name: 'Health & Household', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80' },
  { id: 19, name: 'Home Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80' },
  { id: 20, name: 'Industrial & Scientific', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80' },
  { id: 21, name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80' },
  { id: 22, name: 'Kitchenware', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
  { id: 23, name: 'Music', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80' },
  { id: 24, name: 'Music Instruments', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&q=80' },
  { id: 25, name: 'Office Supplies', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzqbkJH4zFW28ZM6bVTPealWeMeSr4Zmyl0iQxL834Lw&s' },
  { id: 26, name: 'Pet Supplies', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&q=80' },
  { id: 27, name: 'Tools & Improvement', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlYgvDOtBM8sL-LIb-53uX25HzI2IwaQ8UVzTpsr26KQ&s=10' },
  { id: 28, name: 'Travel Accessories', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80' },
];

const Categories = () => {
  const [showAll, setShowAll] = useState(false)
const visibleCateogries = showAll ? categories : categories.slice(0,12)
  return (
    <section className="container">
      <div className="section-header">
        <h3 className="section-title">Explore All Categories ({categories.length})</h3>
        <span className="category-count-badge">Popular & Trending</span>
      </div>

      {/* Grid view jo responsive tarike se automatically organize hota hai */}
      <div className="categories-grid-all">
        {visibleCateogries.map((cat) => (
          <Link to={`/category/${cat.name}`} key={cat.id} className="category-card-mini">
            <img src={cat.image} alt={cat.name} loading="lazy" />
            <div className="category-overlay-mini">
              <span>{cat.name}</span>
            </div>
          </Link>
        ))}
      </div>
        <ShowAllButton totalCount={categories.length} isExpanded={showAll} onClick={()=> setShowAll(!showAll)} />
    </section>
  );
};

export default Categories;