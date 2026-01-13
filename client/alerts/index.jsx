import React, { useEffect, useState } from 'react'
import { api } from '../utils/api.js'
import './style.css'

function Alerts() {
  const [threats, setThreats] = useState([])
  const [reports, setReports] = useState([])
  const [form, setForm] = useState({ location: '', description: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [threatsData, reportsData] = await Promise.all([
          api.alerts.getThreats(),
          api.alerts.getReports()
        ])
        setThreats(threatsData)
        setReports(reportsData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const submit = async (e) => {
    e.preventDefault()
    if (!form.location || !form.description) return
    
    try {
      const newReport = await api.alerts.submitReport({
        location: form.location,
        description: form.description,
        status: 'Pending Verification'
      })
      setReports([newReport, ...reports])
      setForm({ location: '', description: '' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Pest & Disease Alerts</h2>
        <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          WAN Live Feed Active
        </div>
      </div>

      {/* Active Threats Section */}
      <section className="bg-white border rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <span>⚠️</span> Active Regional Threats
        </h3>
        {loading ? (
          <div className="text-gray-400 text-sm">Loading threats...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {threats.map((t) => (
              <div key={t.name + t.region} className="border border-red-100 bg-red-50/50 rounded-xl p-4 transition-all hover:shadow-md">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-red-800">{t.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    t.severity === 'High' ? 'bg-red-200 text-red-800' : 
                    t.severity === 'Medium' ? 'bg-orange-200 text-orange-800' : 'bg-yellow-200 text-yellow-800'
                  }`}>
                    {t.severity}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Region:</span> {t.region}
                </div>
                <div className="text-sm text-gray-700 bg-white p-3 rounded-lg border border-red-100">
                  <span className="font-medium text-red-900 block mb-1">Control Strategy:</span>
                  {t.strategy}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Reporting Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 bg-white border rounded-xl p-6 shadow-sm h-fit">
          <h3 className="font-semibold text-gray-800 mb-4">Report Suspicious Signs</h3>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input 
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="e.g. North Field, Sector 4" 
                value={form.location} 
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Observation</label>
              <textarea 
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none" 
                placeholder="Describe symptoms (e.g., yellow spots, wilting)..." 
                value={form.description} 
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} 
              />
            </div>
            <button className="w-full bg-red-600 text-white font-medium px-4 py-2.5 rounded-lg hover:bg-red-700 transition-colors shadow-sm flex justify-center items-center gap-2">
              <span>📡</span> Broadcast Alert
            </button>
            <p className="text-xs text-gray-500 text-center">
              Report will be synced to Cloud Analysis Center via WAN.
            </p>
          </form>
        </section>

        <section className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Community Reports</h3>
          {reports.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>No recent reports in your area.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
              {reports.map((r) => (
                <div key={r.id} className="border rounded-lg p-4 flex gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-500">
                    📍
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{r.location}</h4>
                      <span className="text-xs text-gray-500">{r.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{r.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">
                        {r.status || 'Pending Analysis'}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        ☁️ Synced
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Alerts
