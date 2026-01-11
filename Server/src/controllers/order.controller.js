import * as OrderService from '../services/order.service.js'

//customer confirmed order
export const createOrder = async (req, res, next) => {
    try {
        const { tableId, items } = req.body
        const createdBy = 'CUSTOMER'

        const result = await OrderService.createOrder({ tableId, items, createdBy })

        res.status(201).json({
            message: 'ORDER_CREATED',
            data: result
        })
    } catch (error) {
        next(error)
    }
}
