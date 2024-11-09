import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  productID: Number,
  quantity: Number,
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

export default OrderItem