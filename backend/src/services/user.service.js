import userModel from "../models/user.model.js";

export const createUser = async (data) => {
  const {firstname , lastname , email , password } = data;
  try {
    const user = await userModel.create({
      fullname: {
         firstname,
         lastname,
      },
       email,
       password,
    });
    return user;
  } catch (error) {
    res.status(400).json({ message:"Error while creating User"})
  }
};