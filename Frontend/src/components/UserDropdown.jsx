import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, LogOut, X, } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';

const UserDropdown = ({ setDropdownOpen }) => {
    const {logout} = useContext(AuthContext)

    function handleLogout(){
      logout()
      setDropdownOpen(false)
    }
  return (
    <>
      <style>{`
        .user-dropdown-box {
          position: absolute;
          animation: slideUp 0.4s ease-out forwards;
          right: 0;
          top: 100%;
          width: 180px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          padding: 6px;
          z-index: 999;
        }

        .user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          color: #1e293b;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          border-radius: 6px;
          border: none;
          background: transparent;
          width: 100%;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s ease;
        }

        .user-dropdown-item:hover {
          background: #f1f5f9;
        }

        .user-dropdown-item.logout {
          color: #ef4444;
        }

        .user-dropdown-item.logout:hover {
          background: #fef2f2;
        }
          .drop-profile{
          margin-top : 10px;
          }
          .dropdown-cross{
          position : absolute;
          left : 83%
          }

        

  
  




@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(-20px); 
  }
  100% {
    opacity: 1;
    transform: translateY(0);    
  }
}

      `}</style>

      <div className="user-dropdown-box">
        <span className='dropdown-cross'><X onClick={()=> setDropdownOpen(false)} /> </span>
        <Link 
          to="/profile" 
          className="user-dropdown-item drop-profile"
          
        >
          <User size={16} />
          <span>My Profile</span>
        </Link>

        <Link 
          to="/orders" 
          className="user-dropdown-item"
          
        >
          <Package size={16} />
          <span>My Order</span>
        </Link>

        <button 
          type="button"
          className="user-dropdown-item logout" 
          onClick={handleLogout}
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default UserDropdown;