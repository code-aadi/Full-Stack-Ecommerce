import mongoose from "mongoose"

const url = process.env.MONGO_URI

const connectDB = async () => {
   try {
     await mongoose.connect(url)
    console.log("database connected")
   } catch (error) {
    console.log(error.message)
   }
}
export default connectDB