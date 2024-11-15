import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: Number,
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

export default OrderItem