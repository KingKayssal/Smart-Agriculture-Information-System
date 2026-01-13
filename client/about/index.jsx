import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-3xl font-bold text-gray-900">About the Smart Agriculture Information System (SAIS)</h1>
          <p className="text-gray-600 mt-2">
            SAIS is a cloud-based platform delivered over Wide Area Networks (WAN) to connect farmers, buyers, experts, and administrators across regions with secure, data-driven agricultural services.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-10">
        <section className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Mission & Vision</h2>
          <p className="text-gray-700">
            Our mission is to enable smart farming decisions, efficient market access, and expert collaboration by storing and processing agricultural data in the cloud and making it accessible via WAN to distributed communities.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Smart Farming</div>
              <div className="font-semibold text-gray-900">Crop analytics, sensor data, and advisory</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Digital Marketplace</div>
              <div className="font-semibold text-gray-900">Listings, orders, and price intelligence</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Expert Collaboration</div>
              <div className="font-semibold text-gray-900">Remote case handling and knowledge base</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">System Architecture</h2>
          <p className="text-gray-700">
            Users in multiple regions access SAIS over WAN. Requests are routed to cloud services where data is stored and processed. Insights and updates are returned in real time to web clients.
          </p>
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">WAN Clients</div>
              <div className="font-semibold text-gray-900">Farmers, Buyers, Experts, Admins</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Cloud APIs</div>
              <div className="font-semibold text-gray-900">Authentication, marketplace, advisory, analytics</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Data Platform</div>
              <div className="font-semibold text-gray-900">Storage, processing, forecasting models</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Observability</div>
              <div className="font-semibold text-gray-900">Usage metrics, audit logs, WAN health</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Role Journeys</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <div className="font-bold text-green-700 mb-1">Farmer</div>
              <div className="text-sm text-gray-700">Manage crops, view advisories, monitor sensors, access market prices.</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="font-bold text-blue-700 mb-1">Buyer</div>
              <div className="text-sm text-gray-700">Discover listings, analyze trends, place orders, message sellers.</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="font-bold text-emerald-700 mb-1">Expert</div>
              <div className="text-sm text-gray-700">Receive cases, analyze data, deliver recommendations, contribute to knowledge base.</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="font-bold text-purple-700 mb-1">Admin</div>
              <div className="text-sm text-gray-700">Monitor system health, manage users and roles, oversee marketplace moderation.</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Governance & Security</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Access Control</div>
              <div className="font-semibold text-gray-900">Role-based visibility and permissions</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Data Protection</div>
              <div className="font-semibold text-gray-900">Encrypted transport and secure storage</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Audit & Compliance</div>
              <div className="font-semibold text-gray-900">Logging, alerts, policy enforcement</div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-2">Contact & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Contact</div>
              <div className="font-semibold text-gray-900">support@sais.example</div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-gray-500">Documentation</div>
              <button className="mt-1 px-4 py-2 rounded-lg bg-green-600 text-white">Download Overview</button>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            This page is served from cloud infrastructure and accessible via WAN for stakeholders across regions.
          </p>
        </section>
      </main>
    </div>
  )
}

export default About
