import {pool} from '../db.js'

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
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const createProduct = async(req, res) => {
    try {
        const { nombre, descripcion, precio, stock, id_categoria, imagen } = req.body;
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
        const [result] = await pool.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);

        if (result.affectedRows === 0) return res.sendStatus(404);

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const [result] = await pool.query(`UPDATE productos SET ? WHERE id_producto = ?`,
            [req.body, req.params.id]
        );

        if (result.affectedRows === 0) return res.sendStatus(404);

        const [updatedProduct] = await pool.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id]);

        res.json(updatedProduct[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};
