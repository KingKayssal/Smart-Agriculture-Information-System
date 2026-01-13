import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Cloud, Wifi, Users, MapPin, Cpu } from 'lucide-react'

const StatCard = ({ icon, value, label, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color.bg} mb-4`}>
      {React.cloneElement(icon, { className: `w-6 h-6 ${color.text}` })}
    </div>
    <p className="text-4xl font-bold text-gray-900">{value}</p>
    <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>
  </div>
)

const Feature = ({ icon, title, description }) => (
  <div className="text-center p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow">
    <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
)

function Landing() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white pt-32 pb-20 md:pt-48 md:pb-32">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/hero-bg.svg')"}}></div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            The Future of Farming is Connected
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-green-200">
            SAIS is a cloud-based smart agriculture platform that connects farmers, experts, and buyers across different regions through Wide Area Network (WAN) technologies.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-white text-green-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-transform hover:scale-105 shadow-2xl">
              Join the Network
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <StatCard icon={<Users />} value="1,200+" label="Farmers Connected" color={{bg: 'bg-blue-100', text: 'text-blue-600'}} />
            <StatCard icon={<Cpu />} value="350+" label="Experts Online" color={{bg: 'bg-green-100', text: 'text-green-600'}} />
            <StatCard icon={<MapPin />} value="15+" label="Regions Covered" color={{bg: 'bg-yellow-100', text: 'text-yellow-600'}} />
          </div>
          <p className="mt-12 text-center text-gray-600 max-w-4xl mx-auto">
            These statistics reflect the reach of SAIS across regions, demonstrating how cloud computing and WAN connectivity enable farmers and agricultural experts to collaborate and share information beyond local boundaries.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">A Unified Agricultural Ecosystem</h2>
            <p className="text-lg text-gray-600 mt-4">
              Leveraging Cloud and WAN technologies to deliver real-time insights and connect every stakeholder.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Feature icon={<Cloud size={28} />} title="Cloud Data Platform" description="Securely store, process, and analyze all your farm data in a centralized cloud environment." />
            <Feature icon={<Wifi size={28} />} title="WAN Connectivity" description="Access real-time information and collaborate from anywhere, breaking geographical barriers." />
            <Feature icon={<Users size={28} />} title="Expert Network" description="Connect with agronomists and specialists for timely advice and data-driven recommendations." />
            <Feature icon={<CheckCircle size={28} />} title="Digital Marketplace" description="Buy and sell produce directly through an integrated, transparent, and efficient digital market." />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cloud & Connectivity at the Core</h2>
            <p className="mt-6 text-lg text-gray-600">
              The Smart Agriculture Information System operates entirely on cloud infrastructure, where agricultural data is securely stored, processed, and analyzed. Using Wide Area Network (WAN) connectivity, users can access real-time farming information, expert advice, and market opportunities regardless of their geographical location.
            </p>
            <ul className="mt-8 space-y-4">
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Centralized Data Hub:</span> All farm-related data is aggregated in the cloud for powerful analytics.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Remote Accessibility:</span> WAN technology ensures seamless access for users in diverse geographical locations.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                <span><span className="font-semibold">Scalable Infrastructure:</span> The cloud-based system scales effortlessly to accommodate a growing network of users and data.</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img src="/how-it-works.svg" alt="Cloud and WAN diagram" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Transform Your Agricultural Practice Today</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-green-200">
            By combining cloud computing, real-time data processing, and wide-area connectivity, SAIS transforms traditional farming into a smart, data-driven agricultural system.
          </p>
          <div className="mt-8">
            <Link to="/register" className="px-10 py-4 bg-white text-green-700 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-transform hover:scale-105 shadow-2xl">
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
