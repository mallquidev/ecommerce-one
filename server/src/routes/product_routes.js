import {Router} from 'express'
import {getAllProduct, getProduct} from '../controllers/product_controllers.js'


const router = Router()

router.get('/product',getAllProduct)
router.get('/product',getProduct)



export default router