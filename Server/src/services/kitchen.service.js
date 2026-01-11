import pool from "../database/database.js"

export const fetchKitchenOrders = async () => {
    const orderResult = await pool.query('SELECT * FROM Orders WHERE status = $1 ORDER BY created_at ASC', ['OPEN'])
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

export const updateKitchenOrder = async (orderItemId, newStatus) => {
    const result = await pool.query(
        'UPDATE order_items SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
        [newStatus, orderItemId]
    )

    const updatedItem = result.rows[0]

    //ดึงstatus ของ order_items ที่มี order_id ของ updatedItem
    const orderItemsResult = await pool.query(
        'SELECT status FROM order_items WHERE order_id = $1',
        [updatedItem.order_id]
    )
    const allItems = orderItemsResult.rows

    // If all DONE อัพเดท order status -> DONE แล้วพอตอน fetch จะไม่เห็น order ที่status = DONE
    const allDone = allItems.every(item => item.status === 'DONE');
    if (allDone) {
        await pool.query(
        'UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2',
        ['DONE', updatedItem.order_id]
        )
    }

    return {
        item: result.rows[0],
        status: newStatus,
        orderStatus: allDone ? 'DONE' : 'OPEN'
    }
}