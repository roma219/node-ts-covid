import { Router } from 'express'
import AuthRoutes from './auth'
import CovidRouter from './covid'

const router = Router()

router.use(AuthRoutes)
router.use(CovidRouter)

router.get('/', (req, res) => {
  res.send('<div>Hello</div>')
})

export default router
