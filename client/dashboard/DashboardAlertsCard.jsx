import React from 'react'
import { pestThreats } from '../utils/mockData.js'

function DashboardAlertsCard() {
  const critical = pestThreats.filter((t) => t.severity === 'High')
  return (
    <div className="bg-white border rounded p-4">
      <h3 className="font-semibold mb-2">Critical Alerts</h3>
      {critical.length ? (
        <ul className="list-disc ml-5 space-y-1">
          {critical.map((t) => (
            <li key={t.name + t.region} className="text-red-700">{t.name} — {t.region}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No high severity alerts.</p>
      )}
    </div>
  )
}

export default DashboardAlertsCard
