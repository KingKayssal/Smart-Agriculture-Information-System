import React, { useEffect, useMemo, useState } from 'react'
import { api } from '../utils/api.js'
import MarketplaceHeader from './MarketplaceHeader.jsx'
import MarketplaceFilters from './MarketplaceFilters.jsx'
import ProductCard from './ProductCard.jsx'
import ProductModal from './ProductModal.jsx'
import SellerDashboard from './SellerDashboard.jsx'
import MarketInsights from './MarketInsights.jsx'
import './style.css'

function Marketplace() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    type: '',
    rating: '0',
    minQuantity: '',
    harvestDate: ''
  })

  // Modal State
  const [selectedProduct, setSelectedProduct] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketItems, currentUser] = await Promise.all([
          api.marketplace.getItems(),
          api.auth.getCurrentUser()
        ])
        setItems(Array.isArray(marketItems) ? marketItems : [])
        setUser(currentUser || { role: 'Guest' }) // Default to Guest if no user
      } catch (err) {
        console.error('Failed to load marketplace data', err)
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredItems = useMemo(() => {
    if (!Array.isArray(items)) return []
    return items.filter(item => {
      // Search
      if (searchTerm && !item.product.toLowerCase().includes(searchTerm.toLowerCase())) return false
      
      // Category
      if (category !== 'All' && item.category !== category) return false
      
      // Advanced Filters
      if (filters.location && item.location !== filters.location) return false
      if (filters.minPrice && item.price < Number(filters.minPrice)) return false
      if (filters.maxPrice && item.price > Number(filters.maxPrice)) return false
      if (filters.type && item.productType !== filters.type) return false
      if (filters.rating && (item.sellerRating || 0) < Number(filters.rating)) return false
      if (filters.minQuantity && item.quantity < Number(filters.minQuantity)) return false
      if (filters.harvestDate && item.harvestDate && item.harvestDate < filters.harvestDate) return false
      
      return true
    })
  }, [items, searchTerm, category, filters])

  const handleProductAdded = (newItem) => {
    setItems(prev => [newItem, ...prev])
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <MarketplaceHeader 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Role-Based Views */}
        {user?.role === 'Farmer' && (
          <SellerDashboard onProductAdded={handleProductAdded} />
        )}
        
        {/* Market Insights (Visible to all, maybe detailed for experts) */}
        <MarketInsights />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <MarketplaceFilters filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-700">
                {filteredItems.length} Products Found
              </h2>
              <div className="text-sm text-gray-500">
                Sorted by: <span className="font-medium text-gray-900">Newest First</span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(n => (
                  <div key={n} className="bg-white rounded-xl h-80 animate-pulse border"></div>
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <ProductCard 
                    key={item.id} 
                    item={item} 
                    onViewDetails={setSelectedProduct} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('')
                    setCategory('All')
                    setFilters({ location: '', minPrice: '', maxPrice: '', type: '', rating: '0', minQuantity: '', harvestDate: '' })
                  }}
                  className="mt-4 text-green-600 font-medium hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>

        {/* Cloud & WAN Technical Section */}
        <section className="mt-16 bg-gray-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Powered by Cloud & WAN Technology</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The SAIS Marketplace is a cloud-based digital trading platform that uses WAN connectivity to allow farmers and buyers in different locations to exchange agricultural products, prices, and market information in real time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">☁️</div>
                  <span className="text-sm text-gray-300">Product data stored securely in distributed cloud databases.</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">🌐</div>
                  <span className="text-sm text-gray-300">Accessible from remote farms via Wide Area Networks (WAN).</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">🔒</div>
                  <span className="text-sm text-gray-300">Encrypted transactions and role-based data access.</span>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
               {/* Abstract Network Visualization */}
               <div className="w-64 h-64 bg-white/5 rounded-full flex items-center justify-center border border-white/10 relative animate-pulse-slow">
                 <div className="absolute inset-0 border border-green-500/30 rounded-full animate-ping-slow"></div>
                 <div className="text-center">
                   <div className="text-4xl mb-2">📡</div>
                   <div className="text-xs font-mono text-green-400">WAN CONNECTED</div>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal 
          item={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  )
}

export default Marketplace
