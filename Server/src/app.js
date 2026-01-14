import express from 'express'
import cors from 'cors'

import orderRoutes from './routes/order.route.js'
import kitchenRoutes from './routes/kitchen.route.js'
import menuRoutes from './routes/menu.route.js'

const app = express()
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true
}))

app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.use('/api/orders', orderRoutes)
app.use('/api/kitchen', kitchenRoutes)
app.use('/api/menu', menuRoutes)


export default app