import {createPool} from 'mysql2/promise'

const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    database: 'db_ecommerce',
    password: 'codersql'
})

async function checkConnect() {
    try {
        const conn = await pool.getConnection()
        await conn.query('SELECT 1')
        conn.release()
        console.log('Databse is running')
    } catch (error) {
        console.error('Error en la BD!!!!!', error.message);
        console.error(error)
    }
}

export {pool, checkConnect}