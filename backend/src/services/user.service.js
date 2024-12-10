import userModel from "../models/user.model";

export const createUser = async ( data )=>{
  try { const user = await userModel.create({
    fullname :{
      firstname : data.firstname ,
      lastname : data.lastname ,
    },
    email : data.email,
    password : data.password,
  })
  return user;
}
catch(error){
  console.log("Error while creating User " + error.message );
}
};