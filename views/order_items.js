import OrderItem from '../models/order_item.js'
import express from 'express'

const router = express.Router()

router.get(`/`, async (request, response) => {
  
  let getOrderItem = await OrderItem.find();
  
  if (!getOrderItem) {
    return response.status(500).json({
      status: "error",
      err_msg: "Database error."
    })
  }

  response.json({
    status:"ok",
    response: getOrderItem,
  })
})

export default router