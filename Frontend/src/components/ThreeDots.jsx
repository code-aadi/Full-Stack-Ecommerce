

export const ThreeDotsLoader = () => {
  return (
    <>
    <style>
        {`
        .dots-loader {
            display: inline-flex;
            align-items: center;
  gap: 4px;
  line-height: 0;
  }
  
  .dot {
    width: 6px;
    height: 6px;
    background-color: currentColor; /* Button ke text color ke hisaab se adjust ho jayega */
    border-radius: 50%;
    animation: pulse-dot 1.2s infinite ease-in-out both;
    }
    
    .dot:nth-child(1) {
        animation-delay: -0.32s;
        }
        
        .dot:nth-child(2) {
            animation-delay: -0.16s;
            }
            
            @keyframes pulse-dot {
                0%, 80%, 100% {
                    transform: scale(0.6);
                    opacity: 0.4;
                    }
                    40% {
                        transform: scale(1.1);
                        opacity: 1;
                        }
                        }
                        `}
    </style>
    <span className="dots-loader" aria-label="Loading">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </span>
                        </>
  );
};