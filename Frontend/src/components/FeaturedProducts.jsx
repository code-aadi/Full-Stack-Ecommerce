import React, { useContext, useEffect, useState } from 'react';
import '../styles/HomeProducts.css';
import Loader from './Loader';
import { cartContext } from '../../Context/CartContext';
import { useAlert } from '../../Context/AlertContext';
import { Link } from 'react-router-dom';
import { ThreeDotsLoader } from './ThreeDots';
import TrendingProductsSkeleton from './Skeletons/TrendingProductsSkeleton';


const FeaturedProducts = () => {
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const {addToCart, addToCartLoading} = useContext(cartContext)
const {showAlert} = useAlert()
useEffect(()=>{
  const getTrendingProducts = async()=>{
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/topProducts`)
      const data = await response.json()
      if(response.ok){
        setProducts(data.products)
      }
    } catch (error) {
      alert("Unable to fetch trending products")
    }finally{
     setLoading(false)
    }
  }
  getTrendingProducts()
},[])

 async function handleAddToCart(id) {
    const result = await addToCart(id);
    if (result.success) {
      showAlert(result.message, "success");
    } else {
      showAlert(result.message, "error");
    }
  }

  return (
    <section className="home-container">
      <div className="home-section-header">
        <h3 className="home-section-title">Trending Products</h3>
        <a href="/category/Electronics" className="home-link-btn">View All →</a>
      </div>

      {loading ? <TrendingProductsSkeleton count={5}/> : (
        <div className="home-products-grid">
        {products.map((product) => (
          <div key={product._id} className="home-product-card">
            <div className="home-product-top">
              <div className="home-product-media">
               <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="home-product-img" />
               </Link>
                <span className="home-product-category">{product.category}</span>
              </div>
              <div className="home-product-info">
                <h4 className="home-product-name">{product.name}</h4>
                <div className="home-product-bottom">
                  <span className="home-product-price">₹{product.price}</span>
                  <span className="home-product-rating">★ {product.rating}</span>
                </div>
              </div>
            </div>
            <button className="home-btn-add-cart"  disabled={!!addToCartLoading[product._id]}  onClick={()=> handleAddToCart(product._id)}> {addToCartLoading === product._id ? <ThreeDotsLoader />: "Add to cart"}</button>
          </div>
        ))}
      </div>
      )}
    </section>
  );
};

export default FeaturedProducts;