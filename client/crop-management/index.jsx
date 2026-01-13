import React, { useEffect, useState } from 'react'
import { api } from '../utils/api.js'
import './style.css'

function CropManagement() {
  const [activeTab, setActiveTab] = useState('active')
  const [crops, setCrops] = useState([])
  const [soilTests, setSoilTests] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Forms
  const [showAddCrop, setShowAddCrop] = useState(false)
  const [newCrop, setNewCrop] = useState({ name: '', variety: '', plantingDate: '', area: '', stage: 'Seedling' })

  useEffect(() => {
    Promise.all([
      api.crops.getCrops(),
      api.crops.getSoilTests(),
      api.crops.getActivities()
    ]).then(([c, s, a]) => {
      // Mock some data if empty for demo
      if (c.length === 0) {
        c = [
          { id: 1, name: 'Maize', variety: 'Hybrid 614', plantingDate: '2025-10-15', area: '2 Acres', stage: 'Vegetative', status: 'Active' },
          { id: 2, name: 'Rice', variety: 'Basmati', plantingDate: '2025-09-01', area: '1.5 Acres', stage: 'Harvest Ready', status: 'Active' },
        ]
      }
      setCrops(c)
      setSoilTests(s)
      setActivities(a)
    }).finally(() => setLoading(false))
  }, [])

  const handleAddCrop = async (e) => {
    e.preventDefault()
    const added = await api.crops.addCrop({ ...newCrop, status: 'Active' })
    setCrops([added, ...crops])
    setShowAddCrop(false)
    setNewCrop({ name: '', variety: '', plantingDate: '', area: '', stage: 'Seedling' })
  }

  const getStageProgress = (stage) => {
    const stages = ['Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Harvest Ready']
    const idx = stages.indexOf(stage)
    return ((idx + 1) / stages.length) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Crop Management Ledger</h1>
            <p className="text-sm text-gray-500">Track production, soil health, and farm activities.</p>
          </div>
          <button 
            onClick={() => setShowAddCrop(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span> Start New Cycle
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm font-medium text-gray-500">
          <button 
            onClick={() => setActiveTab('active')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'active' ? 'border-green-600 text-green-600' : 'border-transparent hover:text-gray-700'}`}
          >
            Active Crops
          </button>
          <button 
            onClick={() => setActiveTab('soil')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'soil' ? 'border-green-600 text-green-600' : 'border-transparent hover:text-gray-700'}`}
          >
            Soil Health
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'history' ? 'border-green-600 text-green-600' : 'border-transparent hover:text-gray-700'}`}
          >
            History & Logs
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Active Crops Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Total Planted Area</div>
                <div className="text-2xl font-bold text-gray-900">3.5 Acres</div>
              </div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Expected Harvest</div>
                <div className="text-2xl font-bold text-gray-900">Dec 2025</div>
              </div>
              <div className="bg-white p-4 rounded-xl border shadow-sm">
                <div className="text-sm text-gray-500 mb-1">Active Batches</div>
                <div className="text-2xl font-bold text-gray-900">{crops.length}</div>
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Crop / Variety</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Planting Date</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Area</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm w-1/3">Stage</th>
                    <th className="p-4 font-semibold text-gray-600 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {crops.map(crop => (
                    <tr key={crop.id} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <div className="font-bold text-gray-900">{crop.name}</div>
                        <div className="text-xs text-gray-500">{crop.variety}</div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">{crop.plantingDate}</td>
                      <td className="p-4 text-sm text-gray-600">{crop.area}</td>
                      <td className="p-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-green-700">{crop.stage}</span>
                          <span className="text-gray-400">{Math.round(getStageProgress(crop.stage))}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${getStageProgress(crop.stage)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="p-4">
                        <button className="text-blue-600 hover:underline text-sm font-medium mr-3">Update</button>
                        <button className="text-gray-500 hover:text-gray-700 text-sm">Log Activity</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {crops.length === 0 && (
                <div className="p-8 text-center text-gray-500">No active crops found. Start a new cycle!</div>
              )}
            </div>
          </div>
        )}

        {/* Soil Health Tab */}
        {activeTab === 'soil' && (
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Recent Soil Tests</h3>
              <button className="text-green-600 border border-green-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-50">
                + Add Test Result
              </button>
            </div>
            {/* Placeholder for Soil Chart/List */}
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-yellow-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-gray-900">Block A - North Corner</h4>
                    <p className="text-xs text-gray-500">Tested: 2025-11-01</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">Attention Needed</span>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-3 text-center">
                  <div className="bg-white p-2 rounded border">
                    <div className="text-xs text-gray-500">pH</div>
                    <div className="font-bold text-red-600">5.2</div>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <div className="text-xs text-gray-500">Nitrogen</div>
                    <div className="font-bold text-green-600">High</div>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <div className="text-xs text-gray-500">Phos.</div>
                    <div className="font-bold text-gray-900">Med</div>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <div className="text-xs text-gray-500">Potas.</div>
                    <div className="font-bold text-gray-900">Med</div>
                  </div>
                  <div className="bg-white p-2 rounded border">
                    <div className="text-xs text-gray-500">Moisture</div>
                    <div className="font-bold text-green-600">45%</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-700 bg-white p-3 rounded border border-yellow-100">
                  <strong>Recommendation:</strong> Soil is acidic. Apply agricultural lime before next planting.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border shadow-sm p-8 text-center">
            <div className="text-4xl mb-4">☁️</div>
            <h3 className="text-lg font-bold text-gray-900">Cloud Archive</h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              Your historical farming data is securely stored in the cloud. You can access reports from previous seasons to analyze yield trends.
            </p>
            <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">
              Access Cloud Archives
            </button>
          </div>
        )}

      </div>

      {/* Add Crop Modal */}
      {showAddCrop && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Start New Crop Cycle</h2>
            <form onSubmit={handleAddCrop} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
                <input 
                  type="text" 
                  required
                  className="w-full border rounded-lg p-2" 
                  placeholder="e.g. Maize" 
                  value={newCrop.name}
                  onChange={e => setNewCrop({...newCrop, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Variety</label>
                <input 
                  type="text" 
                  className="w-full border rounded-lg p-2" 
                  placeholder="e.g. Hybrid 614" 
                  value={newCrop.variety}
                  onChange={e => setNewCrop({...newCrop, variety: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Planting Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full border rounded-lg p-2" 
                    value={newCrop.plantingDate}
                    onChange={e => setNewCrop({...newCrop, plantingDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
                  <input 
                    type="text" 
                    required
                    className="w-full border rounded-lg p-2" 
                    placeholder="e.g. 2.5" 
                    value={newCrop.area}
                    onChange={e => setNewCrop({...newCrop, area: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowAddCrop(false)} className="text-gray-600 hover:text-gray-900 px-4 py-2">Cancel</button>
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Save & Start</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CropManagement
