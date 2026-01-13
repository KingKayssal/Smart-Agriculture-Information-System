import React, { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { api } from '../utils/api'

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)

  const handleLogout = async () => {
    await api.auth.logout()
    onLogout()
    setIsOpen(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <span className="font-medium">{user.name}</span>
        {/* You can add a user avatar here */}
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl z-20">
          <NavLink to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</NavLink>
          <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</NavLink>
          {user.role === 'Admin' && (
            <NavLink to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Admin Panel</NavLink>
          )}
          <button 
            onClick={handleLogout}
            className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default UserMenu
