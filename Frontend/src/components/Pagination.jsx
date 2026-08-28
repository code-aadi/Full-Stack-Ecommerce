import { useSearchParams } from 'react-router-dom';
import '../styles/Pagination.css';

const Pagination = ({page, totalPages }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    
    const buttonsToShow = 10
    const startPage = Math.floor((page - 1) / buttonsToShow) * buttonsToShow + 1;
  
    const endPage = Math.min(startPage + buttonsToShow - 1, totalPages);
 const currentParams = Object.fromEntries(searchParams)
 
  const pagesArray = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }
  return (
    <nav className="pagination-container" aria-label="Product Pagination">
   
      {startPage > 1 && (
        <button 
        onClick={()=>{
            setSearchParams({...currentParams, page : startPage -10})
        }}
        type="button" 
        className="pagination-btn pagination-nav-btn pagination-prev" 
        aria-label="Previous Page"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Prev</span>
      </button>
      )}

      {/* Page Numbers */}
      <div className="pagination-pages-list">
{ pagesArray.map((button)=>{
   return <button type="button" className={`pagination-btn pagination-page-btn ${Number(page) === button && "pagination-active"}`}
    onClick={() => {
            if (button === 1) {
              searchParams.delete("page");
              setSearchParams(searchParams);
            } else {
              setSearchParams({...currentParams, page: button, limit : 40 });
            }
          }}
        >
          {button} </button>
}
)}
      </div>

      {/* Next Button */}
     {endPage < totalPages && (
         <button 
      onClick={()=>{
      
        setSearchParams({...currentParams, page : endPage + 1})
       
      }}
        type="button" 
        className="pagination-btn pagination-nav-btn pagination-next" 
        aria-label="Next Page"
      >
        <span>Next</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      
      </button>
     )}
    </nav>
  );
};

export default Pagination;