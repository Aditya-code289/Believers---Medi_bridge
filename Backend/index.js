import dotenv from 'dotenv';
import connectDB from './src/database/db.js'
import app from './src/app.js';
dotenv.config({path:'./.env'});

const connection = async ()=>{
    try {
         await connectDB() ;
         app.listen(process.env.port,console.log("server started"));
        
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

connection();