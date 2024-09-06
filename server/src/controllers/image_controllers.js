import {pool} from '../db.js'
import fs from 'fs'

export const getAllImage = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM imagenes')
        if(result.length === 0) return res.sendStatus(404)
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
export const getImage = async(req, res)=> {
    try {
        const [result] = await pool.query('SELECT * FROM imagenes WHERE id_imagen = ?',[req.params.id])
        if(result.length === 0) return res.sendStatus(404)
        res.json(result[0])
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}
function saveImagen(file) {
    const newPath = `./images/${file.originalname}`; 
    fs.renameSync(file.path, newPath); 
    return file.originalname; 
}
export const createImage = async(req, res) => {
    try {
        const {tipo_imagen} = req.body
        let imagen = null;
        if (req.file) {
            imagen = saveImagen(req.file);
        }
        const [result] = await pool.query('INSERT INTO imagenes(nombre_imagen, tipo_imagen) VALUES(?,?)', [imagen, tipo_imagen])
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteImage = async (req, res) => {
    try {
        const id_imagen = req.params.id;
        const [result] = await pool.query('SELECT nombre_imagen FROM imagenes WHERE id_imagen = ?', [id_imagen]);
        if (result.length === 0) return res.sendStatus(404); 
        const imageName = result[0].nombre_imagen;
        const [deleteResult] = await pool.query('DELETE FROM imagenes WHERE id_imagen = ?', [id_imagen]);
        if (deleteResult.affectedRows === 0) return res.sendStatus(404);
        if (imageName) {
            const imagePath = `./images/${imageName}`;
            deleteImagen(imagePath);
        }

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
export const updateImage = async (req, res) => {
    try {
        const { tipo_imagen } = req.body;
        const id_imagen = req.params.id;
        const [result] = await pool.query('SELECT nombre_imagen FROM imagenes WHERE id_imagen = ?', [id_imagen]);
        if (result.length === 0) return res.sendStatus(404);  

        const oldImage = result[0].nombre_imagen;
        let imagen = oldImage; 
        if (req.file) {
            const newImagePath = `./images/${req.file.originalname}`;
            fs.renameSync(req.file.path, newImagePath);
            imagen = req.file.originalname; 
            
            if (oldImage) {
                const oldImagePath = `./images/${oldImage}`;
                deleteImagen(oldImagePath);
            }
        }

        const [updateResult] = await pool.query(
            'UPDATE imagenes SET nombre_imagen = ?, tipo_imagen = ? WHERE id_imagen = ?',
            [imagen, tipo_imagen, id_imagen]
        );

        if (updateResult.affectedRows === 0) return res.sendStatus(404);

        const [updatedImage] = await pool.query('SELECT * FROM imagenes WHERE id_imagen = ?', [id_imagen]);

        res.json(updatedImage[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};