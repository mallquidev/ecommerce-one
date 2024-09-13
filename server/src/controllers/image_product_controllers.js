import { pool } from '../db.js';
import fs from 'fs';

export const getAllImageProduct = async (req, res) => {
    try {
        const { id_producto } = req.body; 

        if (!id_producto) {
            return res.status(400).json({ message: 'id_producto es requerido' });
        }

        const [result] = await pool.query('SELECT * FROM imagenes_productos WHERE id_producto = ?', [id_producto]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron imágenes para este producto.' });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const getImageProduct = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM imagenes_productos WHERE id_producto = ?', [req.params.id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron imágenes para este producto.' });
        }
        // Construye la URL completa para cada imagen
        const imagesWithUrls = result.map(img => ({
            ...img,
            url: `http://localhost:3000/uploads/${img.nombre_imagen}`
        }));

        res.json(imagesWithUrls);
        console.log(result)
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

function saveImagen(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return file.originalname;
}

export const createImageProduct = async (req, res) => {
    try {
        const { id_producto } = req.body;

        if (!id_producto) {
            return res.status(400).json({ message: 'id_producto es requerido' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No se han enviado imágenes' });
        }

        const imagenes = req.files.map((file) => {
            return file.filename; 
        });

        const values = imagenes.map((img) => [img, id_producto]);

    
        const [result] = await pool.query(
            'INSERT INTO imagenes_productos (nombre_imagen, id_producto) VALUES ?', 
            [values]
        );

        res.json({
            message: 'Imágenes subidas correctamente',
            imagenes,
            id_producto
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};



function deleteImagen(filepath) {
    if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
}

export const deleteImageProduct = async (req, res) => {
    try {
        const { id_imagen } = req.params;
        const [result] = await pool.query('SELECT nombre_imagen FROM imagenes_productos WHERE id_imagen = ?', [id_imagen]);

        if (result.length === 0) return res.sendStatus(404);

        const imagen = result[0].nombre_imagen;
        const [deleteResult] = await pool.query('DELETE FROM imagenes_productos WHERE id_imagen = ?', [id_imagen]);

        if (deleteResult.affectedRows === 0) return res.sendStatus(404);

        deleteImagen(`./uploads/${imagen}`);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};
