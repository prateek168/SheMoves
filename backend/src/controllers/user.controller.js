import userModel from "../models/user.model";
import generateToken from "../utils/jwt";
import { userSchema } from "../validations/user.validation";
import bcrypt from 'bcrypt'
import * as userService from '../services/user.service'
export const registerUser = async ( req , res , next )=> {
 try{
    const {firstname , lastname , email , password} = userSchema.parse(req.body);
   if (!email || !firstname || !password) {
     return res.json(400).json({message:"All fields are mandatory"})
   }
     let user = await userModel.findOne({username})
     if(user){
      return res.status(400).json({message:"Username already Exists"})
     }
     const hashedPassword = await bcrypt.hash(password, 10);

     // calling createUser function from userService
      user = await userService.createUser({
      firstname ,
      lastname,
      email,
      password : hashedPassword
    })

    const token = generateToken(user._id);
    res.status(201).json({user , token })
 }
 catch(error){
  console.log(error);
 }
}