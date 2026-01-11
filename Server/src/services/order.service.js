import crypto from 'crypto'
import pool from '../database/database.js'


export const createOrder = async ({tableId, items, createdBy}) => {
    if (!tableId) {
        throw new Error('TABLE_ID_REQUIRED')
    }
    
    if (!items || items.length === 0) {
        throw new Error ('ORDER_ITEMS_REQUIRED')
    }

    const orderId = crypto.randomUUID()
    const createdAt = new Date()
    await pool.query(
        'INSERT INTO orders (id, table_id, status, created_by, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
        [orderId, tableId, "OPEN", createdBy, createdAt, createdAt]
    )

    const orderItems = items.map(item => ({
        id: crypto.randomUUID(),
        orderId: orderId,
        menuId: item.menuId,
        quantity: item.quantity,
        note: item.note ?? null,
        status: 'PENDING'
    }))

    const queries = orderItems.map(item => 
        pool.query(
            'INSERT INTO order_items (id, order_id, menu_id, quantity, note, status, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [item.id, item.orderId, item.menuId, item.quantity, item.note, item.status, createdAt, createdAt]
        )
    )

    await Promise.all(queries)

    return {
        order: {
            id: orderId,
            tableId,
            status: 'OPEN',
            createdBy,
            createdAt
        },
        items: orderItems
    }
}