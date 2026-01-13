import React from 'react'

function ProductCard({ item, onViewDetails }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full group">
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        {item.images && item.images[0] ? (
          <img src={item.images[0]} alt={item.product} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl bg-green-50 text-green-200">
             🌱
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-xs font-bold px-2 py-1 rounded shadow-sm">
          {item.category}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900">{item.product}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${item.availability === 'In Stock' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {item.availability || 'In Stock'}
          </span>
        </div>
        
        <div className="text-2xl font-bold text-green-600 mb-2">
          CFA {item.price} <span className="text-sm font-normal text-gray-500">/ unit</span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4 flex-1">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {item.location}
          </div>
          <div className="flex items-center gap-2">
             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
             {item.sellerName || 'Unknown Seller'}
          </div>
          <div className="flex items-center gap-2">
             <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
             Qty: {item.quantity}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button 
            onClick={() => onViewDetails(item)}
            className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium"
          >
            View Details
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
