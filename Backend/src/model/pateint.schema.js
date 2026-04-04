import mongoose from "mongoose"

const patientSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true , "username is required"],
        unique:[true , "username must be unique"],
    },
    age:{
        type:Number,
        required:[true , "age is required"],
    },
    gender:{
        type:String,
        required:[true , "gender is required"],
    },
    weight:{
        type:Number,
        required:[true , "weight is required"],
    },
    height:{
        type:Number,
        required:[true , "height is required"],
    },
    bloodGroup:{
        type:String,
        required:[true , "blood group is required"],
    },
    phoneNumber:{
        type:String,
        required:[true , "phone number is required"],
        unique:[true , "phone number must be unique"],
    },
    sugarLevel:{
        type:Number,
        required:[true , "sugar level is required"],
    },
    heartRate:{
        type:Number,
        required:[true , "heart rate is required"],
    },
    bloodPressure:{
        type:String,
        required:[true , "blood pressure is required"],
    },

    // Selected ICD-11 diagnosis codes chosen by the doctor
    icdDiagnosis: [
        {
            code:        { type: String },
            name:        { type: String },
            description: { type: String },
        }
    ],

    // Selected traditional medicine records chosen by the doctor
    traditionalMedicine: [
        {
            system:           { type: String, enum: ['ayurveda', 'unani', 'sidha'] },
            namec_code:       { type: String },
            short_defination: { type: String },
            long_defination:  { type: String },
        }
    ],

    // LLM generated assessment based on selected diagnoses
    aiSummary: {
        type: String,
        default: null
    },

    // What the doctor typed in the search bar
    searchQuery: {
        type: String,
        default: null
    }

} , {timestamps:true})

const patientModel = mongoose.model("patients",patientSchema);

export default patientModel;
