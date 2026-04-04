import {Router} from 'express';
import * as patientController from '../controller/pateint.controller.js'

const patientRouter = Router() 

//used to get pateint data 
// /api/pateint/get-pateint  //post
patientRouter.post('/get-pateint',patientController.get_pateint); 

// update icdDiagnosis and/or traditionalMedicine for a patient
// /api/pateint/update-diagnosis/:id  //patch
patientRouter.patch('/update-diagnosis/:id', patientController.updateDiagnosis);

// Generate AI summary using Groq
// /api/pateint/generate-summary/:id //post
patientRouter.post('/generate-summary/:id', patientController.generateSummary);





export default patientRouter    