import userModel from "../models/user.model";
import { userSchema } from "../validations/user.validation";


export const Register = aysnc ( req , res ) =>{
 try{
    const validatedData = userSchema.parse(req.body);
    
 }
 catch(error){
  console.log(error);
 }
}