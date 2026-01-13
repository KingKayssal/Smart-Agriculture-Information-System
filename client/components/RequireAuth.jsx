import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { api } from '../utils/api.js'

function RequireAuth() {
  const user = api.auth.getCurrentUser()
  const authed = !!user
  
  const location = useLocation()
  if (!authed) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}

export default RequireAuth
