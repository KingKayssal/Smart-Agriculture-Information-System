import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    try { setUser(JSON.parse(localStorage.getItem('sais-user') || 'null')) } catch {}
  }, [])
  return user
}
