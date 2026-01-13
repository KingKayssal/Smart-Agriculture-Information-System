import React from 'react'

function SoilTrendChart() {
  const data = [6.0, 6.2, 6.5, 6.3, 6.6]
  const width = 240
  const height = 80
  const max = Math.max(...data)
  const min = Math.min(...data)
  const barW = Math.floor(width / data.length)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Soil pH trend">
      {data.map((v, i) => {
        const h = Math.round(((v - min) / (max - min || 1)) * (height - 10))
        const x = i * barW + 4
        const y = height - h
        return <rect key={i} x={x} y={y} width={barW - 8} height={h} fill="#a3e635" />
      })}
    </svg>
  )
}

export default SoilTrendChart
