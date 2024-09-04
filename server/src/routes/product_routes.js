import {Router} from 'express'
import {createProduct, deleteProduct, getAllProduct, getProduct, updateProduct} from '../controllers/product_controllers.js'

const router = Router()

router.get('/product',getAllProduct)
router.get('/product/:id',getProduct)
router.post('/product',createProduct)
router.delete('/product/:id',deleteProduct)
router.put('/product/:id',updateProduct)




export default router