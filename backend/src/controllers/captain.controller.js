import { array } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { loginCaptainSchema, registerCaptainSchema } from "../validations/captain.validation.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

export const registerCaptain = async (req, res) => {
  try {
    const validatedData = registerCaptainSchema.parse(req.body);
    const { fullname, email, password, vehicle } = validatedData;
    const { firstname, lastname } = fullname;
    const { color, capacity, plate, vehicleType } = vehicle;


    // Check if all required fields are provided
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Prepare captain data
    const captainData = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      color,
      capacity,
      plate,
      vehicleType,
    };

    // Create the captain
    const captain = await createCaptain(captainData);

    // Generate JWT token
    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set the token as a cookie
    res.cookie("token", token);

    // Remove password before sending response
    const { password: _, ...captainWithoutPassword } = captain.toObject();

    return res.status(201).json({
      captain: captainWithoutPassword,
      token,
      message: "Registration successful",
    });
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
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const loginCaptain = async (req, res) => {
  try {
    const validatedData = loginCaptainSchema.parse(req.body);
    const { email, password } = validatedData;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the captain exists
    const captain = await captainModel.findOne({ email });
    if (!captain) {
      return res.status(404).json({ message: "Email not found" });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, captain.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: captain._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // Set the token as a cookie
    res.cookie("token", token);

    // Remove password before sending response
    const { password: _, ...captainWithoutPassword } = captain.toObject();

    return res.status(200).json({
      message: "Login successful",
      token,
      captain: captainWithoutPassword,
    });
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
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getCaptainProfile = async ( req , res)=>{
  try{
    const captain = await captainModel.findOne(req.captain._id);
    return res.status(200).json({captain , message:"Captain Found"})
  }
  catch(error){
    return res.status(404).json({message:"Captain Not Found"})
  }
}

export const logoutCaptain = async ( req, res)=>{
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  res.clearCookie('token')
  await blacklistTokenModel.create({token});
  return res.status(200).json({message:"Logged Out"})
}