import userModel from "../models/user.model.js";

export const createUser = async (data) => {
  try {
    const user = await userModel.create({
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
    });
    return user;
  } catch (error) {
    console.error("Error while creating User:", error.message);
    throw new Error("Failed to create user");
  }
};
