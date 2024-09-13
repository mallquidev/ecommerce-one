import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth_routes.js'
import categoryRoutes from './routes/category_routes.js'
import productRoutes from './routes/product_routes.js'
import imageRoutes from './routes/image_routes.js'
import imageProduct from './routes/image_product_routes.js'
import path from 'path';
import { fileURLToPath } from 'url';


const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración para servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
app.use('/api', imageProduct)


export default app;
