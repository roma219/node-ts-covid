import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { User } from '../types'

export const authenticateToken : RequestHandler = (req, res, next) => {
  const authHeader = req.headers.token as string || ''
  const token = authHeader.split(' ')[1]
  if (!token) res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) return res.sendStatus(403)
    const decodedLogin = (decoded as User)?.login
    req.user = decodedLogin
    next()
  })
}
