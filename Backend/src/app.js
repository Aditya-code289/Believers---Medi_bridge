import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js';
import patientRouter from './routes/pateint.routes.js';
import cookieParser from 'cookie-parser';
import icdRouter from "./routes/icd.routes.js"

const app = express() ;

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/api/auth' , authRouter);
app.use('/api/pateint' , patientRouter);
app.use('/api/icd',icdRouter); 

export default app ;