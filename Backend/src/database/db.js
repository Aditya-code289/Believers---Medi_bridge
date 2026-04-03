import mongoose from 'mongoose';

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("server is running ");
    } catch (error) {
        console.log("data base is not connected");
        throw error ; 
    }
}

export default connectDB ;