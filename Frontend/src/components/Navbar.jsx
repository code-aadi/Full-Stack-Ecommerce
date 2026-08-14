import React, { useContext, useState } from 'react';
import { ShoppingCart, Search, User, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import UserDropdown from './UserDropdown';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate()
  const {user, userLoading} = useContext(AuthContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const {cartItems} = useContext(cartContext)
  const userLogo = user?.name?.charAt(0)
  function handleCart(){
    navigate("/MyCart")
  }
  function handleIconClick(){
    if(!user){
      navigate("/register")
      
    }
    else{
      setDropdownOpen(!dropdownOpen)
    }
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
          <button className="icon-btn" onClick={handleIconClick}>{user ? <p className='user-logo'>{userLogo}</p> : <User size={22} />}</button>
          <button className="icon-btn"><Heart size={22} /></button>
          <button className="icon-btn">
 {dropdownOpen && <UserDropdown setDropdownOpen = {setDropdownOpen} />}
            <ShoppingCart size={22} onClick={handleCart} />
            <span className="cart-badge">{cartItems.length}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;