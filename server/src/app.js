import express, { json } from 'express'
import authRoutes from './routes/auth_routes.js'

const app = express()
app.use(express.json())

app.use('/api', authRoutes)

export default app;
