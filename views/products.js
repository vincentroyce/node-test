import Product from '../models/product.js'
import express, { request } from 'express'
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

// Get single product
router.get(`/:id`, async (request, response) => {

  if (!mongoose.isValidObjectId(request.params["id"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid object id"
    })
  }

  let product = await Product.findById(request.params["id"])

  if (!product) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to find the product"
    })
  }

  let populateProduct = await Product.populate(product, { path: 'category', select: '_id name color icon' })
  if (!populateProduct) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to populate the product"
    })
  }

  response.json({
    status: "ok",
    response: populateProduct
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

  if (!request.body || Object.entries(request.body).length === 0) {
    return response.status(400).json({
      status: "error",
      err_msg: "empty or malformed body"
    })
  }

  if (!request.body["name"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing name key"
    })
  }

  if (!request.body["description"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing description key"
    })
  }

  if (!request.body["category"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing category key"
    })
  }

  if (!mongoose.isValidObjectId(request.body["category"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid category id"
    })
  }

  let category = await Category.findById(request.body["category"])

  if (!category) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to find category"
    })
  }

  if (!request.body["countInStock"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing countInStock key"
    })
  }
  
  let getProduct = await Product.find({ name: request.body["name"] }).limit(1);
  
  if (getProduct.length != 0) {
    return response.status(409).json({
      status: "error",
      response: "product already exists"
    })
  }

  const product = new Product({
    name: request.body.name,
    description:request.body.description,
    richDescription: request.body.richDescription,
    image: request.body.image,
    brand: request.body.brand,
    price: request.body.price,
    category: request.body.category,
    countInStock: request.body.countInStock,
    rating: request.body.rating,
    isFeatured: request.body.isFeatured
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

// Update single product
router.put(`/update-product/:id`, async (request, response) => {

  if (!request.is('application/json')) {
    return  response.status(415).json({
      status: "error",
      err_msg: "invalid mime type"
    })
  }

  if (!request.body || Object.entries(request.body).length === 0) {
    return response.status(400).json({
      status: "error",
      err_msg: "empty or malformed body"
    })
  }

  if (!request.body["name"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing name key"
    })
  }

  if (!request.body["description"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing description key"
    })
  }

  if (!request.body["category"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing category key"
    })
  }

  if (!mongoose.isValidObjectId(request.body["category"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid category id"
    })
  }

  let category = await Category.findById(request.body["category"])

  if (!category) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to find category"
    })
  }

  if (!request.body["countInStock"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing countInStock key"
    })
  }

  if (!mongoose.isValidObjectId(request.params["id"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid product id"
    })
  }

  let checkProduct = await Product.findById(request.params["id"])

  if (!checkProduct) {
    return response.status(400).json({
      status: "error",
      err_msg: "product not found"
    })
  }
  
  const product = {
    name: request.body.name,
    description:request.body.description,
    richDescription: request.body.richDescription,
    image: request.body.image,
    brand: request.body.brand,
    price: request.body.price,
    category: request.body.category,
    countInStock: request.body.countInStock,
    rating: request.body.rating,
    isFeatured: request.body.isFeatured
  }
  
  const updateProduct = await Product.findByIdAndUpdate(request.params["id"], product, { returnDocument: 'after' })

  if (!updateProduct) {
    return response.status(404).json({
      status:"error",
      err_msg: "unable to update product."
    })
  }

  response.json({
    status: "ok",
    response: updateProduct
  })
})


router.delete('/delete-product/:id', async (request, response) => {

  if (!mongoose.isValidObjectId(request.params["id"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid id format"
    })
  }

  let findProduct = await Product.findById(request.params["id"])

  if (!findProduct) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to find product"
    })
  }

  // Delete a single product
  let deleteProduct = await Product.findByIdAndDelete(request.params["id"])
  if (!deleteProduct) {
    return response.status(500).json({
      status: "error",
      err_msg: "unable to delete product"
    })
  }

  response.json({
    status : "ok",
    response: "product deleted"
  })
})

export default router;
