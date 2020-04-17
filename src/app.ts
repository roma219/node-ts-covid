import express from 'express'
import routes from './routes'
require('dotenv').config()
require('./db.ts')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use(routes)

app.listen(PORT, () => console.log('Server running on port: ', PORT))
