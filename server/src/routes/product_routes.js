import {Router} from 'express'
import {createProduct, deleteProduct, getAllProduct, getProduct, updateProduct} from '../controllers/product_controllers.js'
import multer from 'multer'

const upload = multer({dest: 'uploads/'})

const router = Router()

router.get('/product',getAllProduct)
router.get('/product/:id',getProduct)
router.post('/product',upload.single('imagen'), createProduct)
router.delete('/product/:id',deleteProduct)
router.put('/product/:id',upload.single('imagen'),updateProduct)


export default router