import {pool} from '../db.js'
import bcrypt from 'bcryptjs'
import {createAccessToken} from '../lib/jwt.js'
import jwt from 'jsonwebtoken'
import {JWT_KEY} from '../config.js'

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
        const token = await createAccessToken({id: result.insertId})
        res.cookie('token', token)
        res.json({
            message: "User created successfully"
        })
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}

export const login = async(req, res) => {
    try {
        const {usuario, contrasena} = req.body
        const [userFound] = await pool.query('SELECT * FROM usuarios WHERE usuario = ?',[usuario])
        if (userFound.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' })
        const user = userFound[0]
        const isMatch = await bcrypt.compare(contrasena, user.contrasena)
        if(!isMatch) return res.status(203).json({message: 'Unauthorized'})
        const token = await createAccessToken({id: user.id_usuario})
        res.cookie('token',token, {
            sameSite:'none',
            secure: true
        })
        
        res.json({
            token,
            id: userFound[0].id_usuario,
            usuario: userFound[0].usuario
        })

    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}

export const logout = (req, res) =>{
    try {
        res.cookie('token', '', {
            expire: new Date(0)
        })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.error(error)
    }
}

export const profile = async(req, res)=> {
    try {
        console.log(req.user)
        const [userFound] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [req.user.id])
        if(!userFound) return res.status(404).json({message: 'user not found'})
        res.json({
            id: userFound[0].id_usuario,
            usuario: userFound[0].usuario
        })
    } catch (error) {
        console.error(error)
    }
}

export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        // Verifica el token y extrae el payload (que contiene el id)
        jwt.verify(token, JWT_KEY, async (err, user) => {
            if (err) return res.status(401).json({ message: "Unauthorized" });

            // Ahora el payload user debería contener el id
            const [userFound] = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [user.id]);
            if (userFound.length === 0) return res.status(401).json({ message: 'Unauthorized' });

            return res.json({
                id: userFound[0].id_usuario,
                usuario: userFound[0].usuario
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

