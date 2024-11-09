import User from '../models/user.js'
import express from 'express'

const router = express.Router()

router.get(`/`, async (request, response) => {
  
  let getUser = await User.find();
  
  if (!getUser) {
    return response.status(500).json({
      status: "error",
      err_msg: "Database error."
    })
  }

  response.json({
    status:"ok",
    response: getUser,
  })
})

export default router