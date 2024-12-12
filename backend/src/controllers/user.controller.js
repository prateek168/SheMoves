import userModel from "../models/user.model.js";
import { userSchema } from "../validations/user.validation.js";
import bcrypt from "bcrypt";
import * as userService from "../services/user.service.js";

export const registerUser = async (req, res, next) => {
  try {
    // Validate the request body
    const validatedData = userSchema.parse(req.body);
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
    const token = async( user )=>{
    return await jwt.sign(user._id , process.env.JWT_SECRET ,{expiresIn: '1d'})
    }
      


    res.status(201).json({ user, token });
  } catch (error) {
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
