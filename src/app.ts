import express, { Request, Response, NextFunction } from 'express'
import fetch from 'node-fetch';
import { fetchStats } from './fetchStats'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

type User = {
    login: string
    password: string
}

// use db
const users : User[] = []


app.get('/', (req, res) => {
    res.send('<div>Hello</div>')
})

app.get('/stats', checkAuth, async (req, res) => {
    const stats = await fetchStats()
    res.send(stats)
})

app.post('/login', (req, res) => {
    const { login, password } = req.body

    if (!login || !password) return res.sendStatus(400)

    const user = users.find(item => item.login === login)

    if (!user) return res.sendStatus(400)

    bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) return res.sendStatus(401)
        const token = jwt.sign({ login }, 'kek')
        res.send({ token })
    });
})

app.post('/signup', (req, res) => {
    const { login, password } = req.body
    if (!login || !password || users.find(item => item.login === login))
        return res.status(400).send('Invalid data provided')

    const hashedPassword = bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.sendStatus(500)
        users.push({ login, password: hash })
        res.status(201).send()
    })
})

function checkAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.token as string
    if (!authHeader) return res.sendStatus(401)

    const token = authHeader.split(' ')[1]
    if (!token) res.sendStatus(401)

    jwt.verify(token, 'kek', (err, decoded) => {
        if (err) return res.sendStatus(403)
        next()
    })
}

// use env for port
app.listen(PORT, () => console.log('Server running on port: ', PORT))