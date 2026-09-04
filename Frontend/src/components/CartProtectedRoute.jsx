import { useContext, useEffect } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Navigate } from "react-router-dom"
import { cartContext } from "../../Context/CartContext"


const CartProtectedRoute = ({children}) => {
    const {user, userLoading} = useContext(AuthContext)
    const {cartItems, cartLoading} = useContext(cartContext)
    
 if(!userLoading && !cartLoading){
     if(user && cartItems.length > 0){
    return children 
  }else{
   return <Navigate to={'/login'}/>

  }
 }
}

export default CartProtectedRoute