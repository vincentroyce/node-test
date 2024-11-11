import Product from '../models/product.js'
import express from 'express'
import mongoose from 'mongoose'
import Category from '../models/category.js'

const router = express.Router()

// Get all products
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

// Add a single product
router.post(`/add-product`,  async (request, response) => {

  if (!request.is('application/json')) {
    return  response.status(415).json({
      status: "error",
      err_msg: "invalid mime type"
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

  if (!data["category"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing category key"
    })
  }

  if (!mongoose.isValidObjectId(data["category"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid category id"
    })
  }

  let category = await Category.findById(data["category"])

  if (!category) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to find this category"
    })
  }

  if (!data["countInStock"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing countInStock key"
    })
  }
  
  let getProduct = await Product.find({ name: data["name"] }).limit(1);
  
  if (getProduct.length != 0) {
    return response.status(409).json({
      status: "error",
      response: "product already exists"
    })
  }

  const product = new Product({
    name: data.name,
    description:data.description,
    richDescription: data.richDescription,
    image: data.image,
    brand: data.brand,
    price: data.price,
    category: data.category,
    countInStock: data.countInStock,
    rating: data.rating,
    isFeatured: data.isFeatured
  })
  
  const saveProduct = await product.save()

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
