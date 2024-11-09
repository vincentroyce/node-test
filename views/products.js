import Product from '../models/product.js'
import express from 'express'

const router = express.Router()

router.get(`/`, async (request, response) => {
  
  let getProduct = await Product.find();
  
  if (!getProduct) {
    return response.status(500).json({
      status: "error",
      err_msg: "Database error."
    })
  }

  response.json({
    status:"ok",
    response: getProduct,
  })
})

router.post(`/add-product`,  async (request, response) => {

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
  
  let getProduct = await Product.find({ name: name}).limit(1);
  
  if (getProduct.length != 0) {
    return response.status(409).json({
      status: "error",
      response: "product already exists"
    })
  }

  const product = new Product({
    name: name,
    description:description,
    price: price
  })
  
  const saveProduct = product.save()

  if (!saveProduct) {
    return response.status(404).json({
      status:"error",
      err_msg: "unable to save product."
    })
  }

  response.status(201).json({
    status: "ok",
    response: saveProduct
  })
})

export default router;
