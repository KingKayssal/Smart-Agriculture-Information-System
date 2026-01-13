import React from 'react'
import { stats } from '../utils/mockData.js'

function DashboardCards({ role }) {
  const items = stats.map((s) => ({ ...s }))
  if (role === 'Farmer') items.push({ label: 'Active Crops', value: '5' })
  if (role === 'Buyer') items.push({ label: 'Open RFQs', value: '3' })
  if (role === 'Agronomist') items.push({ label: 'Advice Requests', value: '7' })
  if (role === 'Admin') items.push({ label: 'Pending Reviews', value: '4' })
  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((s) => (
        <div key={s.label} className="bg-white rounded border p-4">
          <div className="text-sm text-gray-500">{s.label}</div>
          <div className="text-2xl font-semibold">{s.value}</div>
        </div>
      ))}
    </section>
  )
}

export default DashboardCards
