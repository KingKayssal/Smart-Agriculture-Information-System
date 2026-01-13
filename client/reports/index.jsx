import React from 'react'
import YieldChart from './YieldChart.jsx'
import SoilTrendChart from './SoilTrendChart.jsx'
import SalesChart from './SalesChart.jsx'
import './style.css'

function Reports() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reports & Analytics</h2>
      <div className="bg-white border rounded p-4"><YieldChart /></div>
      <div className="bg-white border rounded p-4"><SoilTrendChart /></div>
      <div className="bg-white border rounded p-4"><SalesChart /></div>
    </div>
  )
}

export default Reports
