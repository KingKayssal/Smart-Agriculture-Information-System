import React, { useEffect, useState } from 'react'
import { api } from '../utils/api.js'
import './style.css'

function Messages() {
  const [messages, setMessages] = useState([])
  const [form, setForm] = useState({ to: '', role: 'Expert', text: '' })
  const [wan, setWan] = useState('Connected')

  useEffect(() => {
    api.messages.getMessages().then(setMessages)
    const interval = setInterval(() => {
      setWan(navigator.onLine ? 'Connected' : 'Offline')
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const send = async (e) => {
    e.preventDefault()
    if (!form.to || !form.text) return
    const saved = await api.messages.sendMessage(form)
    setMessages((prev) => [saved, ...prev])
    setForm({ to: '', role: 'Expert', text: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Messages & Alerts</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border">
          <div className={`w-3 h-3 rounded-full ${wan === 'Connected' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-gray-600">WAN: {wan}</span>
        </div>
      </div>

      <section className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-2">Compose</h3>
        <form onSubmit={send} className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <select className="border rounded px-3 py-2" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}>
            <option value="Expert">Expert</option>
            <option value="Buyer">Buyer</option>
            <option value="Admin">Admin</option>
          </select>
          <input className="border rounded px-3 py-2" placeholder="Recipient" value={form.to} onChange={(e) => setForm((f) => ({ ...f, to: e.target.value }))} />
          <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Message" value={form.text} onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))} />
          <button className="bg-green-600 text-white px-4 py-2 rounded">Send</button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Role-based messaging is enforced; sensitive communications are stored securely in the cloud and delivered over WAN.
        </p>
      </section>

      <section className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-2">Inbox</h3>
        {messages.length === 0 ? (
          <div className="text-gray-600">No messages.</div>
        ) : (
          <div className="space-y-2">
            {messages.map((m) => (
              <div key={m.id} className="border rounded p-3">
                <div className="flex justify-between items-center">
                  <div className="font-medium">To: {m.to}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.role === 'Expert' ? 'bg-blue-100 text-blue-700' : m.role === 'Buyer' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                    {m.role}
                  </span>
                </div>
                <div className="text-sm text-gray-700 mt-1">{m.text}</div>
                <div className="text-xs text-gray-500 mt-1">{m.date}</div>
                <div className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  Delivered via WAN
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-2">System Alerts</h3>
        <p className="text-sm text-gray-700">Critical notifications and advisories are available on the Alerts and Notifications pages.</p>
        <div className="mt-2 flex gap-2">
          <a href="/alerts" className="px-3 py-2 rounded border">Open Alerts</a>
          <a href="/notifications" className="px-3 py-2 rounded border">Open Notifications</a>
        </div>
      </section>

      <p className="text-xs text-gray-500">
        Cloud-hosted messaging ensures persistence and audit logging, while WAN connectivity enables remote stakeholders to communicate securely.
      </p>
    </div>
  )
}

export default Messages
