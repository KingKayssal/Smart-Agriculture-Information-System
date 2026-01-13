import React from 'react'
import { sampleWeather } from '../utils/mockData.js'

function WeatherChart() {
  const width = 240
  const height = 80
  const maxRain = Math.max(...sampleWeather.map((d) => d.rainfall)) || 1
  const barW = Math.floor(width / sampleWeather.length)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Rainfall chart">
      {sampleWeather.map((d, i) => {
        const h = Math.round((d.rainfall / maxRain) * (height - 10))
        const x = i * barW + 4
        const y = height - h
        return (
          <g key={d.day}>
            <rect x={x} y={y} width={barW - 8} height={h} fill="#38bdf8" />
            <text x={x + (barW - 8) / 2} y={height - 2} fontSize="10" textAnchor="middle" fill="#374151">{d.day}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default WeatherChart
