import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({

  fullname:{
     firstname: {
      type: String,
      required: true,
      minlength: [3 , 'Firstname mmust be at least 3 characters']
     },
     lastname: {
      type: String,
      minlength: [3 , 'Lastname must be atleast 3 characters']
     }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'email must be atleast 5 characters']
  },
  password: {
    type:String,
    required: true,
    select: false
  },
  socketId: {
    type: String,
  }
})

export default userModel = mongoose.model('User' , userSchema)
