import { useContext, useEffect } from "react"
import { AuthContext } from "../../Context/AuthContext"
import { Navigate } from "react-router-dom"


const ProtectedRoute = ({children}) => {
    const {user, userLoading} = useContext(AuthContext)
    
 if(!userLoading ){
     if(user){
    return children 
  }else{
   return <Navigate to={'/login'}/>

  }
 }
}

export default ProtectedRoute
