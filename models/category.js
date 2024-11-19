import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
})

const Category = mongoose.model('Category', categorySchema)

  categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
  })

categorySchema.set('toJSON', {
  virtuals: true,
})

export default Category