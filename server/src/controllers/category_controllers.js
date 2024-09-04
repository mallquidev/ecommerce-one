import {pool} from '../db.js'

export const getAllCategory = async(req, res)=>{
    try {
        const [response] = await pool.query('SELECT * FROM categorias')
        if(response.length === 0) return res.status(404).json({message: "Categorys not found"})
        res.json(response)
    } catch (error) {
        
    }
}

export const getCategory = async(req, res)=>{
    try {
        const [response] = await pool.query('SELECT * FROM categorias WHERE id_categoria = ?', [req.params.id])
        if(response.length === 0) return res.status(404).json({message: "Category not found"})
        res.json(response[0])
    } catch (error) {
        
    }
}

export const createCategory = async(req, res)=>{
    try {
        const {nombre, descripcion} = req.body
        const [result] = await pool.query('INSERT INTO categorias(nombre, descripcion) VALUES(?,?)',[nombre, descripcion])
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const updateCategory = async(req, res)=> {
    try {
        const [result] = await pool.query('UPDATE categorias SET ? WHERE id_categoria = ?', [req.body, req.params.id])
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const deleteCategory = async(req, res)=> {
    try {
        const [result] = await pool.query('DELETE FROM categorias WHERE id_categoria = ?',[req.params.id])
        if(result.affectedRows === 0) return res.sendStatus(404)
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

