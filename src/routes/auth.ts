import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { Router } from 'express'
import {
  CREATED, BAD_REQUEST,
  UNAUTHORIZED, INTERNAL_SERVER_ERROR,
  FORBIDDEN, NO_CONTENT
} from 'http-status-codes'
import UserModel, { IUser } from '../models/User'

// todo: redis
let refreshTokens : string[] = []

const router = Router()

router.post('/login', async (req, res) => {
  const { login, password } = req.body

  if (!login || !password) return res.sendStatus(BAD_REQUEST)

  const user = await UserModel.findOne({ login })

  if (!user) return res.sendStatus(BAD_REQUEST)

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) return res.sendStatus(UNAUTHORIZED)

    const accessToken = generateAccessToken(login)
    const refreshToken = jwt.sign({ login }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '15s' })

    refreshTokens.push(refreshToken)

    res.json({ accessToken, refreshToken })
  })
})

router.post('/signup', async (req, res) => {
  const { login, password } = req.body
  if (!login || !password) {
    return res.status(BAD_REQUEST).send('Invalid data provided')
  }
  const user = await UserModel.findOne({ login })
  if (user) return res.status(BAD_REQUEST).send('Username is taken')

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.sendStatus(INTERNAL_SERVER_ERROR)

    const newUser = new UserModel({ login, password: hash })

    newUser.save(function (error, document) {
      if (error) return res.sendStatus(BAD_REQUEST)
      res.status(CREATED).send()
    })
  })
})

router.post('/token', (req, res) => {
  const refreshToken = req.body.token as string || ''
  if (!refreshToken) return res.sendStatus(UNAUTHORIZED)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(FORBIDDEN)

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
    if (err) return res.sendStatus(FORBIDDEN)
    const accessToken = generateAccessToken((user as IUser).login)
    res.json({ accessToken })
  })
})

router.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(NO_CONTENT)
})

function generateAccessToken (login: string) {
  return jwt.sign({ login }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15s' })
}

export default router
