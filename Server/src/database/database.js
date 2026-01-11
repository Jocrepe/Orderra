import pkg from 'pg'
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'orderra_db',
    password: 'admin',
    port: 9090
})

export default pool