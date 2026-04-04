import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './src/database/db.js'
import app from './src/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '.env') });

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