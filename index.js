import productRouter from './views/products.js'
import categoryRouter from './views/categories.js'
import orderRouter from './views/orders.js'
import orderItemRouter from './views/order_items.js'
import userRouter from './views/users.js'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

const apiUrl = dotenv.config().parsed.API_URL

// Middlewares
app.use(express.json())
app.use(cors())
app.options('*', cors())

// Routers
app.use(`${apiUrl}/products`, productRouter)
app.use(`${apiUrl}/categories`, categoryRouter)
app.use(`${apiUrl}/orders`, orderRouter)
app.use(`${apiUrl}/order-items`, orderItemRouter)
app.use(`${apiUrl}/users`, userRouter)


//DB Connection
mongoose.connect(dotenv.config().parsed.DB_URL_CONNECTION, {
  dbName: 'shop-database',
})
.then(() => {
  console.log('Database connected...')
})
.catch((err) => {
  console.log(err)
})

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})