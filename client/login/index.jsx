import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../utils/api.js'
import './style.css'
import { validate } from '../utils/validation.js'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Farmer')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    const errs = {}
    if (!validate.required(email) || !validate.email(email)) errs.email = 'Enter a valid email'
    if (!validate.required(password) || !validate.minLength(password, 6)) errs.password = 'Min 6 characters'
    if (!validate.required(role)) errs.role = 'Select a role'
    setErrors(errs)
    if (Object.keys(errs).length) return
    
    setLoading(true)
    try {
      await api.auth.login(email, password, role)
      navigate('/dashboard')
    } catch (err) {
      setErrors({ form: 'Login failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded border p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-sm">Email</span>
          <input aria-label="Email" className="w-full border rounded px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {errors.email && <div className="text-red-700 text-sm" role="alert">{errors.email}</div>}
        <label className="block">
          <span className="text-sm">Password</span>
          <input aria-label="Password" className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {errors.password && <div className="text-red-700 text-sm" role="alert">{errors.password}</div>}
        <label className="block">
          <span className="text-sm">Role</span>
          <select aria-label="Role" className="w-full border rounded px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option>Farmer</option>
          <option>Buyer</option>
          <option>Agronomist</option>
          <option>Admin</option>
          </select>
        </label>
        {errors.role && <div className="text-red-700 text-sm" role="alert">{errors.role}</div>}
        {errors.form && <div className="text-red-700 text-sm" role="alert">{errors.form}</div>}
        <button disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded w-full disabled:opacity-50">
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default Login
