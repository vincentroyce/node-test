import productRouter from './views/products.js'
import categoryRouter from './views/categories.js'
import orderRouter from './views/orders.js'
import orderItemRouter from './views/order_items.js'
import userRouter from './views/users.js'
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