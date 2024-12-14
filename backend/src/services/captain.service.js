import captainModel from "../models/captain.model.js";

export const createCaptain = async (data) => {
  const { firstname, lastname, email, password, color, capacity, plate, vehicleType } = data;
  try {
    // Create the captain with the required schema
    const captain = await captainModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });

    return captain; // Return the created captain
  } catch (error) {
    // Throw the error to let the calling function handle it
    throw new Error(`Error while creating captain: ${error.message}`);
  }
};
