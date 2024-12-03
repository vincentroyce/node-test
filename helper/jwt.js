import expressJwt from 'express-jwt'
import dotenv from 'dotenv'

const authJWT = () => {
  return expressJwt.expressjwt({ 
    secret: dotenv.config().parsed.JWT_SECRET, 
    algorithms: ['HS256'] 
  }).unless({
    path: [
      `${dotenv.config().parsed.API_URL}/users/login`
    ]
  })
}


export default authJWT