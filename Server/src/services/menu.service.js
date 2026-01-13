import pool from "../database/database.js"

export const fetchMenu = async () => {
    const result = await pool.query(
        'SELECT * FROM menu ORDER BY category ASC'
    )
    const menuResult = result.rows

    return menuResult
}