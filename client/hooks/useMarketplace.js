import { useEffect, useState } from 'react'
import { marketplaceSamples } from '../utils/mockData.js'

export function useMarketplace() {
  const [items, setItems] = useState([])
  useEffect(() => { setItems(marketplaceSamples) }, [])
  return items
}
