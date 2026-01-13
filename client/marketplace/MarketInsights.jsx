import React from 'react'

function MarketInsights() {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
        Market Insights & Trends
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="text-sm text-gray-500 mb-1">Average Maize Price</div>
          <div className="text-2xl font-bold text-gray-900">CFA 180 <span className="text-sm text-green-500 font-normal">▲ 2.4%</span></div>
          <div className="h-1 w-full bg-gray-200 mt-2 rounded overflow-hidden">
            <div className="h-full bg-green-500 w-3/4"></div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="text-sm text-gray-500 mb-1">Top Demand Region</div>
          <div className="text-2xl font-bold text-gray-900">North</div>
          <div className="text-xs text-gray-400 mt-2">Based on WAN traffic analysis</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border">
          <div className="text-sm text-gray-500 mb-1">Active Listings</div>
          <div className="text-2xl font-bold text-gray-900">1,245</div>
          <div className="text-xs text-gray-400 mt-2">Updated in real-time</div>
        </div>
      </div>
    </div>
  )
}

export default MarketInsights
