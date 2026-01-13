import React from 'react'
import { sampleWeather } from '../utils/mockData.js'
import WeatherChart from './WeatherChart.jsx'
import WeatherRecommendation from './WeatherRecommendation.jsx'
import './style.css'

function Weather() {
  const alerts = sampleWeather.filter((w) => w.summary === 'Storm' || w.rainfall >= 20).map((w) => `${w.day}: ${w.summary}`)
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Weather & Alerts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sampleWeather.map((w) => (
          <div key={w.day} className="bg-white border rounded p-4">
            <div className="font-medium">{w.day}</div>
            <div className="text-sm text-gray-600">{w.summary}</div>
            <div className="text-sm">Temp: {w.tempMin}°C → {w.tempMax}°C</div>
            <div className="text-sm">Humidity: {w.humidity}%</div>
            <div className="text-sm">Rainfall: {w.rainfall} mm</div>
          </div>
        ))}
      </div>
      <div className="bg-white border rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Alerts</h3>
        {alerts.length ? (
          <ul className="list-disc ml-5 space-y-1">
            {alerts.map((a) => (
              <li key={a} className="text-red-700">{a}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No alerts.</p>
        )}
      </div>
      <div className="bg-white border rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Rainfall</h3>
        <WeatherChart />
      </div>
      <div className="bg-white border rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
        <WeatherRecommendation />
      </div>
    </div>
  )
}

export default Weather
