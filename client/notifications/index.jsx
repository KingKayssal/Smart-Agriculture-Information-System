import React, { useEffect, useState } from 'react'
import { api } from '../utils/api.js'

function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, critical, info, success

  useEffect(() => {
    api.notifications.getAll()
      .then(data => setNotifications(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const handleMarkRead = async (id) => {
    await api.notifications.markRead(id)
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'all') return true
    return n.type === filter
  })

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          <p className="text-gray-500 text-sm">
            You have <span className="font-bold text-blue-600">{unreadCount}</span> unread messages
          </p>
        </div>
        <button 
          onClick={handleMarkAllRead}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="flex border-b overflow-x-auto">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${filter === 'all' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('critical')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${filter === 'critical' ? 'border-b-2 border-red-600 text-red-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Alerts & Warnings
          </button>
          <button 
            onClick={() => setFilter('info')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${filter === 'info' ? 'border-b-2 border-blue-400 text-blue-400' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Updates
          </button>
          <button 
            onClick={() => setFilter('success')}
            className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${filter === 'success' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            Tasks & Activity
          </button>
        </div>

        {/* List */}
        <div className="divide-y">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading notifications...</div>
          ) : filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <div className="text-4xl mb-3">📭</div>
              <p>No notifications found in this category.</p>
            </div>
          ) : (
            filteredNotifications.map((note) => (
              <div 
                key={note.id} 
                className={`p-4 transition-colors hover:bg-gray-50 flex gap-4 ${note.read ? 'opacity-70' : 'bg-blue-50/30'}`}
              >
                {/* Icon based on type */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  note.type === 'critical' ? 'bg-red-100 text-red-600' :
                  note.type === 'success' ? 'bg-green-100 text-green-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {note.type === 'critical' ? '⚠️' : note.type === 'success' ? '✅' : 'ℹ️'}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-medium text-gray-900 ${!note.read && 'font-bold'}`}>
                      {note.title}
                    </h3>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                      {note.date}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {note.message}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                      Delivered via WAN
                    </span>
                    {!note.read && (
                      <button 
                        onClick={() => handleMarkRead(note.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Notifications
