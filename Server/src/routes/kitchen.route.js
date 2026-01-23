import express from 'express'
import { getKitchenOrders, updateKitchenOrder } from '../controllers/kitchen.controller.js'
const router = express.Router()

router.get('/', getKitchenOrders)
router.patch('/:orderId', updateKitchenOrder)

export default router