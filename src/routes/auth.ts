import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import { users } from '../users'

const router = Router()

router.post('/login', (req, res) => {
  const { login, password } = req.body

  if (!login || !password) return res.sendStatus(400)

  const user = users.find(item => item.login === login)

  if (!user) return res.sendStatus(400)

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) return res.sendStatus(401)
    const token = jwt.sign({ login }, process.env.ACCESS_TOKEN_SECRET as string)
    res.json({ token })
  })
})

router.post('/signup', (req, res) => {
  const { login, password } = req.body
  if (!login || !password || users.find(item => item.login === login)) { return res.status(400).send('Invalid data provided') }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.sendStatus(500)
    users.push({ login, password: hash })
    res.status(201).send()
  })
})

export default router
