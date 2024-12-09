import mongoose from 'mongoose'

const connectDB = async()=>{
  try{
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in the env file ')
    }
    const conn = await mongoose.connect(process.env.MONGO_URI );
   console.log(`Database Connected: ${conn.connection.host} `)
  }
  catch(error){
    console.log(error)
    process.exit(1);
  }
}
export default connectDB;