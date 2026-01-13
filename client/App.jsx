import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth.jsx'
import NotFound from './not-found/index.jsx'
import Landing from './landing/index.jsx'
import About from './about/index.jsx'
import Login from './login/index.jsx'
import Register from './register/index.jsx'
import Dashboard from './dashboard/index.jsx'
import Weather from './weather/index.jsx'
import Market from './market/index.jsx'
import CropManagement from './crop-management/index.jsx'
import Marketplace from './marketplace/index.jsx'
import Alerts from './alerts/index.jsx'
import Messages from './messages/index.jsx'
import Advisory from './advisory/index.jsx'
import Reports from './reports/index.jsx'
import Profile from './profile/index.jsx'
import Admin from './admin/index.jsx'
import Notifications from './notifications/index.jsx'
import MainLayout from './MainLayout.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/crop-management" element={<CropManagement />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/weather" element={<Weather />} />
          <Route path="/market" element={<Market />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/advisory" element={<Advisory />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
