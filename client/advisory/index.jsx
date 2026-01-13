import React, { useState } from 'react'
import { consultations, advisoryArticles } from '../utils/mockData.js'
import './style.css'

function Advisory() {
  const [activeTab, setActiveTab] = useState('consultations')
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showNewTicketModal, setShowNewTicketModal] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Expert Advisory Hub</h1>
          <button 
            onClick={() => setShowNewTicketModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            + New Consultation
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex gap-6 text-sm font-medium text-gray-500">
          <button 
            onClick={() => setActiveTab('consultations')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'consultations' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-700'}`}
          >
            My Consultations
          </button>
          <button 
            onClick={() => setActiveTab('knowledge')}
            className={`pb-3 border-b-2 transition-colors ${activeTab === 'knowledge' ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-700'}`}
          >
            Knowledge Base
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: List / Chat */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'consultations' && (
            <>
              {selectedTicket ? (
                // Chat Interface
                <div className="bg-white rounded-xl border shadow-sm flex flex-col h-[600px]">
                  <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-xl">
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedTicket.subject}</h3>
                      <span className="text-xs text-gray-500">with {selectedTicket.expert} • Started {selectedTicket.date}</span>
                    </div>
                    <button onClick={() => setSelectedTicket(null)} className="text-gray-400 hover:text-gray-600">
                      ✕ Close
                    </button>
                  </div>
                  
                  <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
                    {/* Mock Chat History */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-tr-lg max-w-[80%] text-sm shadow-sm">
                        Hello, I noticed yellow spots on my maize leaves. Is this rust?
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white border text-gray-800 p-3 rounded-r-lg rounded-tl-lg max-w-[80%] text-sm shadow-sm">
                        Could you please upload a clear photo of the underside of the leaf?
                      </div>
                    </div>
                    <div className="flex justify-center my-4">
                       <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Cloud Auto-Sync: Messages saved</span>
                    </div>
                  </div>

                  <div className="p-4 border-t bg-white rounded-b-xl">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 border rounded-lg">
                        📷
                      </button>
                      <input 
                        type="text" 
                        placeholder="Type your message..." 
                        className="flex-1 border rounded-lg px-4 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                        Send
                      </button>
                    </div>
                    <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                       <span>☁️</span> Messages are queued via WAN if offline.
                    </div>
                  </div>
                </div>
              ) : (
                // Ticket List
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-bold text-gray-800">Active Consultations</h3>
                  </div>
                  <div className="divide-y">
                    {consultations.map(ticket => (
                      <div 
                        key={ticket.id} 
                        onClick={() => setSelectedTicket(ticket)}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition flex justify-between items-center group"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-2 h-2 rounded-full ${ticket.status === 'Active' ? 'bg-green-500' : ticket.status === 'Pending' ? 'bg-yellow-500' : 'bg-gray-400'}`}></span>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{ticket.subject}</h4>
                          </div>
                          <p className="text-sm text-gray-600 truncate max-w-md">{ticket.lastMsg}</p>
                          <div className="text-xs text-gray-400 mt-1">
                            {ticket.expert} • {ticket.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {ticket.unread > 0 && (
                            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {ticket.unread} new
                            </span>
                          )}
                          <span className="text-gray-300">›</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'knowledge' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {advisoryArticles.map(article => (
                 <div key={article.id} className="bg-white p-4 rounded-xl border hover:shadow-md transition cursor-pointer">
                   <div className="text-xs font-bold text-blue-600 uppercase mb-2">{article.category}</div>
                   <h3 className="font-bold text-lg text-gray-900 mb-2">{article.title}</h3>
                   <div className="flex justify-between items-center text-xs text-gray-500">
                     <span>By {article.author}</span>
                     <span>{article.views} views</span>
                   </div>
                 </div>
               ))}
             </div>
          )}
        </div>

        {/* Right Column: Profile & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border shadow-sm p-6 text-center">
             <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-3xl mb-4">
               👨‍🌾
             </div>
             <h3 className="font-bold text-xl text-gray-900">Expert Network</h3>
             <p className="text-gray-500 text-sm mb-4">
               Connect with over 50+ certified agronomists available via WAN.
             </p>
             <div className="flex justify-center gap-4 text-sm">
               <div className="text-center">
                 <div className="font-bold text-gray-900">24h</div>
                 <div className="text-gray-400 text-xs">Avg Response</div>
               </div>
               <div className="text-center">
                 <div className="font-bold text-gray-900">4.8</div>
                 <div className="text-gray-400 text-xs">Satisfaction</div>
               </div>
             </div>
          </div>

          <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
            <h4 className="font-bold text-blue-800 mb-2 text-sm">Cloud-Based Diagnosis</h4>
            <p className="text-xs text-blue-700 leading-relaxed">
              Photos uploaded to consultations are processed by our cloud AI to suggest potential diseases to the expert, speeding up diagnosis.
            </p>
          </div>
        </div>

      </div>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl">
            <h2 className="text-xl font-bold mb-4">New Consultation Request</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input type="text" className="w-full border rounded-lg p-2" placeholder="e.g. Unknown pest on tomato" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full border rounded-lg p-2 h-32" placeholder="Describe the symptoms..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500 hover:bg-gray-50 transition cursor-pointer">
                  Click to upload from device
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowNewTicketModal(false)} className="text-gray-600 hover:text-gray-900 px-4 py-2">Cancel</button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Advisory
