import React from 'react'
import { sampleWeather } from '../utils/mockData.js'

function WeatherRecommendation() {
  const rainy = sampleWeather.some((d) => d.rainfall >= 20)
  const dry = sampleWeather.every((d) => d.rainfall === 0)
  const msg = rainy
    ? 'Heavy rain expected. Plan pesticide application for dry windows.'
    : dry
    ? 'Dry week. Consider irrigation schedules and mulch to conserve moisture.'
    : 'Mixed conditions. Monitor humidity for disease management.'
  return <p className="text-gray-700">{msg}</p>
}

export default WeatherRecommendation
