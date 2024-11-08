import router from './routers/product.js'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()

const apiUrl = dotenv.config().parsed.API_URL

// Middlewares
app.use(express.json())

// Routers
app.use(`${apiUrl}/products`, router)


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