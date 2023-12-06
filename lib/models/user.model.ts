import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:String,
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      contactNo:String,
      address:String,
      ntn:String


})

export const  User= mongoose.models.User|| mongoose.model('User',userSchema);

