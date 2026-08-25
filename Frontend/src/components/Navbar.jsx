import React, { useContext, useState } from 'react';
import { ShoppingCart, Search, User, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import UserDropdown from './UserDropdown';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, userLoading } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { cartItems } = useContext(cartContext);
  const [searchInput, setSearchInput] = useState('');

  const userLogo = user?.name?.charAt(0);

  function handleIconClick() {
    if (!user) {
      navigate("/register");
    } else {
      setDropdownOpen(!dropdownOpen);
    }
  }

  // Search Submit Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        
        {/* Logo */}
        <div className="logo" onClick={() => navigate("/")}>ShopEase</div>

        {/* Improved Search Bar with Button */}
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products, brands and categories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <Search size={18} />
          </button>
        </form>

        {/* Action Icons */}
        <div className="nav-icons">
          <button className="icon-btn" onClick={handleIconClick}>
            {user ? <p className="nav-user-logo">{userLogo}</p> : <User size={22} />}
          </button>
          
          <button className="icon-btn">
            <Heart size={22} />
          </button>
          
          <div className="cart-wrapper">
            {dropdownOpen && <UserDropdown setDropdownOpen={setDropdownOpen} />}
            <button className="icon-btn" onClick={() => navigate("/MyCart")}>
              <ShoppingCart size={22} />
              <span className="cart-badge">{cartItems?.length || 0}</span>
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;