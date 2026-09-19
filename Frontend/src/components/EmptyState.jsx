import React from 'react';
import { Link } from 'react-router-dom';

// Alag-alag types ke liye default presets aur SVG icons
const PRESETS = {
  product: {
    title: 'Product Not Found',
    message: 'The product you are looking for is not available or has been removed.',
    buttonText: 'Back to Home',
    buttonLink: '/',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    bgColor: '#fee2e2',
    accent: '#ef4444',
  },
  cart: {
    title: 'Your Cart is Empty',
    message: 'There are no items in your cart. Start shopping and add items!',
    buttonText: 'Start Shopping',
    buttonLink: '/products',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    ),
    bgColor: '#fef3c7',
    accent: '#f59e0b',
  },
  search: {
    title: 'No Results Found',
    message: 'No products found matching your search query. Check the spelling or try a different keyword.',
    buttonText: 'Clear Search',
    buttonLink: '/products',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
    bgColor: '#e0e7ff',
    accent: '#6366f1',
  },
  category: {
    title: 'No Products in this Category',
    message: 'There are currently no products in this category; please check another category!',
    buttonText: 'Explore Categories',
    buttonLink: '/',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    bgColor: '#e0f2fe',
    accent: '#0ea5e9',
  },
  orders: {
    title: 'No Orders Yet',
    message: 'You haven\'t placed any orders yet. Start shopping to see them here.',
    buttonText: 'Start Shopping',
    buttonLink: '/products',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 3H8a2 2 0 0 0-2 2v16l6-3 6 3V5a2 2 0 0 0-2-2Z" />
        <path d="M9 8h6" />
        <path d="M9 12h6" />
      </svg>
    ),
    bgColor: '#ede9fe',
    accent: '#8b5cf6',
  },
  orderdetail: {
    title: 'Order Not Found',
    message: 'We couldn\'t find the details for this order. It may have been removed or the link is incorrect.',
    buttonText: 'View All Orders',
    buttonLink: '/orders',
    icon: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M9.5 14.5 11 16l3.5-3.5" />
      </svg>
    ),
    bgColor: '#ccfbf1',
    accent: '#14b8a6',
  },
};

// Order status ke hisaab se alag-alag empty messages (orders list filter ke liye)
const ORDER_STATUS_PRESETS = {
  all: {
    title: 'No Orders Yet',
    message: 'You haven\'t placed any orders yet. Start shopping to see them here.',
    buttonText: 'Start Shopping',
    buttonLink: '/products',
    accent: '#8b5cf6',
    bgColor: '#ede9fe',
  },
  pending: {
    title: 'No Pending Orders',
    message: 'You don\'t have any orders that are currently pending confirmation.',
    buttonText: 'View All Orders',
    buttonLink: '/orders',
    accent: '#f59e0b',
    bgColor: '#fef3c7',
  },
  confirmed: {
    title: 'No Confirmed Orders',
    message: 'You don\'t have any confirmed orders right now.',
    buttonText: 'View All Orders',
    buttonLink: '/orders',
    accent: '#3b82f6',
    bgColor: '#dbeafe',
  },
  shipped: {
    title: 'No Shipped Orders',
    message: 'None of your orders are out for shipping at the moment.',
    buttonText: 'View All Orders',
    buttonLink: '/orders',
    accent: '#0ea5e9',
    bgColor: '#e0f2fe',
  },
  delivered: {
    title: 'No Delivered Orders',
    message: 'You don\'t have any delivered orders yet.',
    buttonText: 'View All Orders',
    buttonLink: '/orders',
    accent: '#10b981',
    bgColor: '#d1fae5',
  },
  cancelled: {
    title: 'No Cancelled Orders',
    message: 'You don\'t have any cancelled orders. That\'s good news!',
    buttonText: 'View All Orders',
    buttonLink: '/orders',
    accent: '#ef4444',
    bgColor: '#fee2e2',
  },
};

// Orders icon ko current status ke accent color me render karta hai
const getOrdersIcon = (color) => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 3H8a2 2 0 0 0-2 2v16l6-3 6 3V5a2 2 0 0 0-2-2Z" />
    <path d="M9 8h6" />
    <path d="M9 12h6" />
  </svg>
);

const EmptyState = ({
  type = 'product', // 'product' | 'cart' | 'search' | 'category' | 'orders' | 'orderdetail'
  status, // Sirf type="orders" ke saath use hota hai: 'All' | 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'
  title,
  message,
  buttonText,
  buttonLink,
  showBackBtn = true,
  onActionClick,
}) => {
  let current = PRESETS[type] || PRESETS.product;

  // Orders list me current filter (status) ke hisaab se message badalna
  if (type === 'orders' && status) {
    const statusPreset = ORDER_STATUS_PRESETS[status.toLowerCase()] || ORDER_STATUS_PRESETS.all;
    current = { ...statusPreset, icon: getOrdersIcon(statusPreset.accent) };
  }

  const finalTitle = title || current.title;
  const finalMessage = message || current.message;
  const finalBtnText = buttonText || current.buttonText;
  const finalBtnLink = buttonLink || current.buttonLink;

  return (
    <div className="es-wrapper" style={{ '--es-accent': current.accent }}>
      <div className="es-card">
        <div className="es-icon-box" style={{ backgroundColor: current.bgColor }}>
          {current.icon}
        </div>

        <h2 className="es-title">{finalTitle}</h2>
        <p className="es-desc">{finalMessage}</p>

        <div className="es-actions">
          {onActionClick ? (
            <button onClick={onActionClick} className="es-primary-btn">
              {finalBtnText}
            </button>
          ) : (
            <Link to={finalBtnLink} className="es-primary-btn">
              {finalBtnText}
            </Link>
          )}

          {showBackBtn && (
            <button onClick={() => window.history.back()} className="es-secondary-btn">
              Go Back
            </button>
          )}
        </div>
      </div>

      <style>{`
        .es-wrapper {
          min-height: 55vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(24px, 6vw, 48px) 16px;
          box-sizing: border-box;
        }

        .es-card {
          max-width: 440px;
          width: 100%;
          text-align: center;
          padding: clamp(28px, 5vw, 44px) clamp(20px, 5vw, 32px);
          border-radius: 20px;
          background-color: #ffffff;
          border: 1px solid #eef1f5;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04), 0 12px 32px -12px rgba(15, 23, 42, 0.12);
          animation: es-rise 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }

        .es-icon-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 76px;
          height: 76px;
          border-radius: 50%;
          margin-bottom: 20px;
        }

        .es-title {
          font-size: clamp(18px, 4vw, 22px);
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 8px 0;
          letter-spacing: -0.01em;
        }

        .es-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0 auto 26px auto;
          max-width: 34ch;
        }

        .es-actions {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .es-primary-btn {
          padding: 11px 22px;
          background-color: var(--es-accent, #2563eb);
          color: #ffffff;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
          box-shadow: 0 6px 16px -6px var(--es-accent, #2563eb);
        }

        .es-primary-btn:hover {
          filter: brightness(1.06);
          transform: translateY(-1px);
        }

        .es-primary-btn:active {
          transform: translateY(0);
        }

        .es-primary-btn:focus-visible,
        .es-secondary-btn:focus-visible {
          outline: 2px solid var(--es-accent, #2563eb);
          outline-offset: 2px;
        }

        .es-secondary-btn {
          padding: 11px 20px;
          background-color: transparent;
          color: #475569;
          border: 1px solid #dfe4eb;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.15s ease, border-color 0.15s ease;
        }

        .es-secondary-btn:hover {
          background-color: #f8fafc;
          border-color: #cbd5e1;
        }

        @keyframes es-rise {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .es-card { animation: none; }
        }

        @media (max-width: 380px) {
          .es-actions { flex-direction: column; }
          .es-primary-btn, .es-secondary-btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default EmptyState;