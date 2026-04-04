import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    mobileNumber: {
        type: String,
        required: [true, "Mobile number is required"],
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
    },
    hospitalName: {
        type: String,
        required: [true, "Hospital name is required"],
    },
    role: {
        type: String,
        default: "user",
    },
    verified: {
        type: String,
        default: "false",
    },
}, {
    timestamps: true,
})

const userModel = mongoose.model("users", userschema);

export default userModel;