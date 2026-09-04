import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String,
        required : true,
        trim : true,
        minLength : 3
    },
    email : {type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {type : String, required : true},

     defaultAddress: {
    name: {
      type: String,
    },
    phone: {
      type: String
    },
    flatNo: {
      type: String
    },
    city: {
      type: String
    },
    street: {
      type: String
    },
    pincode: {
      type: String
    },
    landmark : {
        type : String
    },
    state : {
        type : String
    },
    addressType : {
        type : String
    },
  }
})

export const User = mongoose.model("User", userSchema)