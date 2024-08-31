import express from 'express'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth_routes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)

export default app;
