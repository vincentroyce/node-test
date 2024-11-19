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

orderItemSchema.virtual('id').get(function () {
  return this._id.toHexString();
})

orderItemSchema.set('toJSON', {
  virtuals: true,
})


export default OrderItem