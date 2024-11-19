import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    default:'',
  },
  appartment: {
    type: String,
    default:'',
  },
  city: {
    type: String,
    default:'',
  },
  zip: {
    type: String,
    default:'',
  },
  country: {
    type: String,
    default:'',
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
})  

const User = mongoose.model('User', userSchema)

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
})

userSchema.set('toJSON', {
  virtuals: true,
})

export default User