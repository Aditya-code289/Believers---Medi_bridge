import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "username must be unique"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        unique: [true, "password must be unique"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email must be unique"],
    },
    mobileNumber: {
        type: String,
        required: [true, "mobile number is required"],
        unique: [true, "mobile number must be unique"],
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
    },
    hospitalName: {
        type: String,
        required: [true, "hospital name is required"],
    },
    role: {
        type: String,
        default: "user",
    },
    verified: {
        type: String,
        default: "false",
    },
    icd11Codes: [
        {
            code: {
                type: String,
                required: [true, "ICD-11 code is required"],
            },
            name: {
                type: String,
                required: [true, "ICD-11 name is required"],
            },
            description: {
                type: String,
                required: [true, "ICD-11 description is required"],
            },
            _id: false
        }
    ],
    namasteCodes: [
        {
            code: {
                type: String,
                required: [true, "NAMASTE code is required"],
            },
            diseaseName: {
                type: String,
                required: [true, "Disease name is required"],
            },
            shortDescription: {
                type: String,
                required: [true, "Short description is required"],
            },
            longDescription: {
                type: String,
                required: [true, "Long description is required"],
            },
            _id: false
        }
    ],
},
{
    timestamps: true,
})

const userModel = mongoose.model("users", userschema);

export default userModel;