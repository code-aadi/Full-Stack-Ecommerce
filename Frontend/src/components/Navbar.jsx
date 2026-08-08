import React, { useContext } from 'react';
import { ShoppingCart, Search, User, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';

const Navbar = () => {
  const navigate = useNavigate()
  const {cartItems} = useContext(cartContext)
  function handleCart(){
    navigate("/MyCart")
  }
  return (
    <header className="navbar">
      <div className="container nav-container">
        
        {/* Logo */}
        <div className="logo">ShopEase</div>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products, brands and categories..."
          />
          <Search className="search-icon" size={18} />
        </div>

        {/* Action Icons */}
        <div className="nav-icons">
          <button className="icon-btn" onClick={()=> navigate("/register")}><User size={22} /></button>
          <button className="icon-btn"><Heart size={22} /></button>
          <button className="icon-btn">
            <ShoppingCart size={22} onClick={handleCart} />
            <span className="cart-badge">{cartItems.length}</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;