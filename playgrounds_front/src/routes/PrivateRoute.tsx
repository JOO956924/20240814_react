import React from 'react'
import {Navigate} from 'react-router-dom'

interface PrivateRouteProps {
  component: React.ComponentType
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({component: Component}) => {
  const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null
  }

  return isAuthenticated() ? <Component /> : <Navigate to="/login" replace />
}

export default PrivateRoute
