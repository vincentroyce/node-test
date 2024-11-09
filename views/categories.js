import Category from '../models/category.js'
import express from 'express'

const router = express.Router()

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

export default router