import React, { useEffect, useState } from 'react'
import './style.css'

function Profile() {
  const [user, setUser] = useState({ name: '', email: '', role: 'Farmer', location: '', farmSize: '' })
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem('sais-user') || 'null'); if (saved) setUser((u) => ({ ...u, ...saved })) } catch {} }, [])
  const onSave = (e) => { e.preventDefault(); localStorage.setItem('sais-user', JSON.stringify(user)) }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Profile Management</h2>
      <form onSubmit={onSave} className="bg-white border rounded p-4 space-y-3 max-w-lg">
        <input className="w-full border rounded px-3 py-2" placeholder="Name" value={user.name} onChange={(e) => setUser((u) => ({ ...u, name: e.target.value }))} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" value={user.email} onChange={(e) => setUser((u) => ({ ...u, email: e.target.value }))} />
        <select className="w-full border rounded px-3 py-2" value={user.role} onChange={(e) => setUser((u) => ({ ...u, role: e.target.value }))}>
          <option>Farmer</option>
          <option>Buyer</option>
          <option>Agronomist</option>
          <option>Admin</option>
        </select>
        <input className="w-full border rounded px-3 py-2" placeholder="Location" value={user.location || ''} onChange={(e) => setUser((u) => ({ ...u, location: e.target.value }))} />
        <input className="w-full border rounded px-3 py-2" placeholder="Farm Size (ha)" value={user.farmSize || ''} onChange={(e) => setUser((u) => ({ ...u, farmSize: e.target.value }))} />
        <button className="bg-green-600 text-white px-4 py-2 rounded">Save Profile</button>
      </form>
    </div>
  )
}

export default Profile
