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

export default router