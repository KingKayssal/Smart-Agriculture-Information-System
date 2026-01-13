import { useEffect, useState } from 'react'
import { sampleWeather } from '../utils/mockData.js'

export function useWeather() {
  const [data, setData] = useState([])
  useEffect(() => { setData(sampleWeather) }, [])
  return data
}
