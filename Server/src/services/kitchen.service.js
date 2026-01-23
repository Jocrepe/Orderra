import pool from "../database/database.js"

export const fetchKitchenOrders = async () => {
    const orderResult = await pool.query('SELECT * FROM orders WHERE status = $1 ORDER BY created_at ASC', ['OPEN'])
    const orders = orderResult.rows

    const itemResult = await pool.query('SELECT * FROM order_items WHERE order_id = ANY($1::uuid[ ]) ORDER BY created_at ASC',
        [orders.map(o => o.id)]
    )
    const items = itemResult.rows

    const ordersWithItems = orders.map(order => ({
        ...order,
        items: items.filter(item => item.order_id === order.id)
    }));

    return ordersWithItems
}

export const updateKitchenOrder = async (orderId) => {
    const status = 'DONE'
    const result = await pool.query(
        'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [status,orderId]
    )
    return result.rows[0]
}