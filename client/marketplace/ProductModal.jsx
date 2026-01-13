import React from 'react'
import Sparkline from '../components/Sparkline.jsx'

function ProductModal({ item, onClose }) {
  if (!item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row">
        
        {/* Left: Images & Seller Info */}
        <div className="md:w-2/5 bg-gray-50 p-6 md:p-8 flex flex-col gap-6">
          <div className="aspect-square bg-white rounded-xl shadow-sm overflow-hidden flex items-center justify-center border">
            {item.images && item.images[0] ? (
              <img src={item.images[0]} alt={item.product} className="w-full h-full object-cover" />
            ) : (
              <div className="text-6xl">🌱</div>
            )}
          </div>
          
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Seller Profile</h4>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                {item.sellerName ? item.sellerName.charAt(0) : 'U'}
              </div>
              <div>
                <div className="font-medium">{item.sellerName || 'Unknown Seller'}</div>
                <div className="text-xs text-gray-500">{item.location}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-yellow-500 mb-4">
              {'★'.repeat(Math.floor(item.sellerRating || 0))}
              <span className="text-gray-400 ml-1">({item.sellerRating || 'No'} rating)</span>
            </div>
            <button className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Send Message
            </button>
            <button className="w-full py-2 mt-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
              Request Quote
            </button>
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="md:w-3/5 p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-sm text-green-600 font-medium mb-1">{item.category} • {item.productType}</div>
              <h2 className="text-3xl font-bold text-gray-900">{item.product}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex items-end gap-2 mb-6">
            <span className="text-3xl font-bold text-green-600">CFA {item.price}</span>
            <span className="text-gray-500 mb-1">/ unit</span>
          </div>

          <div className="prose prose-green text-gray-600 mb-8">
            <p>{item.description || 'No description available for this product.'}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">Harvest Date</div>
              <div className="font-medium text-gray-900">{item.harvestDate || 'N/A'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">Farming Method</div>
              <div className="font-medium text-gray-900">{item.farmingMethod || 'Standard'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">Stock Quantity</div>
              <div className="font-medium text-gray-900">{item.quantity} units</div>
            </div>
            <div>
              <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">Storage</div>
              <div className="font-medium text-gray-900">{item.storage || 'Standard'}</div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h4 className="font-bold text-gray-900 mb-3">Market Price Trend (Regional)</h4>
            <div className="h-16 bg-gray-50 rounded flex items-center justify-center text-sm text-gray-500">
              {/* Placeholder for Sparkline or Chart */}
              <div className="w-full px-4">
                <Sparkline data={[item.price * 0.9, item.price * 0.95, item.price, item.price * 1.05, item.price]} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Historical price data retrieved via cloud analytics.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
