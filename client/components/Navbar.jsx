import React, { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'
import UserMenu from './UserMenu'

function Navbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = api.auth.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  const handleLogout = () => {
    api.auth.logout()
    setUser(null)
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium ${isActive ? 'text-green-700 bg-green-50' : 'text-gray-600'}`

  const mobileLinkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-green-50 text-green-700' : 'text-gray-600 hover:bg-gray-100'}`

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-green-700">
              SAIS
            </Link>
            <nav className="hidden md:flex md:ml-10 md:space-x-1">
              <NavLink to="/" className={linkClass} end>Home</NavLink>
              <NavLink to="/about" className={linkClass}>About</NavLink>
              <NavLink to="/marketplace" className={linkClass}>Marketplace</NavLink>
              <NavLink to="/advisory" className={linkClass}>Advisory</NavLink>
              {user && (
                <>
                  <NavLink to="/crop-management" className={linkClass}>Crops</NavLink>
                  <NavLink to="/alerts" className={linkClass}>Alerts</NavLink>
                </>
              )}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <>
                <NavLink to="/login" className="text-sm font-medium text-gray-600 hover:text-green-700">
                  Login
                </NavLink>
                <NavLink to="/register" className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                  Register
                </NavLink>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded={open}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!open ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileLinkClass} end onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={mobileLinkClass} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/marketplace" className={mobileLinkClass} onClick={() => setOpen(false)}>Marketplace</NavLink>
            <NavLink to="/advisory" className={mobileLinkClass} onClick={() => setOpen(false)}>Advisory</NavLink>
            {user && (
              <>
                <NavLink to="/dashboard" className={mobileLinkClass} onClick={() => setOpen(false)}>Dashboard</NavLink>
                <NavLink to="/crop-management" className={mobileLinkClass} onClick={() => setOpen(false)}>Crops</NavLink>
                <NavLink to="/alerts" className={mobileLinkClass} onClick={() => setOpen(false)}>Alerts</NavLink>
                <NavLink to="/profile" className={mobileLinkClass} onClick={() => setOpen(false)}>Profile</NavLink>
              </>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="px-2">
                 <button 
                  onClick={() => { handleLogout(); setOpen(false); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-2 space-y-1">
                <NavLink to="/login" className={mobileLinkClass} onClick={() => setOpen(false)}>Login</NavLink>
                <NavLink to="/register" className={mobileLinkClass} onClick={() => setOpen(false)}>Register</NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
