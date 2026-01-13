import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../utils/api.js'
import './style.css'
import DashboardCards from './DashboardCards.jsx'
import DashboardWeatherCard from './DashboardWeatherCard.jsx'
import DashboardAlertsCard from './DashboardAlertsCard.jsx'
import { farmerTasks, yieldForecast, marketPrices } from '../utils/mockData.js'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [wanStatus, setWanStatus] = useState('Connected')
  const [tasks, setTasks] = useState([])
  const [forecast, setForecast] = useState([])
  const [prices, setPrices] = useState([])

  useEffect(() => {
    setUser(api.auth.getCurrentUser())
    setTasks(farmerTasks)
    setForecast(yieldForecast)
    setPrices(marketPrices)
    const interval = setInterval(() => {
      setWanStatus(navigator.onLine ? 'Connected' : 'Offline')
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const role = user?.role || 'Guest'

  if (role === 'Farmer') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome back, Farmer</h1>
            <p className="text-sm text-gray-500">Farm ID: #F-2025-882 • Northern Region</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border">
            <div className={`w-3 h-3 rounded-full ${wanStatus === 'Connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-600">WAN: {wanStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-1">
            <DashboardWeatherCard />
          </div>
          <div className="md:col-span-1 bg-white p-4 rounded-xl border shadow-sm flex flex-col justify-center overflow-hidden relative">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Live Market Prices</h3>
            <div className="space-y-2 h-24 overflow-y-auto no-scrollbar">
              {prices.map((p, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="font-medium">{p.product}</span>
                  <span className="text-green-600 font-bold">CFA {p.price}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-0 right-0 p-2">
              <span className="text-xs bg-green-100 text-green-700 px-1 rounded">Live</span>
            </div>
          </div>
          <div className="md:col-span-1 bg-red-50 p-4 rounded-xl border border-red-100 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">⚠️</span>
              <h3 className="font-bold text-red-800">Active Alerts</h3>
            </div>
            <div className="text-3xl font-bold text-red-600 mb-1">2</div>
            <p className="text-xs text-red-700">1 Severe Weather, 1 Pest Alert</p>
            <Link to="/notifications" className="text-xs text-red-600 font-medium hover:underline mt-2">View details →</Link>
          </div>
          <div className="md:col-span-1 bg-green-50 p-4 rounded-xl border border-green-100 shadow-sm flex flex-col justify-center gap-2">
            <h3 className="text-xs font-bold text-green-800 uppercase tracking-wider mb-1">Quick Actions</h3>
            <button className="w-full bg-white text-green-700 border border-green-200 text-sm py-1.5 rounded hover:bg-green-100 transition">+ Log Harvest</button>
            <button className="w-full bg-white text-green-700 border border-green-200 text-sm py-1.5 rounded hover:bg-green-100 transition">+ Add Expense</button>
            <Link to="/messages" className="block w-full text-center bg-green-600 text-white text-sm py-1.5 rounded hover:bg-green-700 transition">Contact Expert</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Daily Tasks</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{tasks.filter(t => t.status === 'Pending').length} Pending</span>
              </div>
              <div className="divide-y">
                {tasks.map(task => (
                  <div key={task.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 transition">
                    <input type="checkbox" className="mt-1 w-4 h-4 text-green-600 rounded focus:ring-green-500" defaultChecked={task.status === 'Completed'} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-900'}`}>{task.task}</p>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                          task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                          }`}>{task.priority}</span>
                        <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center border-t">
                <button className="text-sm text-green-600 font-medium hover:underline">View all tasks</button>
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">My Crops</h3>
                <Link to="/crop-management" className="text-sm text-green-600 hover:underline">Manage Crops →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-green-50/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl">🌽</span>
                    <span className="text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">Vegetative</span>
                  </div>
                  <h4 className="font-bold text-gray-800">Maize - Block A</h4>
                  <p className="text-xs text-gray-500">Planted: 15 Oct 2025</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg bg-green-50/50">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-2xl">🍚</span>
                    <span className="text-xs font-bold bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">Harvest Ready</span>
                  </div>
                  <h4 className="font-bold text-gray-800">Rice - Paddy 2</h4>
                  <p className="text-xs text-gray-500">Planted: 10 Sep 2025</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h3 className="font-bold text-gray-800 mb-4">AI Yield Forecast</h3>
              <div className="space-y-4">
                {forecast.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.crop}</span>
                      <span className="font-bold text-gray-900">{item.expected} {item.unit}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.confidence}%` }} title={`Confidence: ${item.confidence}%`}></div>
                    </div>
                    <div className="text-right text-xs text-gray-400 mt-1">Confidence: {item.confidence}% (Cloud AI)</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4 italic">* Powered by cloud-based machine learning models using historical weather and soil data.</p>
            </div>

            <div className="bg-gray-900 text-white rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><span className="animate-pulse text-green-400">●</span> Cloud Sync Status</h3>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex justify-between"><span>Harvest Logs</span><span className="text-green-400">Synced 2m ago</span></li>
                <li className="flex justify-between"><span>Expense Records</span><span className="text-green-400">Synced 1h ago</span></li>
                <li className="flex justify-between"><span>Sensor Data</span><span className="text-green-400">Live Stream</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (role === 'Buyer') {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Buyer Dashboard</h1>
            <p className="text-sm text-gray-500">Procurement overview and market insights</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border">
            <div className={`w-3 h-3 rounded-full ${wanStatus === 'Connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm font-medium text-gray-600">WAN: {wanStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Marketplace</h3>
            <p className="text-gray-700">Browse listings and start negotiations.</p>
            <Link to="/marketplace" className="text-sm text-green-600 font-medium hover:underline mt-2 inline-block">Open Marketplace →</Link>
          </div>
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Price Trends</h3>
            <p className="text-gray-700">Analyze current market dynamics.</p>
            <Link to="/market" className="text-sm text-green-600 font-medium hover:underline mt-2 inline-block">View Trends →</Link>
          </div>
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Messages</h3>
            <p className="text-gray-700">Communicate with sellers and admins.</p>
            <Link to="/messages" className="text-sm text-green-600 font-medium hover:underline mt-2 inline-block">Open Messages →</Link>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-800">Live Market Snapshot</h3>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Live</span>
          </div>
          <div className="divide-y">
            {prices.slice(0, 8).map((p, i) => (
              <div key={i} className="p-4 flex justify-between items-center">
                <div className="font-medium text-gray-900">{p.product}</div>
                <div className="text-sm text-gray-500">{p.region}</div>
                <div className="font-bold text-green-700">CFA {p.price}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-gray-500">
          Buyer operations and analytics are computed in the cloud; WAN connectivity ensures remote, role-based access to up-to-date market information.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{role} Dashboard</h2>
      <DashboardCards role={role} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardWeatherCard />
        <div className="bg-white border rounded p-4">
          <h3 className="font-semibold mb-2">Market Summary</h3>
          <p className="text-gray-700">Latest prices and trends for key products.</p>
        </div>
        <DashboardAlertsCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {role === 'Buyer' && (
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Purchase Orders</h3>
            <p className="text-gray-700">Manage requests and supply.</p>
          </div>
        )}
        {role === 'Agronomist' && (
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">Advisory Queue</h3>
            <p className="text-gray-700">Incoming farmer questions.</p>
          </div>
        )}
        {role === 'Admin' && (
          <div className="bg-white border rounded p-4">
            <h3 className="font-semibold mb-2">System Overview</h3>
            <p className="text-gray-700">Users, alerts, marketplace moderation.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
