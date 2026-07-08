// Jobs route handler
// TODO: Implement full jobs CRUD routes
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json([])
})

router.get('/:id', (req, res) => {
  res.status(404).json({ error: 'Not implemented' })
})

router.patch('/:id', (req, res) => {
  res.json({ status: 'ok' })
})

export default router
