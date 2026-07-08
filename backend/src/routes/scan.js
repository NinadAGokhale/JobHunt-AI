// Scan route handler
// TODO: Implement full scan route with progress tracking
import { Router } from 'express'

const router = Router()

router.post('/', (req, res) => {
  const { roles, locations, sources } = req.body
  res.json({ status: 'scanning', message: `Scan started for ${roles?.join(', ')}` })
})

router.get('/status', (req, res) => {
  res.json({ status: 'idle', progress: null })
})

export default router
