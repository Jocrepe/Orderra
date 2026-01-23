import * as KitchenService from '../services/kitchen.service.js'

export const getKitchenOrders = async (req, res, next) => {
    try {
        const result = await KitchenService.fetchKitchenOrders()
        res.status(201).json({
            message: "GET COMPLETE",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const updateKitchenOrder = async (req, res, next) => {
    try {
        const {orderId} = req.params
        const result = await KitchenService.updateKitchenOrder(orderId)
        res.status(200).json({
            message: "ITEM UPDATED",
            data: result
        })
    } catch (error) {
        next(error)
    }
}