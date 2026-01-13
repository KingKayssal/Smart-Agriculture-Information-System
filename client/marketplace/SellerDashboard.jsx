import React, { useState } from 'react'
import { api } from '../utils/api.js'

function SellerDashboard({ onProductAdded }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [form, setForm] = useState({
    product: '', category: 'Grains', quantity: '', price: '', 
    location: '', description: '', productType: 'Organic',
    harvestDate: '', farmingMethod: '', storage: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const newItem = await api.marketplace.addItem({
        ...form,
        quantity: Number(form.quantity),
        price: Number(form.price),
        sellerName: 'You (Farmer)',
        sellerRating: 5.0,
        availability: 'In Stock',
        images: []
      })
      onProductAdded(newItem)
      setForm({
        product: '', category: 'Grains', quantity: '', price: '', 
        location: '', description: '', productType: 'Organic',
        harvestDate: '', farmingMethod: '', storage: ''
      })
      setIsExpanded(false)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Farmer Dashboard</h2>
          <p className="text-gray-500 text-sm">Manage your listings and cloud-stored inventory.</p>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          {isExpanded ? 'Cancel' : '+ Add New Listing'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg border animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input required className="w-full border rounded p-2" value={form.product} onChange={e => setForm({...form, product: e.target.value})} placeholder="e.g. Yellow Corn" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select className="w-full border rounded p-2" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                <option>Grains</option>
                <option>Vegetables</option>
                <option>Fruits</option>
                <option>Livestock</option>
                <option>Cash Crops</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (CFA)</label>
              <input required type="number" className="w-full border rounded p-2" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input required type="number" className="w-full border rounded p-2" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select className="w-full border rounded p-2" value={form.productType} onChange={e => setForm({...form, productType: e.target.value})}>
                <option>Organic</option>
                <option>Non-organic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Harvest Date</label>
              <input type="date" className="w-full border rounded p-2" value={form.harvestDate} onChange={e => setForm({...form, harvestDate: e.target.value})} />
            </div>
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input required className="w-full border rounded p-2" value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Region / City" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Farming Method</label>
              <input className="w-full border rounded p-2" value={form.farmingMethod} onChange={e => setForm({...form, farmingMethod: e.target.value})} placeholder="e.g. Greenhouse" />
            </div>
          </div>
          <div className="mb-4">
             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
             <textarea className="w-full border rounded p-2 h-24" value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe your product..." />
          </div>
          <button disabled={submitting} className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50">
            {submitting ? 'Uploading to Cloud...' : 'Publish Listing'}
          </button>
        </form>
      )}
    </div>
  )
}

export default SellerDashboard
