import { Router } from 'express';
import multer from 'multer';
import { createImageProduct, getAllImageProduct, deleteImageProduct, getImageProduct } from '../controllers/image_product_controllers.js';

const router = Router();

const storage = multer.diskStorage({
  destination: './uploads/', 
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});

const upload = multer({ storage });

router.post('/imgproduct', upload.array('imagenes', 5), createImageProduct);

router.get('/imgproduct', getAllImageProduct);

router.get('/imgproduct/:id', getImageProduct);

router.delete('/imgproduct/:id_imagen', deleteImageProduct);

export default router;
