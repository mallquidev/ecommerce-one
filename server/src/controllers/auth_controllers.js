import {pool} from '../db.js'
import bcrypt from 'bcryptjs'

export const register = async(req, res)=>{
    try {
        const {usuario, contrasena} = req.body
        const passwordHash = await bcrypt.hash(contrasena, 10)
        const banner = 'banner'
        // Obtener la fecha actual
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Meses de 0 a 11
        const day = String(now.getDate()).padStart(2, '0');
   
        // Formatear la fecha para DATE
        const fecha_registro = `${year}-${month}-${day}`;
        const [result] = await pool.query('INSERT INTO usuarios(usuario, contrasena, banner, fecha_registro) VALUES(?,?,?,?)', [usuario, passwordHash, banner, fecha_registro])
        res.json({
            id: result.insertId,
            usuario,
            contrasena
        })
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}