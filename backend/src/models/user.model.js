import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({

  fullname:{
     firstname: {
      type: String,
      required: true,
     },
     lastname: {
      type: String,
     }
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type:String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  }
})
 
const userModel = mongoose.model('user' , userSchema)
export default userModel;