import {pool} from '../db.js'

export const getAllProduct = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM products')
        if(result.length === 0) return res.sendStatus(404)
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

export const getProduct = async(req, res) => {
    //borrado porque la bd esta mal tmre xd
    try {
        const [result] = await pool.query('SELECT * FROM products WHERE ')
        if(result.length === 0) return res.sendStatus(404)
        res.json(result)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log(error)
    }
}