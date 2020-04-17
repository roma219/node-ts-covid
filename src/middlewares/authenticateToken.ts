import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { UNAUTHORIZED, FORBIDDEN } from 'http-status-codes'
import { IUser } from '../models/User'

export const authenticateToken : RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization as string || ''
  const token = authHeader.split(' ')[1]
  if (!token) return res.sendStatus(UNAUTHORIZED)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) return res.sendStatus(FORBIDDEN)
    const decodedLogin = (decoded as IUser)?.login
    req.user = decodedLogin
    next()
  })
}
