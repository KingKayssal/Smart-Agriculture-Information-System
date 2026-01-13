import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const allowed = (process.env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
app.use(cors({ origin: (origin, cb) => {
  if (!origin || !allowed.length || allowed.includes(origin)) return cb(null, true)
  return cb(new Error('Not allowed by CORS'))
}}))
app.use(express.json())
app.use((req, _res, next) => { const start = Date.now(); console.log(`[REQ] ${req.method} ${req.url}`); req.on('end', () => console.log(`[DONE] ${req.method} ${req.url} ${Date.now()-start}ms`)); next() })

const PORT = process.env.PORT || 4000

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err && err.message ? err.message : err)
  res.status(err && err.status ? err.status : 500).json({ error: 'Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
