import {pool} from '../db.js'
import fs from 'fs';

export const getAllProduct = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, 
                    c.nombre AS categoria_nombre
             FROM productos p
             INNER JOIN categorias c ON p.id_categoria = c.id_categoria`
        );

        if (result.length === 0) return res.sendStatus(404);

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const getProduct = async(req, res) => {
    
    try {
        const [result] = await pool.query(
            `SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.stock, p.imagen, 
                    c.nombre AS categoria_nombre
             FROM productos p
             INNER JOIN categorias c ON p.id_categoria = c.id_categoria
             WHERE p.id_producto = ?`,[req.params.id])
        if(result.length === 0) return res.sendStatus(404)
        res.json(result[0])
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

function saveImagen(file) {
    const newPath = `./uploads/${file.originalname}`; 
    fs.renameSync(file.path, newPath); 
    return file.originalname; 
}
export const createProduct = async(req, res) => {
    try {
        const { nombre, descripcion, precio, stock, id_categoria } = req.body;
        let imagen = null;
        if (req.file) {
            imagen = saveImagen(req.file);
        }
        const fecha_creacion = new Date();
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria, imagen, fecha_creacion) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, id_categoria, imagen, fecha_creacion]
        );

        res.status(201).json({
            id_producto: result.insertId,
            nombre,
            descripcion,
            precio,
            stock,
            id_categoria,
            imagen
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto' });
        console.log(error)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT imagen FROM productos WHERE id_producto = ?', [req.params.id]);
        if (result.length === 0) return res.sendStatus(404);
        const imagen = result[0].imagen;
        const imagePath = `./uploads/${imagen}`;
        const [deleteResult] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);
        if (deleteResult.affectedRows === 0) return res.sendStatus(404);
        deleteImagen(imagePath);
        res.sendStatus(204);
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

export const updateProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, id_categoria } = req.body;
        const id_producto = req.params.id;
        const [result] = await pool.query('SELECT imagen FROM productos WHERE id_producto = ?', [id_producto]);
        if (result.length === 0) return res.sendStatus(404);
        const oldImage = result[0].imagen;

        let imagen = oldImage;
        if (req.file) {
            const newImagePath = `./uploads/${req.file.originalname}`; 
            fs.renameSync(req.file.path, newImagePath); 
            imagen = req.file.originalname;
            if (oldImage) {
                const oldImagePath = `./uploads/${oldImage}`;
                deleteImagen(oldImagePath);
            }
        }

        const [updateResult] = await pool.query(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, imagen = ? WHERE id_producto = ?',
            [nombre, descripcion, precio, stock, id_categoria, imagen, id_producto]
        );

        if (updateResult.affectedRows === 0) return res.sendStatus(404);

        const [updatedProduct] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [id_producto]);

        res.json(updatedProduct[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};
