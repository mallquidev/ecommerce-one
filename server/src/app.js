import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth_routes.js'
import categoryRoutes from './routes/category_routes.js'
import productRoutes from './routes/product_routes.js'
import imageRoutes from './routes/image_routes.js'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', imageRoutes)


export default app;
