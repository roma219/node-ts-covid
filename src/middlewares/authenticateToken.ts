import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { User } from '../types'

export const authenticateToken : RequestHandler = (req, res, next) => {
  console.log('kek')
  const authHeader = req.headers.authorization as string || ''
  console.log(req.headers)
  const token = authHeader.split(' ')[1]
  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) return res.sendStatus(403)
    const decodedLogin = (decoded as User)?.login
    req.user = decodedLogin
    next()
  })
}
