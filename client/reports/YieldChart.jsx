import React from 'react'

function YieldChart() {
  const data = [3.1, 3.4, 3.7, 4.0, 4.2]
  const width = 240
  const height = 80
  const max = Math.max(...data)
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - (v / max) * (height - 10)
    return `${x},${y}`
  }).join(' ')
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-label="Yield over years">
      <polyline points={points} fill="none" stroke="#16a34a" strokeWidth="2" />
    </svg>
  )
}

export default YieldChart
