import { Router } from 'express';
import { searchMedicine } from '../controller/medicine.controller.js';

const medicineRouter = Router();

// POST /api/medicine/search
// Body: { icd11_code?: string, disease_name?: string }
// Returns matched records from ayurvedas, unanis, sidhas collections
medicineRouter.post('/search', searchMedicine);

export default medicineRouter;
