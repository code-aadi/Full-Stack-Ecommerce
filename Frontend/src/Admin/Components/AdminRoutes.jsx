import React, { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminRoutes = ({children}) => {
  const {user, userLoading} = useContext(AuthContext)
  if(!userLoading){
    if(user && user.role === "admin"){
        return children
    }else{
        return <Navigate to={"/"}/>
    }
  }
}

export default AdminRoutes
