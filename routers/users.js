import User from '../models/user.js'
import express from 'express'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const router = express.Router()

// Get all user.
router.get(`/`, async (request, response) => {
  
  let getUser = await User.find().select("-password");
  
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

// Get single user
router.get(`/:id`, async (request, response) => {

  if (!mongoose.isValidObjectId(request.params["id"])) {
    return response.status(400).json({
      status: "error",
      err_msg: "invalid id format"
    })
  }

  const getUser = await User.findById(request.params["id"], "-password")

  if (!getUser) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to find user"
    })
  }

  response.json({
    status: "ok",
    response: getUser
  })
})

// Register a user
router.post(`/register`, async (request, response) => {

  if (!request.is('application/json')) {
    return response.status(415).json({
      status:"error",
      err_msg: "invalid mime type",
    })
  }

  if (!request.body || Object.entries(request.body).length === 0) {
    return response.status(400).json({
      status: "error",
      err_msg: "empty or malformed body"
    })
  }

  if (!request.body["name"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing name key"
    })
  }

  if (!request.body["email"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing email key"
    })
  }

  if (!request.body["password"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing password key"
    })
  }

  if (!request.body["phone"]) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing phone key"
    })
  }
  
  const registerUser = new User({
    name:  request.body.name,
    email:  request.body.email,
    password: bcrypt.hashSync(request.body.password, 10),
    street: request.body.street,
    appartment: request.body.appartment,
    city:request.body.city,
    zip: request.body.zip,
    country : request.body.country,
    phone : request.body.phone,
    isAdmin: request.body.isAdmin,
  })

  const register = await registerUser.save()

  if (!register) {
    return response.status(500).json({
      status: "error",
      err_msg: "unable to register user"
    })
  }

  response.status(200).json({
    status:"ok",
    response: "user created"
  })

})

router.post('/login', async (request, response) => {

  if (!request.is('application/json')) {
    return response.status(415).json({
      status: "error",
      err_msg: "invalid mime type"
    })
  }

  if (!request.body || Object.entries(request.body).length == 0) {
    return response.status(400).json({
      status: "error",
      err_msg: "empty body"
    })
  }

  if (!request.body.email) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing email key in body"
    })
  }

  if (!request.body.password) {
    return response.status(400).json({
      status: "error",
      err_msg: "missing password key in body"
    })
  }

  const user = await User.findOne({
    email: request.body.email,
  })

  if (!user) {
    return response.status(404).json({
      status: "error",
      err_msg: "unable to find the user."
    })
  }

  if (!bcrypt.compareSync(request.body.password, user.password)) {
    return response.status(401).json({
      status: "error",
      err_msg: "invalid credentials."
    })
  }

  const loginToken = jwt.sign({ user_id: user.id }, dotenv.config().parsed.JWT_SECRET, { expiresIn: '1d' })

  response.json({
    status :"ok",
    response: user,
    token: loginToken
  })
})

export default router