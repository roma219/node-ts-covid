import mongoose from 'mongoose'

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/users'

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true)

const db = mongoose.connection

db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('Database connection error:', err)
})
