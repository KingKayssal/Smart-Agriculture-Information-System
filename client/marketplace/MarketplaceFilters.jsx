import React from 'react'

function MarketplaceFilters({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="bg-white p-4 border rounded-lg h-fit sticky top-24">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
        Filters
      </h3>
      
      <div className="space-y-6">
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <select 
            className="w-full border rounded-md p-2 text-sm"
            value={filters.location}
            onChange={(e) => handleChange('location', e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (CFA)</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full border rounded-md p-2 text-sm"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full border rounded-md p-2 text-sm"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Quantity Available */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Quantity</label>
          <input 
            type="number" 
            placeholder="e.g. 50" 
            className="w-full border rounded-md p-2 text-sm"
            value={filters.minQuantity || ''}
            onChange={(e) => handleChange('minQuantity', e.target.value)}
          />
        </div>

        {/* Harvest Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harvested After</label>
          <input 
            type="date" 
            className="w-full border rounded-md p-2 text-sm"
            value={filters.harvestDate || ''}
            onChange={(e) => handleChange('harvestDate', e.target.value)}
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="radio" 
                name="type" 
                value="" 
                checked={filters.type === ''}
                onChange={() => handleChange('type', '')}
                className="text-green-600 focus:ring-green-500"
              />
              Any
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="radio" 
                name="type" 
                value="Organic" 
                checked={filters.type === 'Organic'}
                onChange={() => handleChange('type', 'Organic')}
                className="text-green-600 focus:ring-green-500"
              />
              Organic
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input 
                type="radio" 
                name="type" 
                value="Non-organic" 
                checked={filters.type === 'Non-organic'}
                onChange={() => handleChange('type', 'Non-organic')}
                className="text-green-600 focus:ring-green-500"
              />
              Non-organic
            </label>
          </div>
        </div>

        {/* Min Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Min Seller Rating</label>
          <select 
            className="w-full border rounded-md p-2 text-sm"
            value={filters.rating}
            onChange={(e) => handleChange('rating', e.target.value)}
          >
            <option value="0">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        <button 
          onClick={() => setFilters({ location: '', minPrice: '', maxPrice: '', type: '', rating: '0', minQuantity: '', harvestDate: '' })}
          className="w-full text-sm text-gray-500 hover:text-green-600 underline"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

export default MarketplaceFilters
