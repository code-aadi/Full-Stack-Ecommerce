import { useEffect, useState } from "react";


const useDebounce = (searchValue, delay) => {
  const [debouncedState, setDebounceState] = useState(searchValue)

useEffect(()=>{
const timer = setTimeout(() => {
  setDebounceState(searchValue)
}, delay);

return  () =>{
    clearTimeout(timer)
  }
},[searchValue])
return debouncedState
}

export default useDebounce
