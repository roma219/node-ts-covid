import { Router } from 'express'
import { authenticateToken } from '../middlewares/authenticateToken'
import { fetchStats } from '../fetchStats'

const router = Router()

router.get('/stats', authenticateToken, async (req, res) => {
  const stats = await fetchStats()
  res.json(stats)
})

export default router
