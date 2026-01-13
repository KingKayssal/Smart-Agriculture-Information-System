import React from 'react'

function Sparkline({ data = [], width = 80, height = 24, color = '#16a34a' }) {
  if (!data.length) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((v - min) / (max - min || 1)) * height
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Sparkline
