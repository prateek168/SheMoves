import jwt from 'jsonwebtoken'
const secretKey = process.env.JWT_SECRET

const generateToken = (payload , expiresIn ='1d') =>{
  return jwt.sign(payload , secretKey , {expiresIn})
}

export default generateToken;