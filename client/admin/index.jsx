import React, { useEffect, useState } from 'react'
import { api } from '../utils/api.js'
import './style.css'

function Admin() {
  const [users, setUsers] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [wanStatus, setWanStatus] = useState({
    'Node-A1 (North)': 'Online',
    'Node-A2 (North)': 'Online',
    'Node-B3 (South)': 'Latency Warning',
    'Node-HQ (Central)': 'Online',
    'Cloud-Primary': 'Online'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersData, logsData] = await Promise.all([
          api.admin.getUsers(),
          api.admin.getLogs()
        ])
        setUsers(usersData)
        setLogs(logsData)
      } catch (error) {
        console.error("Failed to fetch admin data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const toggleStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">System Administration</h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-600">WAN Network Active</span>
        </div>
      </div>
      
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">WAN Node Status</h3>
          <div className="space-y-2">
            {Object.entries(wanStatus).map(([node, status]) => (
              <div key={node} className="flex justify-between items-center text-sm">
                <span className="text-gray-700">{node}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Database Health</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Storage Usage</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Memory Load</span>
                <span>32%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '32%' }}></div>
              </div>
            </div>
            <div className="pt-2 border-t mt-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Avg Query Time</span>
                <span className="font-mono font-medium">24ms</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Recent Activity</h3>
          {loading ? (
            <div className="text-sm text-gray-400">Loading logs...</div>
          ) : (
            <div className="space-y-3">
              {logs.slice(0, 3).map(log => (
                <div key={log.id} className="flex gap-2 items-start text-xs">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                    log.type === 'critical' ? 'bg-red-500' : 
                    log.type === 'warning' ? 'bg-yellow-500' : 
                    log.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></span>
                  <div>
                    <p className="text-gray-800 font-medium">{log.event}</p>
                    <p className="text-gray-400">{log.time} • {log.node}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Management */}
      <section className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">User Management</h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="border rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700">
              Add User
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading user database...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500 font-medium border-b">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">WAN Node</th>
                  <th className="p-4">Last Sync</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{user.name}</div>
                      <div className="text-gray-500 text-xs">{user.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                        user.role === 'Agronomist' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-600 font-mono text-xs">
                      {user.wanNode || 'Unknown'}
                    </td>
                    <td className="p-4 text-gray-500">
                      {user.lastSync || 'Never'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => toggleStatus(user.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium text-xs border border-blue-200 px-3 py-1 rounded hover:bg-blue-50 transition-colors"
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

export default Admin
