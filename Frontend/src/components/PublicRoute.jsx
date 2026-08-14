import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";



const PublicRoute = ({children}) => {
  const {user} = useContext(AuthContext)
  if(user){
 return <Navigate to="/" replace />
  }else{
    return children
  }
}

export default PublicRoute
