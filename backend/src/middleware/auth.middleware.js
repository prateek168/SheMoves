import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js';
import blacklistTokenModel from '../models/blacklistToken.model.js';

export const  isAuthenticatedUser = async (req, res, next)=>{
 try{ 
   const token = req.cookies.token || req.headers.authorization.split(" ")[1];
     
  if(!token){
    return res.status(401).json({
      message: "Token Not Found"
    })
  }
  const isBlacklistToken = await blacklistTokenModel.findOne({token})
  if(isBlacklistToken){
    res.status(401).json({message:'Unauthorized'})
  }
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  if(!decode){
    return res.status(401).json({
      message:"Invalid Token"
    })
  }
  const user = await userModel.findOne({ _id : decode.id} );
  if(!user) return res.json({message:"User not found with token"})
  req.user = user;
  next();
 }
 catch(error){
  return res.status(401).json({message:"User is not Authenticated"})
 }
}

