import mongoose from 'mongoose'

const captainSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type:String,
      required:true,
    },
    lastname:{
      type:String,
    }
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  socketId:{
    type:String,
  },
  status:{
    type:String,
    enum:['active' ,'inactive'],
    default:'inactive',
  },
  vehicle:{
    color:{
      type:String,
      required:true,
    },
    plate:{
      type:String,
      required:true,
    },
    capacity:{
      type:Number,
      required:true,
    },
    vehicleType:{
      type:String,
      required:true,
    }
  },
  location:{
    ltd:{
      type:Number,
    },
    lng:{
      type:Number,
    }
  }
})

const captainModel = mongoose.model('CaptainModel' , captainSchema)
export default captainModel;