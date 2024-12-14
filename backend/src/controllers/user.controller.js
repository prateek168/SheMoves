import userModel from "../models/user.model.js";
import { registerUserSchema } from "../validations/user.register.validation.js";
import { loginUserSchema  } from "../validations/user.login.validation.js";
import bcrypt from "bcrypt";
import * as userService from "../services/user.service.js";
import jwt from 'jsonwebtoken'
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerUser = async (req, res, next) => {
  try {
    // Validate the request body
    const validatedData = registerUserSchema.parse(req.body);
    const { firstname, lastname, email, password } = validatedData;

    // Check if the email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare the data for user creation
    const userData = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
    };

    // Create the user
    const user = await userService.createUser(userData);

    // Generate a token
    const token =  jwt.sign( {id: user._id }, process.env.JWT_SECRET ,{expiresIn: '1d'})
  
    //converts a user object(likely a Mongoose document) into a plain JavaScript object.
    //Why it's needed: Mongoose documents have additional methods and metadata, 
    //so converting it to a plain object removes those extras, leaving only the data fields.


   res.cookie('token' , token);
   const { password: _, ...userWithoutPassword} = user.toObject();
   //converts a user object(likely a Mongoose document) into a plain JavaScript object.
    //Why it's needed: Mongoose documents have additional methods and metadata, 
    //so converting it to a plain object removes those extras, leaving only the data fields.

    // it destructures the password from the user object and then asssign the pass to a _ variable
    // it is generally not used 

    return res.status(201).json({
      user: userWithoutPassword, token, message: 'Registration Successful'});
    
  } catch (error) {

    //Handle Zod Errors
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    console.error("Error in registerUser: ", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const loginUser = async (req, res, next) => {
  try {
    // Validate the request body
    const validatedData = loginUserSchema.parse(req.body);
    const { email, password } = validatedData;

    // Check if the user exists
    const existingUser = await userModel.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(404).json({ message: "User not Found" });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Generate Token
    const token = jwt.sign(
      { id: existingUser._id }, // Include user ID as payload
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie('token', token);
    // Exclude the password before sending the response
    const { password: _, ...userWithoutPassword } = existingUser.toObject();
    
    return res.status(200).json({
      user: userWithoutPassword,
      token,
      message: "Login Successful",
    });
  } catch (error) {
    // Handle Zod Errors
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation Failed",
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }

    // Handle other errors
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getUserProfile = async ( req , res )=>{
  try{
     const user = await userModel.findOne(req.user._id);
     return res.status(200).json({user , message: "User Found"})
  }
  catch(error){
    return res.status(404).json({message :"User not found"})
  }
}

export const logoutUser = async(req , res)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  res.clearCookie('token');
  await blacklistTokenModel.create({  token });
  res.status(200).json({message: 'Logged Out'})
}
