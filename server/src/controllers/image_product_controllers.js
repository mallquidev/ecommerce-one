import { pool } from '../db.js';
import fs from 'fs';

// Obtener todas las imágenes de un producto
export const getAllImageProduct = async (req, res) => {
    try {
        const { id_producto } = req.body; // Recibir el id_producto del body

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

// Función para guardar la imagen
function saveImagen(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return file.originalname;
}

// Crear una nueva imagen de producto
export const createImageProduct = async (req, res) => {
    try {
        const { id_producto } = req.body; // Recibir id_producto del body
        let imagenes = [];

        if (!id_producto) {
            return res.status(400).json({ message: 'id_producto es requerido' });
        }

        if (req.files && req.files.length > 0) {
            // Guardar múltiples imágenes con los nombres correctos (incluyendo la fecha)
            imagenes = req.files.map((file) => {
                console.log('Nombre de archivo guardado:', file.filename); // Verifica el nombre generado
                return file.filename; // Guardar el nombre generado por multer (con la fecha)
            });
        } else {
            return res.status(400).json({ message: 'No se han enviado imágenes' });
        }

        // Crear la consulta de inserción múltiple
        const values = imagenes.map((img) => [img, id_producto]);

        // Insertar todas las imágenes en la base de datos
        const [result] = await pool.query(
            'INSERT INTO imagenes_productos (nombre_imagen, id_producto) VALUES ?', 
            [values]
        );

        res.json({
            message: 'Imágenes subidas correctamente',
            id_producto,
            imagenes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};


// Eliminar una imagen de producto
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
