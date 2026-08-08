import React from 'react';

const products = [
  {
    id: 1,
    name: 'Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    price: '₹4,999',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
  },
  {
    id: 2,
    name: 'Smart Watch Series 7',
    category: 'Electronics',
    price: '₹2,499',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
  },
  {
    id: 3,
    name: 'Classic Leather Running Shoes',
    category: 'Fashion',
    price: '₹1,899',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
  },
  {
    id: 4,
    name: 'Minimalist Water Bottle (1L)',
    category: 'Home & Fitness',
    price: '₹799',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="container">
      <div className="section-header">
        <h3 className="section-title">Trending Products</h3>
        <a href="#view-all" className="link-btn">View All →</a>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div>
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h4 className="product-name">{product.name}</h4>
                <div className="product-bottom">
                  <span className="product-price">{product.price}</span>
                  <span className="product-rating">★ {product.rating}</span>
                </div>
              </div>
            </div>
            <button className="btn-add-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;