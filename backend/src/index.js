import express from 'express'
import cors from 'cors'
import { initDB } from './db.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const db = initDB()

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.get('/api/stats', (req, res) => {
  const total = db.prepare('SELECT COUNT(*) as count FROM jobs').get().count
  const matched = db.prepare('SELECT COUNT(*) as count FROM jobs WHERE match_score >= 80').get().count
  const applied = db.prepare("SELECT COUNT(*) as count FROM jobs WHERE status = 'applied'").get().count
  res.json({ total, matched, applied })
})

app.get('/api/jobs', (req, res) => {
  const { status, source, sort = '-score' } = req.query
  let query = 'SELECT * FROM jobs'
  const conditions = []
  const params = {}

  if (status && status !== 'all') {
    conditions.push('status = @status')
    params.status = status
  }
  if (source && source !== 'all') {
    conditions.push('source = @source')
    params.source = source
  }
  if (conditions.length) query += ' WHERE ' + conditions.join(' AND ')

  const order = sort.startsWith('-') ? 'DESC' : 'ASC'
  const col = sort.replace(/^[+-]/, '')
  query += ` ORDER BY ${col} ${order}`

  const jobs = db.prepare(query).all(params)
  res.json(jobs)
})

app.get('/api/jobs/:id', (req, res) => {
  const job = db.prepare('SELECT * FROM jobs WHERE id = ?').get(req.params.id)
  if (!job) return res.status(404).json({ error: 'Job not found' })
  res.json(job)
})

app.post('/api/scan', (req, res) => {
  const { roles = [], locations = [], sources = {} } = req.body
  res.json({ status: 'scanning', message: `Scanning ${Object.keys(sources).filter(k => sources[k]).join(', ')} for ${roles.join(', ')} in ${locations.join(', ')}` })
})

app.listen(PORT, () => {
  console.log(`JobHunt-AI backend running on http://localhost:${PORT}`)
})
