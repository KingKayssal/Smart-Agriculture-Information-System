import React from 'react'
import { sampleWeather } from '../utils/mockData.js'

function DashboardWeatherCard() {
  const today = sampleWeather[0]
  return (
    <div className="bg-white border rounded p-4">
      <h3 className="font-semibold mb-2">Weather Overview</h3>
      <div className="text-sm">{today.day}: {today.summary}</div>
      <div className="text-sm">Temp: {today.tempMin}°C → {today.tempMax}°C</div>
      <div className="text-sm">Humidity: {today.humidity}%</div>
      <div className="text-sm">Rainfall: {today.rainfall} mm</div>
    </div>
  )
}

export default DashboardWeatherCard
