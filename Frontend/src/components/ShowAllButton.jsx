import React from 'react';

const ShowAllButton = ({ onClick, isExpanded, totalCount }) => {
  return (
    <>
      {/* Component-Specific Inline Styles */}
      <style>{`
        .show-all-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 2.5rem 0 1.5rem;
          width: 100%;
        }

        .show-all-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 12px 28px;
          
          /* Modern Gradient Background */
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          color: #ffffff;
          
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px; /* Modern Pill Shape */
          
          font-size: 0.95rem;
          font-weight: 600;
          letter-spacing: 0.3px;
          cursor: pointer;
          
          /* Premium Soft Shadow */
          box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        /* Hover & Focus Effects */
        .show-all-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 26px -4px rgba(79, 70, 229, 0.5);
          background: linear-gradient(135deg, #4338ca 0%, #4f46e5 100%);
        }

        .show-all-btn:active {
          transform: translateY(0) scale(0.98);
          box-shadow: 0 6px 12px -4px rgba(79, 70, 229, 0.4);
        }

        /* Badge for count */
        .count-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 2px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          backdrop-filter: blur(4px);
        }

        /* Animated Arrow Container */
        .arrow-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .show-all-btn:hover .arrow-wrapper {
          transform: translateY(2px);
          background: rgba(255, 255, 255, 0.25);
        }

        .show-all-btn.expanded:hover .arrow-wrapper {
          transform: translateY(-2px);
        }

        .arrow-wrapper svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          transition: transform 0.3s ease;
        }

        .show-all-btn.expanded .arrow-wrapper svg {
          transform: rotate(180deg);
        }
      `}</style>

      {/* Button Structure */}
      <div className="show-all-wrapper">
        <button 
          className={`show-all-btn ${isExpanded ? 'expanded' : ''}`}
          onClick={onClick}
        >
          <span>{isExpanded ? 'Show Less' : 'Explore All Categories'}</span>
          
          {!isExpanded && totalCount && (
            <span className="count-badge">{totalCount}</span>
          )}

          <span className="arrow-wrapper">
            <svg viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </button>
      </div>
    </>
  );
};

export default ShowAllButton;