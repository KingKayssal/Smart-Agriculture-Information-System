import { marketPrices, marketplaceSamples, pestThreats, sampleWeather, stats } from './mockData.js'

const DELAY = 300 // Simulate network latency

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const getLocal = (key, initial) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initial
  } catch {
    return initial
  }
}

const setLocal = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const api = {
  auth: {
    login: async (email, password, role = 'Farmer') => {
      await sleep(DELAY)
      // Mock login logic - accept any valid email/pass for now or check against stored users if we had them
      // For now, we just simulate a successful login if fields are present
      if (!email || !password) throw new Error('Invalid credentials')
      
      // Check if user exists in local storage (optional, for now we just return a mock user)
      const user = { email, name: email.split('@')[0], role } 
      setLocal('sais-user', user)
      return user
    },
    register: async (userData) => {
      await sleep(DELAY)
      const user = { ...userData }
      setLocal('sais-user', user)
      return user
    },
    getCurrentUser: () => {
      return getLocal('sais-user', null)
    },
    logout: async () => {
      await sleep(DELAY)
      localStorage.removeItem('sais-user')
    },
    updateProfile: async (updates) => {
      await sleep(DELAY)
      const current = getLocal('sais-user', {})
      const updated = { ...current, ...updates }
      setLocal('sais-user', updated)
      return updated
    }
  },

  dashboard: {
    getStats: async () => {
      await sleep(DELAY)
      return stats
    },
    getWeather: async () => {
      await sleep(DELAY)
      return sampleWeather
    }
  },

  market: {
    getPrices: async () => {
      await sleep(DELAY)
      return marketPrices
    }
  },

  marketplace: {
    getItems: async () => {
      await sleep(DELAY)
      return getLocal('sais-market-items', marketplaceSamples)
    },
    addItem: async (item) => {
      await sleep(DELAY)
      const items = getLocal('sais-market-items', marketplaceSamples)
      const newItem = { id: Date.now(), ...item, date: new Date().toISOString().slice(0, 10) }
      const updated = [newItem, ...items]
      setLocal('sais-market-items', updated)
      return newItem
    },
    updateItem: async (id, updates) => {
      await sleep(DELAY)
      const items = getLocal('sais-market-items', marketplaceSamples)
      const updated = items.map(item => item.id === id ? { ...item, ...updates } : item)
      setLocal('sais-market-items', updated)
      return updated.find(item => item.id === id)
    },
    deleteItem: async (id) => {
      await sleep(DELAY)
      const items = getLocal('sais-market-items', marketplaceSamples)
      const updated = items.filter(item => item.id !== id)
      setLocal('sais-market-items', updated)
      return true
    }
  },

  crops: {
    getSoilTests: async () => {
      await sleep(DELAY)
      return getLocal('sais-soil-tests', [])
    },
    addSoilTest: async (test) => {
      await sleep(DELAY)
      const tests = getLocal('sais-soil-tests', [])
      const newTest = { ...test, id: Date.now() }
      const updated = [newTest, ...tests]
      setLocal('sais-soil-tests', updated)
      return newTest
    },
    getCrops: async () => {
      await sleep(DELAY)
      return getLocal('sais-crops', [])
    },
    addCrop: async (crop) => {
      await sleep(DELAY)
      const crops = getLocal('sais-crops', [])
      const newCrop = { ...crop, id: Date.now() }
      const updated = [newCrop, ...crops]
      setLocal('sais-crops', updated)
      return newCrop
    },
    getActivities: async () => {
      await sleep(DELAY)
      return getLocal('sais-activities', [])
    },
    addActivity: async (activity) => {
      await sleep(DELAY)
      const activities = getLocal('sais-activities', [])
      const newActivity = { ...activity, id: Date.now(), date: new Date().toISOString().slice(0, 10) }
      const updated = [newActivity, ...activities]
      setLocal('sais-activities', updated)
      return newActivity
    }
  },

  messages: {
    getMessages: async () => {
      await sleep(DELAY)
      return getLocal('sais-messages', [])
    },
    sendMessage: async (msg) => {
      await sleep(DELAY)
      const messages = getLocal('sais-messages', [])
      const newMsg = { ...msg, id: Date.now(), date: new Date().toISOString().slice(0, 10) }
      const updated = [newMsg, ...messages]
      setLocal('sais-messages', updated)
      return newMsg
    }
  },

  alerts: {
    getThreats: async () => {
      await sleep(DELAY)
      return pestThreats
    },
    getReports: async () => {
      await sleep(DELAY)
      return getLocal('sais-alert-reports', [])
    },
    submitReport: async (report) => {
      await sleep(DELAY)
      const reports = getLocal('sais-alert-reports', [])
      const newReport = { ...report, id: Date.now(), date: new Date().toISOString().slice(0, 10) }
      const updated = [newReport, ...reports]
      setLocal('sais-alert-reports', updated)
      return newReport
    }
  },

  admin: {
    getUsers: async () => {
      await sleep(DELAY)
      return adminUsers
    },
    getLogs: async () => {
      await sleep(DELAY)
      return systemLogs
    }
  },

  notifications: {
    getAll: async () => {
      await sleep(DELAY)
      return notifications
    },
    markRead: async (id) => {
      await sleep(DELAY)
      return true
    }
  }
}
