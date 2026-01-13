import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
       <a href="#main" className="sr-only focus:not-sr-only focus:block focus:bg-green-100 p-2">Skip to content</a>
       
       <Navbar />

       <main id="main" className="flex-1">
         <Outlet />
       </main>

       <Footer />
    </div>
  )
}

export default MainLayout
