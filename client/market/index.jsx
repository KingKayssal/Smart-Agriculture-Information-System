import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../utils/api.js'
import Sparkline from '../components/Sparkline.jsx'
import './style.css'

function Market() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [crop, setCrop] = useState('All')
  const [region, setRegion] = useState('All')
  const [view, setView] = useState('table')
  const [compare, setCompare] = useState([])

  useEffect(() => {
    api.market.getPrices()
      .then(setData)
      .finally(() => setLoading(false))
  }, [])

  const crops = useMemo(() => ['All', ...Array.from(new Set(data.map(d => d.product)))], [data])
  const regions = useMemo(() => ['All', ...Array.from(new Set(data.map(d => d.region)))], [data])

  const filtered = useMemo(() => {
    return data.filter(d => (crop === 'All' || d.product === crop) && (region === 'All' || d.region === region))
  }, [data, crop, region])

  const toggleCompare = (name) => {
    setCompare(prev => prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name])
  }

  const exportCSV = () => {
    const header = ['Product', 'Region', 'Price', 'Date']
    const rows = filtered.map(r => [r.product, r.region, r.price, r.date || ''])
    const csv = [header, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'market-prices.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Market Prices & Trends</h2>
        <div className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          WAN Live Feed Active
        </div>
      </div>

      <div className="bg-white border rounded p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select className="border rounded px-3 py-2" value={crop} onChange={(e) => setCrop(e.target.value)}>
            {crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="border rounded px-3 py-2" value={region} onChange={(e) => setRegion(e.target.value)}>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <button className={`px-3 py-2 rounded ${view === 'table' ? 'bg-green-600 text-white' : 'border'}`} onClick={() => setView('table')}>Table</button>
            <button className={`px-3 py-2 rounded ${view === 'charts' ? 'bg-green-600 text-white' : 'border'}`} onClick={() => setView('charts')}>Charts</button>
          </div>
          <button className="px-3 py-2 rounded border" onClick={exportCSV}>Export CSV</button>
          <button className="px-3 py-2 rounded border">Set Price Alerts</button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border rounded p-8 text-center text-gray-500">Loading market data...</div>
      ) : view === 'table' ? (
        <div className="bg-white border rounded p-4 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="p-2">Product</th>
                <th className="p-2">Region</th>
                <th className="p-2">Price</th>
                <th className="p-2">Trend</th>
                <th className="p-2">Compare</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={`${row.product}-${row.region}`} className="border-t">
                  <td className="p-2 font-medium">{row.product}</td>
                  <td className="p-2">{row.region}</td>
                  <td className="p-2">CFA {row.price}</td>
                  <td className="p-2"><Sparkline data={row.history} /></td>
                  <td className="p-2">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={compare.includes(row.product)} onChange={() => toggleCompare(row.product)} />
                      <span>Add</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Selected Trends</h3>
            <div className="space-y-3">
              {compare.length === 0 ? (
                <div className="text-gray-500 text-sm">Select products in table to compare.</div>
              ) : (
                compare.map(name => {
                  const series = filtered.filter(f => f.product === name)
                  return (
                    <div key={name} className="border rounded p-3">
                      <div className="font-medium">{name}</div>
                      {series.map(s => (
                        <div key={`${name}-${s.region}`} className="mt-2">
                          <div className="text-xs text-gray-500">{s.region}</div>
                          <Sparkline data={s.history} />
                        </div>
                      ))}
                    </div>
                  )
                })
              )}
            </div>
          </div>
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>Cloud aggregation provides real-time updates across regions.</li>
              <li>WAN access allows remote buyers and farmers to query the same datasets.</li>
              <li>Use alerts to be notified when prices cross configured thresholds.</li>
            </ul>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        This page loads price data from cloud services and remains accessible via WAN even for geographically distributed communities.
      </p>
    </div>
  )
}

export default Market
