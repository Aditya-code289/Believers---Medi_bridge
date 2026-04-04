import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js';
import patientRouter from './routes/pateint.routes.js';
import cookieParser from 'cookie-parser';
import icdRouter from "./routes/icd.routes.js"
import medicineRouter from './routes/medicine.routes.js';

import auditRouter from './routes/audit.routes.js';

const app = express() ;

const corsOptions = {
    origin: function (origin, callback) {
        // Allow static FRONTEND_URL, or any local development port, or requests with no origin (like Postman)
        if (!origin || origin.startsWith('http://localhost:') || origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use('/api/auth' , authRouter);
app.use('/api/pateint' , patientRouter);
app.use('/api/icd',icdRouter);
app.use('/api/medicine', medicineRouter); 
app.use('/api/audit', auditRouter);

export default app ;