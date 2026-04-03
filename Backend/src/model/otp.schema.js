import mongoose from "mongoose";

const otpschema = new mongoose.Schema({
    email:{
        type:String,
        required:[true , "email is required"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true , "user is required"],
        ref:"users",
    },
    otpHash:{
        type:String,
        required:[true,"otphash is required"],
    }
},{
    timestamps:true,
})

const otpModel = mongoose.model("otps",otpschema);

export default otpModel;