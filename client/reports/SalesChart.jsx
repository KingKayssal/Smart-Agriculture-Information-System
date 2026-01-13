import React from 'react'

function SalesChart() {
  const data = [1200, 1500, 1100, 1800, 2000]
  const width = 240
  const height = 80
  const max = Math.max(...data)
  const barW = Math.floor(width / data.length)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Sales performance">
      {data.map((v, i) => {
        const h = Math.round((v / max) * (height - 10))
        const x = i * barW + 4
        const y = height - h
        return <rect key={i} x={x} y={y} width={barW - 8} height={h} fill="#fb7185" />
      })}
    </svg>
  )
}

export default SalesChart
