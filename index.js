const express = require('express')
const mysql = require('mysql2/promise')
const app = express()

require('dotenv/config')

const apiUrl = process.env.API_URL

// Middlewares
app.use(express.json())



const db = mysql.createPool({
  host: process.env.HOSTNAME,    
  port: process.env.PORT,   
  user: process.env.DB_USERNAME,             
  password: process.env.DB_PASSWORD,     
  database: process.env.DATABASE, 
  waitForConnections: true, 
  connectionLimit: 10,    
  queueLimit: 0           
});

app.all(`${apiUrl}/products`, async (request, response) => {
  
  if (request.method != "GET") {
    response.status(405).json({
      status: "error",
      err_msg: "Invalid http method."
    })
    return
  }

 let [result, _] = await db.execute('SELECT * FROM shop.products;', [], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "error", 
        err_msg: 'Database error'
      });
    }
  })

  response.json({
    status: "ok",
    response: result
  })
})

app.all(`${apiUrl}/add-product`, async (request, response) => {

  if (request.method != "POST") {
    return response.status(405).json({
      status: "error",
      err_msg: "Invalid http method"
    }) 
  }

  let data = request.body

  if (!data || Object.entries(data).length === 0) {
    return response.status(400).json({
      status: "error",
      err_msg: "empty or malformed body"
    })
  }

  if (!data["name"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing name key"
    })
  }

  if (!data["description"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing description key"
    })

  }

  if (!data["price"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing price key"
    })
  }

  let {name, description, price} = data

  await db.execute('INSERT INTO products (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "error", 
        err_msg: 'Database error'
      });
    } 
  })
  
  response.status(201).json({
    status: "ok",
    response: "product successfully added"
  })
})

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000")
})