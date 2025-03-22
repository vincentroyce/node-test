import productRouter from './routers/products.js'
import categoryRouter from './routers/categories.js'
import orderRouter from './routers/orders.js'
import orderItemRouter from './routers/order_items.js'
import userRouter from './routers/users.js'
import dotenv from 'dotenv'

function RegisterRouters(app) {
  const apiUrl = dotenv.config().parsed.API_URL
  // Routers
  app.use(`${apiUrl}/products`, productRouter)
  app.use(`${apiUrl}/categories`, categoryRouter)
  app.use(`${apiUrl}/orders`, orderRouter)
  app.use(`${apiUrl}/order-items`, orderItemRouter)
  app.use(`${apiUrl}/users`, userRouter)
}

export default RegisterRouters