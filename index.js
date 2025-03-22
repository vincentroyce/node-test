import cors from 'cors'
import express from 'express'
import RegisterRouters from './routers.js'
import RegisterMiddlewares from './middlewares.js'
import ConnectToDB from './db_connection.js'
import dotenv from 'dotenv'

const app = express()
console.log(dotenv.config().parsed.DB_URL_CONNECTION)
app.use(cors())
app.options('*', cors())

RegisterMiddlewares(app)
RegisterRouters(app)
// ConnectToDB()

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})