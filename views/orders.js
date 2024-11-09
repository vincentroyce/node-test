import Order from '../models/order.js'
import express from 'express'

const router = express.Router()

router.get(`/`, async (request, response) => {
  
  let getOrder = await Order.find();

  if (!getOrder) {
    return response.status(500).json({
      status: "error",
      err_msg: "Database error."
    })
  }

  response.json({
    status:"ok",
    response: getOrder,
  })
})

export default router