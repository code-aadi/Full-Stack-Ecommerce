import React from 'react'
import { useLocation, Navigate } from 'react-router-dom' 

const SuccessProtection = ({children}) => {
  const location = useLocation()
  const hasPaid = location.state?.paymentMethod;


  if (!hasPaid) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default SuccessProtection
