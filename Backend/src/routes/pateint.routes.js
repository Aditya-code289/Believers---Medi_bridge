import {Router} from 'express';
import * as patientController from '../controller/pateint.controller.js'

const patientRouter = Router() 

//used to get pateint data 
// /api/pateint/get-pateint  //post

patientRouter.post('/get-pateint',patientController.get_pateint); 






export default patientRouter    