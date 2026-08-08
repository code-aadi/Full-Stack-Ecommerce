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
    password : {type : String, required : true}
})

export const User = mongoose.model("User", userSchema)