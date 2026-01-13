import React from 'react'

function MarketplaceHeader({ searchTerm, setSearchTerm, category, setCategory }) {
  const categories = ['All', 'Grains', 'Vegetables', 'Fruits', 'Livestock', 'Cash Crops']

  return (
    <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agricultural Marketplace</h1>
            <p className="text-gray-600 text-sm mt-1">Buy and sell fresh farm products anytime, anywhere</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full sm:w-64 pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select 
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceHeader
