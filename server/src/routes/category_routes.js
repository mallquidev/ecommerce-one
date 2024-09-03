import {Router} from 'express'
import { getAllCategory, getCategory, createCategory,deleteCategory,updateCategory } from '../controllers/category_controllers.js'

const router = Router()

router.get('/category', getAllCategory)
router.get('/category/:id', getCategory)
router.post('/category',createCategory)
router.delete('/category/:id',deleteCategory)
router.put('/category/:id',updateCategory)


export default router