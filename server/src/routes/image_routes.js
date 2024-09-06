import {Router} from 'express'
import { createImage, deleteImage, getAllImage, getImage, updateImage } from '../controllers/image_controllers.js'
import multer from 'multer'

const upload = multer({dest: 'images/'})

const router = Router()

router.get('/image',getAllImage)
router.get('/image/:id',getImage)
router.post('/image',upload.single('imagen'),createImage)
router.put('/image/:id',upload.single('imagen'),updateImage)
router.delete('/image/:id',deleteImage)


export default router;