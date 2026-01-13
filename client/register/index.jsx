import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { validate } from '../utils/validation.js'

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Farmer')
  const [errors, setErrors] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!validate.required(name)) errs.name = 'Name is required'
    if (!validate.required(email) || !validate.email(email)) errs.email = 'Enter a valid email'
    if (!validate.required(password) || !validate.minLength(password, 6)) errs.password = 'Min 6 characters'
    if (!validate.required(role)) errs.role = 'Select a role'
    setErrors(errs)
    if (Object.keys(errs).length) return
    const user = { name, email, role }
    localStorage.setItem('sais-user', JSON.stringify(user))
    navigate('/dashboard')
  }

  return (
    <div className="bg-white rounded border p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block">
          <span className="text-sm">Full Name</span>
          <input aria-label="Full Name" className="w-full border rounded px-3 py-2" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {errors.name && <div className="text-red-700 text-sm" role="alert">{errors.name}</div>}
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
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Create Account</button>
      </form>
    </div>
  )
}

export default Register
