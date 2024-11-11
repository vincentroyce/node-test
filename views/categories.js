import Category from '../models/category.js'
import express, { request, response } from 'express'
import mongoose from 'mongoose'

const router = express.Router()

// Get all categories
router.get(`/`, async (request, response) => {
  
  let getCategory = await Category.find();

  if (!getCategory) {
    return response.status(500).json({
      status: "error",
      err_msg: "Database error."
    })
  }

  response.json({
    status:"ok",
    response: getCategory,
  })
})

// Get single category
router.get(`/:id`, async(request, response) => {

  let data = request.params;

  if (!mongoose.isValidObjectId(data["id"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid id format"
    })
  }

  let getSingleCategory = await Category.findById(data["id"])

  if (!getSingleCategory) {
    return response.status(404).json({
      status: "error",
      err_msg: "category not found"
    })
  }
  response.json({
    status: "ok",
    response: getSingleCategory
  })

})

// Add a single category
router.post(`/add-category`, async (request, response) => {

  let data = request.body

  if (!data || Object.entries(data).length == 0) {
    return response.status(400).json({
      status: "error",
      err_msg: "malformed / empty body.",
    })
  }

  if (!data["name"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing name key from body.",
    })
  }

  if (!data["color"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing color key from body.",
    })
  }

  if (!data["icon"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing icon key from body.",
    })
  }

  const {name, color, icon} = data

  const category = new Category({
    name: name,
    color: color,
    icon: icon,
  })

  let saveCategory = await category.save()

  if (!saveCategory) {
    return response.status(404).json({
      status:"error",
      err_msg: "unable to save category."
    })
  }

  response.status(201).json({
    status:"ok",
    response: saveCategory
  })
})

//Update a category
router.put("/update-category/:id", async (request, response) => {

  if (!mongoose.isValidObjectId(request.params["id"])) {
    return response.status(400).json({
      status: "error",
      err_msg:  "invalid id format."
    }) 
  }

  let updateItem = { 
    name: request.body["name"], 
    color:request.body["color"], 
    icon:request.body["icon"]
  }

  let updateCategory = await Category.findByIdAndUpdate(request.params["id"], updateItem, { returnDocument: 'after' })

  if (!updateCategory) {
    return response.status(500).json({
      status: "error",
      err_msg:  "internal server error"
    }) 
  }

  console.log(updateItem)

  response.json({
    status: "ok",
    err_msg:  updateCategory
  })

})

// Delete a category
router.delete("/delete-category/:id", async (request, response) => {

  let data = request.params

  if (!mongoose.isValidObjectId(data["id"])) {
    return response.status(400).json({
      status: "error",
      err_msg:  "invalid id format."
    }) 
  }

  let removeCategory = await Category.findByIdAndDelete(data["id"]) 

  if (!removeCategory) {
    return response.status(404).json({
      status: "error",
      err_msg:  "category not found."
    }) 
  }

  response.json({
    id: data["id"],
    status: "ok",
    response: "category deleted",
  })
})


export default router