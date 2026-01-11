import express from 'express'

import orderRoutes from './routes/order.route.js'
import kitchenRoutes from './routes/kitchen.route.js'

const app = express()

app.use(express.json())

app.use('/api/orders', orderRoutes)
app.use('/api/kitchen', kitchenRoutes)


export default app