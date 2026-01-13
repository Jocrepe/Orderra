import express from 'express'

import orderRoutes from './routes/order.route.js'
import kitchenRoutes from './routes/kitchen.route.js'
import menuRoutes from './routes/menu.route.js'

const app = express()

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('/api/orders', orderRoutes)
app.use('/api/kitchen', kitchenRoutes)
app.use('/api/menu', menuRoutes)


export default app