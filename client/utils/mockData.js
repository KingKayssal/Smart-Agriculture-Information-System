export const stats = [
  { label: 'Farmers Connected', value: '1,240' },
  { label: 'Experts Online', value: '37' },
  { label: 'Regions Covered', value: '22' },
]

export const sampleWeather = [
  { day: 'Mon', summary: 'Sunny', tempMin: 20, tempMax: 31, humidity: 40, rainfall: 0 },
  { day: 'Tue', summary: 'Cloudy', tempMin: 18, tempMax: 27, humidity: 55, rainfall: 0 },
  { day: 'Wed', summary: 'Rain', tempMin: 17, tempMax: 25, humidity: 78, rainfall: 12 },
  { day: 'Thu', summary: 'Windy', tempMin: 19, tempMax: 29, humidity: 45, rainfall: 0 },
  { day: 'Fri', summary: 'Sunny', tempMin: 21, tempMax: 32, humidity: 38, rainfall: 0 },
  { day: 'Sat', summary: 'Storm', tempMin: 16, tempMax: 23, humidity: 85, rainfall: 28 },
  { day: 'Sun', summary: 'Cloudy', tempMin: 18, tempMax: 26, humidity: 60, rainfall: 2 },
]

export const marketPrices = [
  { product: 'Maize', region: 'North', price: 180, history: [160, 165, 170, 175, 180] },
  { product: 'Wheat', region: 'East', price: 240, history: [220, 225, 230, 235, 240] },
  { product: 'Rice', region: 'South', price: 300, history: [280, 285, 290, 295, 300] },
  { product: 'Sorghum', region: 'West', price: 150, history: [140, 145, 148, 149, 150] },
]

export const pestThreats = [
  { name: 'Fall Armyworm', region: 'North', severity: 'High', strategy: 'Use recommended insecticides and monitor nightly.' },
  { name: 'Stem Borer', region: 'East', severity: 'Medium', strategy: 'Apply biological control; inspect stems weekly.' },
  { name: 'Leaf Rust', region: 'South', severity: 'Low', strategy: 'Use resistant varieties and ensure proper spacing.' },
]

export const marketplaceSamples = [
  { 
    id: 1, 
    product: 'Maize', 
    category: 'Grains', 
    quantity: 500, 
    price: 180, 
    location: 'North', 
    date: '2025-12-06',
    sellerName: 'John Doe',
    sellerRating: 4.5,
    productType: 'Organic',
    harvestDate: '2025-11-20',
    description: 'Freshly harvested organic maize, dried and ready for storage or processing.',
    farmingMethod: 'Organic Farming',
    storage: 'Stored in dry, aerated silos',
    availability: 'In Stock',
    images: ['/images/maize.jpg']
  },
  { 
    id: 2, 
    product: 'Rice', 
    category: 'Grains', 
    quantity: 300, 
    price: 300, 
    location: 'South', 
    date: '2025-12-04',
    sellerName: 'Mary Jane',
    sellerRating: 4.8,
    productType: 'Non-organic',
    harvestDate: '2025-11-25',
    description: 'Premium long-grain rice, polished and bagged.',
    farmingMethod: 'Conventional',
    storage: 'Cool dry warehouse',
    availability: 'Limited',
    images: ['/images/rice.jpg']
  },
  { 
    id: 3, 
    product: 'Tomatoes', 
    category: 'Vegetables', 
    quantity: 100, 
    price: 50, 
    location: 'East', 
    date: '2025-12-07',
    sellerName: 'Peter Pan',
    sellerRating: 4.2,
    productType: 'Organic',
    harvestDate: '2025-12-05',
    description: 'Juicy red tomatoes, perfect for sauces and salads.',
    farmingMethod: 'Greenhouse',
    storage: 'Refrigerated',
    availability: 'In Stock',
    images: ['/images/tomatoes.jpg']
  },
  { 
    id: 4, 
    product: 'Bananas', 
    category: 'Fruits', 
    quantity: 200, 
    price: 80, 
    location: 'West', 
    date: '2025-12-08',
    sellerName: 'Alice Wonderland',
    sellerRating: 4.6,
    productType: 'Organic',
    harvestDate: '2025-12-01',
    description: 'Sweet yellow bananas, naturally ripened.',
    farmingMethod: 'Agroforestry',
    storage: 'Cool room',
    availability: 'In Stock',
    images: ['/images/bananas.jpg']
  }
]

export const farmerTasks = [
  { id: 1, task: 'Inspect Maize field for Fall Armyworm', priority: 'High', dueDate: '2025-12-10', status: 'Pending' },
  { id: 2, task: 'Apply fertilizer to Rice paddies', priority: 'Medium', dueDate: '2025-12-12', status: 'Pending' },
  { id: 3, task: 'Harvest Tomatoes', priority: 'High', dueDate: '2025-12-15', status: 'Pending' },
  { id: 4, task: 'Submit soil samples for analysis', priority: 'Low', dueDate: '2025-12-20', status: 'Completed' },
]

export const yieldForecast = [
  { crop: 'Maize', expected: 1200, unit: 'kg', confidence: 85 },
  { crop: 'Rice', expected: 800, unit: 'kg', confidence: 90 },
  { crop: 'Tomatoes', expected: 300, unit: 'kg', confidence: 75 },
]

export const notifications = [
  { id: 1, title: 'Severe Storm Warning', message: 'Heavy rains expected in Northern Region. Secure your storage.', type: 'critical', date: '2025-12-09', read: false },
  { id: 2, title: 'Market Price Alert', message: 'Maize prices have increased by 5% in the last 24 hours.', type: 'info', date: '2025-12-09', read: false },
  { id: 3, title: 'Expert Reply', message: 'Agronomist Sarah replied to your query about leaf discoloration.', type: 'success', date: '2025-12-08', read: true },
]

export const consultations = [
  { id: 1, subject: 'Yellowing leaves on Maize', status: 'Active', expert: 'Dr. Sarah', date: '2025-12-08', lastMsg: 'Please upload a photo of the stem.', unread: 2 },
  { id: 2, subject: 'Fertilizer dosage for Cocoa', status: 'Closed', expert: 'Mr. Kwame', date: '2025-11-20', lastMsg: 'Glad to help!', unread: 0 },
  { id: 3, subject: 'Pest identification', status: 'Pending', expert: 'Waiting for assignment', date: '2025-12-09', lastMsg: 'Request submitted.', unread: 0 },
]

export const advisoryArticles = [
  { id: 1, title: 'Managing Fall Armyworm', category: 'Pest Control', views: 1240, author: 'Dr. Sarah' },
  { id: 2, title: 'Best Practices for Drip Irrigation', category: 'Water Management', views: 890, author: 'Eng. David' },
  { id: 3, title: 'Soil pH and Yield Correlation', category: 'Soil Health', views: 560, author: 'Prof. Musa' },
]

export const adminUsers = [
  { id: 1, name: 'John Doe', email: 'john@farmer.com', role: 'Farmer', status: 'Active', wanNode: 'Node-A1 (North)', lastSync: '2 mins ago' },
  { id: 2, name: 'Jane Smith', email: 'jane@buyer.com', role: 'Buyer', status: 'Active', wanNode: 'Node-B3 (South)', lastSync: '15 mins ago' },
  { id: 3, name: 'Dr. Green', email: 'green@agri.com', role: 'Agronomist', status: 'Active', wanNode: 'Node-HQ (Central)', lastSync: '1 min ago' },
  { id: 4, name: 'Admin User', email: 'admin@sais.com', role: 'Admin', status: 'Active', wanNode: 'Cloud-Primary', lastSync: 'Just now' },
  { id: 5, name: 'Musa Bello', email: 'musa@farmer.com', role: 'Farmer', status: 'Suspended', wanNode: 'Node-A2 (North)', lastSync: '3 days ago' },
]

export const systemLogs = [
  { id: 1, event: 'New user registration (john@farmer.com)', time: '2 mins ago', type: 'info', node: 'Node-A1' },
  { id: 2, event: 'Market price update (Maize)', time: '15 mins ago', type: 'success', node: 'Cloud-Sync' },
  { id: 3, event: 'WAN Node-B3 Latency Spike (200ms)', time: '30 mins ago', type: 'warning', node: 'Node-B3' },
  { id: 4, event: 'Alert broadcast (Fall Armyworm)', time: '1 hour ago', type: 'critical', node: 'Node-A1' },
  { id: 5, event: 'Database Backup Completed', time: '2 hours ago', type: 'success', node: 'Cloud-Primary' },
]
