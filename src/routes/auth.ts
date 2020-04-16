import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import { users } from '../users'
import {
  CREATED, BAD_REQUEST,
  UNAUTHORIZED, INTERNAL_SERVER_ERROR,
  FORBIDDEN
} from 'http-status-codes'
import { User } from '../types'

// todo: redis
const refreshTokens : string[] = []

const router = Router()

router.post('/login', (req, res) => {
  const { login, password } = req.body

  if (!login || !password) return res.sendStatus(BAD_REQUEST)

  const user = users.find(item => item.login === login)

  if (!user) return res.sendStatus(BAD_REQUEST)

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) return res.sendStatus(UNAUTHORIZED)

    const accessToken = generateAccessToken(login)
    const refreshToken = jwt.sign({ login }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '15s' })

    refreshTokens.push(refreshToken)

    res.json({ accessToken, refreshToken })
  })
})

router.post('/signup', (req, res) => {
  const { login, password } = req.body
  if (!login || !password || users.find(item => item.login === login)) {
    return res.status(BAD_REQUEST).send('Invalid data provided')
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.sendStatus(INTERNAL_SERVER_ERROR)
    users.push({ login, password: hash })
    res.status(CREATED).send()
  })
})

router.post('/token', (req, res) => {
  const refreshToken = req.body.token as string || ''
  if (!refreshToken) return res.sendStatus(UNAUTHORIZED)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(FORBIDDEN)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(FORBIDDEN)
    const accessToken = generateAccessToken((user as User).login)
    res.json({ accessToken })
  })
})

function generateAccessToken (login: string) {
  return jwt.sign({ login }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15s' })
}

export default router
